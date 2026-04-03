import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FLOWER_TYPES from '../engine/flowers';

/* ─────────────────────────────────────────────────────────────────
   THE CORRECT BOUQUET COMPOSITING ALGORITHM

   Every flower image (PNG) has its own stem.
   The stem tip is at the BOTTOM-CENTER of the PNG bounding box.

   To form a bouquet:
     1. Pick a single "grip point" on the canvas (lower-center).
     2. For each flower, place the image so its bottom-center
        sits exactly ON that grip point.
     3. Rotate the image around that bottom-center point by
        a fan angle — flowers lean away from center.
     4. The flower heads naturally spread upward and outward.
     5. The real PNG stems cross and layer as they descend
        to the grip point — NO fake lines drawn.
     6. A satin ribbon SVG sits exactly on the grip point, on top.

   CSS that makes this work:
     transform-origin: 50% 100%   ← bottom-center of the image
     transform: rotate(Ndeg)      ← lean the flower
     left: gripX - imgW/2         ← horizontally center on grip
     top:  gripY - imgH           ← bottom edge at gripY
─────────────────────────────────────────────────────────────────── */

function getFanAngles(count) {
  if (count === 0) return [];
  if (count === 1) return [0];

  // Total arc grows with count but caps so outer flowers don't go horizontal
  const totalArc = Math.min(14 + count * 9, 65); // degrees total spread
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0 : (i / (count - 1)) - 0.5; // -0.5 → +0.5
    return t * totalArc;
  });
}

function getRibbonColor(flowers) {
  let pink = 0, warm = 0, purple = 0, neutral = 0;
  flowers.forEach(f => {
    const c = FLOWER_TYPES[f.type]?.dominantColor ?? 'white';
    if (c === 'pink' || c === 'red') pink++;
    else if (c === 'warm') warm++;
    else if (c === 'blue') purple++;
    else neutral++;
  });
  const m = Math.max(pink, warm, purple, neutral);
  if (m === pink)    return { fill: '#f2b8c6', stroke: '#d9879a', shadow: 'rgba(242,184,198,0.5)' };
  if (m === warm)    return { fill: '#e8d4a2', stroke: '#c8b07a', shadow: 'rgba(232,212,162,0.5)' };
  if (m === purple)  return { fill: '#cbb8e8', stroke: '#a090c8', shadow: 'rgba(203,184,232,0.5)' };
  return               { fill: '#f0ece2', stroke: '#c8c0b0', shadow: 'rgba(240,236,226,0.5)' };
}

/* Satin ribbon bow — rendered exactly at the grip point */
function SatinRibbon({ color }) {
  const { fill, stroke, shadow } = color;
  return (
    // Centered at (0,0) — caller applies translate
    <g style={{ filter: `drop-shadow(0 2px 8px ${shadow})` }}>
      {/* Left loop */}
      <path d="M0,0 C-6,-6 -38,-18 -42,-2 C-44,8 -24,16 0,0 Z"
        fill={fill} stroke={stroke} strokeWidth="0.7" opacity="0.97" />
      {/* Highlight left loop */}
      <path d="M0,0 C-6,-6 -38,-18 -42,-2 C-44,8 -24,16 0,0 Z"
        fill="rgba(255,255,255,0.22)" stroke="none" />
      {/* Right loop */}
      <path d="M0,0 C6,-6 38,-18 42,-2 C44,8 24,16 0,0 Z"
        fill={fill} stroke={stroke} strokeWidth="0.7" opacity="0.97" />
      <path d="M0,0 C6,-6 38,-18 42,-2 C44,8 24,16 0,0 Z"
        fill="rgba(255,255,255,0.22)" stroke="none" />
      {/* Left tail */}
      <path d="M-3,3 C-10,16 -22,38 -16,58 C-10,40 -2,18 1,4 Z"
        fill={fill} stroke={stroke} strokeWidth="0.6" opacity="0.88" />
      {/* Right tail */}
      <path d="M3,3 C10,16 22,38 16,58 C10,40 2,18 -1,4 Z"
        fill={fill} stroke={stroke} strokeWidth="0.6" opacity="0.88" />
      {/* Knot */}
      <ellipse cx="0" cy="2" rx="7" ry="5.5"
        fill={fill} stroke={stroke} strokeWidth="0.8" />
      {/* Knot shine */}
      <ellipse cx="-1.5" cy="0.5" rx="2.5" ry="1.8"
        fill="rgba(255,255,255,0.5)" stroke="none" />
    </g>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */

export default function BouquetCanvas({ flowers = [] }) {
  const count = flowers.length;

  // Canvas dimensions (logical — actual size controlled by CSS)
  const W = 500;
  const H = 580;

  // The single grip point where all stems converge
  // and the ribbon bow sits.
  const gripX = W / 2;
  const gripY = H * 0.72;

  // Image size: scale down slightly for larger counts so all fit
  const baseImgSize = Math.min(W * 0.55, H * 0.55);
  const imgSize = count <= 2 ? baseImgSize : baseImgSize * Math.max(0.65, 1 - (count - 2) * 0.06);

  const fanAngles = useMemo(() => getFanAngles(count), [count]);
  const ribbonColor = useMemo(() => getRibbonColor(flowers), [flowers]);

  // Z-order: center flower(s) in front, outermost in back
  const zOrders = useMemo(() => {
    return fanAngles.map((_, i) => {
      const distFromCenter = Math.abs(i - (count - 1) / 2);
      return Math.round((count - distFromCenter) * 10);
    });
  }, [fanAngles, count]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      // SOLID background — this is what transparent PNG areas show through to.
      // No gradient, no transparency — must be opaque so checkerboards disappear.
      background: '#fffdf9',
      borderRadius: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
      // Isolation creates a new stacking context — ensures blend modes
      // apply correctly within this container only.
      isolation: 'isolate',
    }}>

      {/* ── Flower images ─────────────────────────────────────────
          KEY RULE: each image's bottom-center sits at (gripX, gripY).
          We rotate around transform-origin: 50% 100% (bottom-center).
          This fans the flower heads outward while stems converge.
      ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {flowers.map((f, i) => {
          const typeInfo = FLOWER_TYPES[f.type];
          if (!typeInfo) return null;

          const angle = fanAngles[i] ?? 0;
          const zIndex = zOrders[i] ?? i;

          // Position: bottom-center of img at (gripX, gripY)
          const left = gripX - imgSize / 2;
          const top  = gripY - imgSize;

          return (
            <motion.img
              key={`${f.type}-${i}`}
              src={typeInfo.image}
              alt={typeInfo.name}
              draggable={false}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                left,
                top,
                width: imgSize,
                height: imgSize,
                objectFit: 'contain',
                // CRITICAL: rotate around bottom-center (the stem tip)
                // so the stem tip stays pinned at (gripX, gripY).
                transformOrigin: '50% 100%',
                transform: `rotate(${angle}deg)`,
                zIndex,
                pointerEvents: 'none',
                userSelect: 'none',
                // NO mix-blend-mode needed: these are truly transparent PNGs.
                // The solid canvas background shows through alpha areas cleanly.
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* ── Satin ribbon bow ───────────────────────────────────────
          Centered exactly on the grip point — on top of all flowers.
      ──────────────────────────────────────────────────────────── */}
      {count >= 1 && (
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 9000,
          }}
        >
          <g transform={`translate(${gripX}, ${gripY})`}>
            <SatinRibbon color={ribbonColor} />
          </g>
        </svg>
      )}

      {/* ── Empty state ───────────────────────────────────────────── */}
      <AnimatePresence>
        {count === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.4rem',
              background: '#fffdf9',
              zIndex: 1,
            }}
          >
            <svg width="88" height="100" viewBox="0 0 88 100" fill="none">
              <circle cx="30" cy="28" r="10" fill="#f2d4da" opacity="0.55"/>
              <circle cx="58" cy="22" r="12" fill="#f2e8d4" opacity="0.5"/>
              <circle cx="44" cy="14" r="8" fill="#dde8d4" opacity="0.5"/>
              <path d="M44,75 C28,65 20,40 44,50 C68,40 60,65 44,75 Z"
                stroke="#d4b4bc" strokeWidth="1.4" strokeDasharray="5 3" fill="none"/>
              <path d="M44,75 L44,98"
                stroke="#d4b4bc" strokeWidth="1.4" strokeDasharray="3 3"/>
            </svg>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '0.9rem',
              color: '#c0a0a8',
              textAlign: 'center',
              lineHeight: 1.6,
              margin: 0,
            }}>
              Your bouquet begins<br />with a single flower…
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

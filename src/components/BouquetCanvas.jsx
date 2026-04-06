import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FLOWER_TYPES from '../engine/flowers';

/**
 * BouquetCanvas — SVG-based fan bouquet.
 *
 * Each flower is an <image> element rendered in its own coordinate space.
 * The stem-base of every flower is placed at the grip point, then the
 * whole group is rotated around that grip point so heads fan outward.
 * A white rect behind each image kills any checkerboard bleed.
 */

const W = 480;
const H = 560;
const GRIP_X = W / 2;
const GRIP_Y = H * 0.76;   // where ribbon sits
const IMG = 260;            // flower image square size (stem-to-head)

function getFlowerSlots(count, gripX, gripY) {
  if (count === 0) return [];
  if (count === 1) {
    return [{ angle: 0, x: gripX, y: gripY, z: 100 }];
  }

  const slots = [];
  const maxArc = 120; // Maximum spread angle
  const totalArc = Math.min(30 * (count - 1), maxArc);

  for (let i = 0; i < count; i++) {
    // t ranges from -1 (left) to +1 (right)
    const t = (i / (count - 1)) * 2 - 1;
    const absT = Math.abs(t);

    const angle = t * (totalArc / 2);

    // Spread the stem bases horizontally so no two flowers share the exact position
    const x = gripX + (t * 15);
    
    // Center flower is highest (lowest Y). Outer flowers progressively lower.
    const y = gripY + (absT * 25);

    // Center flower is in front
    const z = 100 - Math.round(absT * 100);

    slots.push({ angle, x, y, z });
  }
  return slots;
}

function getImgSize(count) {
  if (count <= 1) return IMG;
  // shrink slightly as count grows, floor at 55% of IMG
  return Math.max(IMG * 0.55, IMG * (1 - (count - 1) * 0.045));
}

function getRibbonColor(flowers) {
  const counts = { pink: 0, warm: 0, blue: 0, neutral: 0 };
  flowers.forEach(f => {
    const c = FLOWER_TYPES[f.type]?.dominantColor ?? 'neutral';
    if (c === 'pink' || c === 'red') counts.pink++;
    else if (c === 'warm') counts.warm++;
    else if (c === 'blue') counts.blue++;
    else counts.neutral++;
  });
  const max = Math.max(...Object.values(counts));
  if (counts.pink === max) return { fill: '#f4b8c8', stroke: '#d4889a' };
  if (counts.warm === max) return { fill: '#f0d8a0', stroke: '#c8a860' };
  if (counts.blue === max) return { fill: '#c8b8e8', stroke: '#9880c0' };
  return { fill: '#f0ece4', stroke: '#c0b8a8' };
}

function RibbonBow({ fill, stroke }) {
  return (
    <g>
      <path d="M0,0 C-10,-10 -50,-24 -52,2 C-52,16 -28,20 0,0 Z"
        fill={fill} stroke={stroke} strokeWidth="1.2" opacity="0.95" />
      <path d="M0,0 C10,-10 50,-24 52,2 C52,16 28,20 0,0 Z"
        fill={fill} stroke={stroke} strokeWidth="1.2" opacity="0.95" />
      <path d="M-4,4 C-16,24 -30,54 -22,76 C-13,55 -4,26 0,6 Z"
        fill={fill} stroke={stroke} strokeWidth="0.9" opacity="0.88" />
      <path d="M4,4 C16,24 30,54 22,76 C13,55 4,26 0,6 Z"
        fill={fill} stroke={stroke} strokeWidth="0.9" opacity="0.88" />
      <ellipse cx="0" cy="2" rx="9" ry="7"
        fill={fill} stroke={stroke} strokeWidth="1.2" />
      <ellipse cx="-2" cy="0" rx="3.5" ry="2.5"
        fill="rgba(255,255,255,0.5)" stroke="none" />
    </g>
  );
}

export default function BouquetCanvas({ flowers = [] }) {
  const count = flowers.length;
  const imgSize = useMemo(() => getImgSize(count), [count]);
  const ribbonColor = useMemo(() => getRibbonColor(flowers), [flowers]);
  const slots = useMemo(() => getFlowerSlots(count, GRIP_X, GRIP_Y), [count]);

  // Sort by z so SVG painters algorithm renders correctly
  const sorted = useMemo(() => {
    return flowers
      .map((f, i) => {
        const slot = slots[i] || { angle: 0, x: GRIP_X, y: GRIP_Y, z: 0 };
        return { f, i, ...slot };
      })
      .sort((a, b) => a.z - b.z);
  }, [flowers, slots]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#fdf6f0',
      borderRadius: '1rem',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block', backgroundColor: '#fdf6f0' }}
      >
        {/* Solid background — kills any transparency bleed */}
        <rect width="100%" height="100%" fill="#fdf6f0" />

        {/* Flowers — each rotated around its own stem base (bottom-center) */}
        {sorted.map(({ f, i, angle, x, y }) => {
          const typeInfo = FLOWER_TYPES[f.type];
          if (!typeInfo) return null;

          // Stem base is exactly at x, y
          const ix = x - imgSize / 2;
          const iy = y - imgSize;

          return (
            <g
              key={`flower-${f.type}-${i}`}
              transform={`rotate(${angle}, ${x}, ${y})`}
            >
              <image
                href={typeInfo.image}
                x={ix} y={iy}
                width={imgSize} height={imgSize}
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
          );
        })}

        {/* Ribbon bow on top */}
        {count >= 1 && (
          <g transform={`translate(${GRIP_X}, ${GRIP_Y})`}>
            <RibbonBow fill={ribbonColor.fill} stroke={ribbonColor.stroke} />
          </g>
        )}
      </svg>

      {/* Empty state */}
      {count === 0 && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          backgroundColor: '#fdf6f0',
          borderRadius: '1rem',
        }}>
          <svg width="72" height="88" viewBox="0 0 72 88" fill="none">
            <circle cx="24" cy="24" r="10" fill="#f2d4da" opacity="0.5"/>
            <circle cx="48" cy="18" r="12" fill="#f2e8d4" opacity="0.45"/>
            <circle cx="36" cy="10" r="8" fill="#dde8d4" opacity="0.45"/>
            <path d="M36,65 C22,56 16,34 36,44 C56,34 50,56 36,65Z"
              stroke="#d4b4bc" strokeWidth="1.2" strokeDasharray="4 3" fill="none"/>
            <path d="M36,65 L36,86" stroke="#d4b4bc" strokeWidth="1.2" strokeDasharray="3 3"/>
          </svg>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '0.88rem',
            color: '#c0a0a8',
            textAlign: 'center',
            lineHeight: 1.65,
            margin: 0,
          }}>
            Your bouquet begins<br/>with a single flower…
          </p>
        </div>
      )}
    </div>
  );
}

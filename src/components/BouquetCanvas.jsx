import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FLOWER_TYPES from '../engine/flowers';

/**
 * BouquetCanvas — instant, offline bouquet compositor.
 *
 * Layout algorithm:
 * - All flowers fan out from a single grip/tie point at the bottom-center
 * - Each flower image is placed so its bottom-center sits at the grip point
 * - The group is then rotated around the grip point by its fan angle
 * - Center flower is upright (0°), outer flowers lean left/right
 * - A ribbon bow is drawn on top of the grip point
 * - Solid cream background — no transparency, no checkerboard
 */

const W = 500;
const H = 580;
const GRIP_X = W / 2;
const GRIP_Y = H * 0.78;

function getFanAngles(count) {
  if (count === 0) return [];
  if (count === 1) return [0];

  // Spread grows with count, max 130°
  const totalArc = Math.min(22 + (count - 1) * 14, 130);

  return Array.from({ length: count }, (_, i) => {
    const t = (i / (count - 1)) - 0.5; // -0.5 … +0.5
    return t * totalArc;
  });
}

function getFlowerSize(count) {
  // Single flower fills nicely; shrink as more are added
  const base = Math.min(W * 0.68, H * 0.72);
  if (count <= 1) return base;
  return Math.max(base * 0.48, base * (1 - (count - 1) * 0.048));
}

function getRibbonColors(flowers) {
  const c = { pink: 0, warm: 0, blue: 0, white: 0 };
  flowers.forEach(f => {
    const col = FLOWER_TYPES[f.type]?.dominantColor ?? 'white';
    if (col === 'pink' || col === 'red') c.pink++;
    else if (col === 'warm') c.warm++;
    else if (col === 'blue') c.blue++;
    else c.white++;
  });
  const max = Math.max(...Object.values(c));
  if (c.pink === max) return { fill: '#f4b8c8', stroke: '#d4889a', shine: '#fde8f0' };
  if (c.warm === max) return { fill: '#f0d890', stroke: '#c8a840', shine: '#fdf4d0' };
  if (c.blue === max) return { fill: '#c8b8e8', stroke: '#9878c8', shine: '#ece8f8' };
  return { fill: '#f0ece4', stroke: '#c0b0a0', shine: '#faf8f4' };
}

function Ribbon({ x, y, colors }) {
  const { fill, stroke, shine } = colors;
  return (
    <g transform={`translate(${x},${y})`}>
      {/* Left loop */}
      <path d="M0,0 C-8,-12 -52,-26 -54,0 C-54,18 -28,22 0,0Z"
        fill={fill} stroke={stroke} strokeWidth="1.3" opacity="0.95" />
      <path d="M0,0 C-8,-12 -52,-26 -54,0 C-54,18 -28,22 0,0Z"
        fill={shine} stroke="none" opacity="0.3" />
      {/* Right loop */}
      <path d="M0,0 C8,-12 52,-26 54,0 C54,18 28,22 0,0Z"
        fill={fill} stroke={stroke} strokeWidth="1.3" opacity="0.95" />
      <path d="M0,0 C8,-12 52,-26 54,0 C54,18 28,22 0,0Z"
        fill={shine} stroke="none" opacity="0.3" />
      {/* Left tail */}
      <path d="M-5,5 C-18,28 -34,60 -26,84 C-16,60 -6,28 0,8Z"
        fill={fill} stroke={stroke} strokeWidth="1" opacity="0.88" />
      {/* Right tail */}
      <path d="M5,5 C18,28 34,60 26,84 C16,60 6,28 0,8Z"
        fill={fill} stroke={stroke} strokeWidth="1" opacity="0.88" />
      {/* Knot */}
      <ellipse cx="0" cy="3" rx="10" ry="8"
        fill={fill} stroke={stroke} strokeWidth="1.4" />
      <ellipse cx="-2" cy="1" rx="4" ry="3"
        fill={shine} stroke="none" opacity="0.6" />
    </g>
  );
}

export default function BouquetCanvas({ flowers = [] }) {
  const count = flowers.length;

  const fanAngles = useMemo(() => getFanAngles(count), [count]);
  const flowerSize = useMemo(() => getFlowerSize(count), [count]);
  const ribbonColors = useMemo(() => getRibbonColors(flowers), [flowers]);

  // Z-order: center flowers render last (on top), outer flowers behind
  const renderOrder = useMemo(() => {
    return flowers
      .map((f, i) => {
        const distFromCenter = Math.abs(i - (count - 1) / 2);
        return { f, i, z: count - distFromCenter, angle: fanAngles[i] ?? 0 };
      })
      .sort((a, b) => a.z - b.z); // paint back-to-front
  }, [flowers, fanAngles, count]);

  if (count === 0) return null;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#fffdf9',
      borderRadius: '1rem',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {/* Paper background */}
        <rect width={W} height={H} fill="#fffdf9" />

        {/* Subtle paper texture dots */}
        {[...Array(18)].map((_, i) => {
          const px = ((i * 137.5) % 1) * W;
          const py = ((i * 97.3) % 1) * H * 0.85;
          return (
            <circle key={i} cx={px} cy={py} r={0.8 + (i % 3) * 0.6}
              fill="#e8d8d0" opacity={0.12 + (i % 4) * 0.04} />
          );
        })}

        {/* Stems — drawn first, behind everything */}
        <g>
          {renderOrder.map(({ i, angle }) => {
            const rad = (angle * Math.PI) / 180;
            const stemLen = flowerSize * 0.68;
            // Stem tip is at the flower head center (top of stem)
            const tipX = GRIP_X - Math.sin(rad) * stemLen;
            const tipY = GRIP_Y - Math.cos(rad) * stemLen;
            // Slight curve control point
            const cpX = GRIP_X + (tipX - GRIP_X) * 0.4 + Math.sin(rad) * 8;
            const cpY = GRIP_Y + (tipY - GRIP_Y) * 0.5;
            return (
              <path
                key={`stem-${i}`}
                d={`M ${GRIP_X} ${GRIP_Y} Q ${cpX} ${cpY} ${tipX} ${tipY}`}
                fill="none"
                stroke="#6a8a52"
                strokeWidth="2.4"
                strokeLinecap="round"
                opacity="0.7"
              />
            );
          })}
          {/* Stem bundle below grip */}
          {[...Array(Math.min(count + 1, 7))].map((_, i) => {
            const ox = (i - Math.min(count, 6) / 2) * 3;
            return (
              <line key={`bundle-${i}`}
                x1={GRIP_X + ox} y1={GRIP_Y + 2}
                x2={GRIP_X + ox * 1.3} y2={H + 10}
                stroke="#6a8a52" strokeWidth="2.2"
                strokeLinecap="round" opacity="0.65"
              />
            );
          })}
        </g>

        {/* Flower images — each rotated around grip point */}
        {renderOrder.map(({ f, i, angle }) => {
          const typeInfo = FLOWER_TYPES[f.type];
          if (!typeInfo) return null;

          // Image placed so bottom-center = grip point, then rotated
          const ix = GRIP_X - flowerSize / 2;
          const iy = GRIP_Y - flowerSize;

          return (
            <AnimatePresence key={`flower-${f.type}-${i}`}>
              <motion.g
                transform={`rotate(${angle}, ${GRIP_X}, ${GRIP_Y})`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                style={{ transformOrigin: `${GRIP_X}px ${GRIP_Y}px` }}
              >
                {/* White backing kills any PNG transparency */}
                <rect x={ix} y={iy} width={flowerSize} height={flowerSize}
                  fill="#fffdf9" rx="6" />
                <image
                  href={typeInfo.image}
                  x={ix} y={iy}
                  width={flowerSize} height={flowerSize}
                  preserveAspectRatio="xMidYMid meet"
                />
              </motion.g>
            </AnimatePresence>
          );
        })}

        {/* Ribbon bow — always on top */}
        <Ribbon x={GRIP_X} y={GRIP_Y} colors={ribbonColors} />
      </svg>
    </div>
  );
}

import React, { useMemo } from 'react';
import FLOWER_TYPES from '../engine/flowers';

/**
 * BouquetCanvas — hand-tied bouquet matching the reference image.
 *
 * Each flower sits at the top of its own long stem.
 * All stems converge at a tie/ribbon point in the lower-center.
 * Below the tie, stems continue as a tight bundle to the bottom.
 * Flowers are spread left/right at varying heights, like a real hand-tied bouquet.
 */

const W = 460;
const H = 640;
const TIE_X = W / 2;       // ribbon x
const TIE_Y = H * 0.68;    // ribbon y — lower third of canvas

// For each count, define flower head positions [x, y, scale, rotation]
// x, y = absolute canvas coordinates for the flower HEAD center
// These are hand-tuned to look like the reference
function getFlowerPositions(count) {
  const cx = W / 2;
  const topY = H * 0.10;   // tallest flower top
  const midY = H * 0.18;   // medium height
  const lowY = H * 0.26;   // lower flowers

  const configs = {
    1: [
      [cx, midY, 1.0, 0],
    ],
    2: [
      [cx - 55, midY, 0.92, -8],
      [cx + 55, topY, 0.95, 8],
    ],
    3: [
      [cx - 80, midY + 20, 0.88, -10],
      [cx,      topY,      0.95,  0],
      [cx + 80, midY,      0.90,  10],
    ],
    4: [
      [cx - 110, midY + 30, 0.82, -14],
      [cx - 40,  topY,      0.92,  -5],
      [cx + 40,  midY - 10, 0.90,   5],
      [cx + 110, midY + 20, 0.84,  14],
    ],
    5: [
      [cx - 130, lowY + 10, 0.78, -18],
      [cx - 65,  midY,      0.88,  -8],
      [cx,       topY,      0.95,   0],
      [cx + 65,  midY - 5,  0.88,   8],
      [cx + 130, lowY,      0.80,  18],
    ],
    6: [
      [cx - 140, lowY + 20, 0.75, -20],
      [cx - 80,  midY + 10, 0.84,  -10],
      [cx - 20,  topY + 5,  0.90,   -3],
      [cx + 20,  topY,      0.90,    3],
      [cx + 80,  midY,      0.84,   10],
      [cx + 140, lowY + 15, 0.76,   20],
    ],
    7: [
      [cx - 150, lowY + 25, 0.72, -22],
      [cx - 95,  midY + 15, 0.80,  -13],
      [cx - 40,  topY + 8,  0.87,   -6],
      [cx,       topY - 5,  0.92,    0],
      [cx + 40,  topY + 5,  0.87,    6],
      [cx + 95,  midY + 10, 0.80,   13],
      [cx + 150, lowY + 20, 0.73,   22],
    ],
  };

  // For 8+ flowers, extend the 7-flower layout
  if (count <= 7) return configs[count] || configs[1];

  const base = configs[7];
  const extra = [];
  for (let i = 7; i < count; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    extra.push([
      cx + side * (100 + (i - 7) * 20),
      lowY + 30 + (i - 7) * 15,
      0.70,
      side * 15,
    ]);
  }
  return [...base, ...extra];
}

function getRibbonColor(flowers) {
  const c = { pink: 0, warm: 0, blue: 0, white: 0 };
  flowers.forEach(f => {
    const col = FLOWER_TYPES[f.type]?.dominantColor ?? 'white';
    if (col === 'pink' || col === 'red') c.pink++;
    else if (col === 'warm') c.warm++;
    else if (col === 'blue') c.blue++;
    else c.white++;
  });
  const max = Math.max(...Object.values(c));
  if (c.pink === max) return { fill: '#f8d8e4', stroke: '#d4a0b0' };
  if (c.warm === max) return { fill: '#f8ecc0', stroke: '#c8a840' };
  if (c.blue === max) return { fill: '#dcd0f0', stroke: '#9878c8' };
  return { fill: '#f0ece4', stroke: '#b8a898' };
}

export default function BouquetCanvas({ flowers = [] }) {
  const count = flowers.length;
  const positions = useMemo(() => getFlowerPositions(count), [count]);
  const ribbon = useMemo(() => getRibbonColor(flowers), [flowers]);

  // Flower size — large enough to look real
  const FLOWER_SIZE = 180;

  // Z-order: center flowers in front
  const ordered = useMemo(() => {
    return flowers.map((f, i) => {
      const [fx, fy, scale, rot] = positions[i] || positions[0];
      const distFromCenter = Math.abs(fx - W / 2);
      return { f, i, fx, fy, scale, rot, z: -distFromCenter };
    }).sort((a, b) => a.z - b.z);
  }, [flowers, positions]);

  if (count === 0) return null;

  const stemColor = '#6a8a52';

  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#faf8f3',
      borderRadius: '1rem',
      overflow: 'hidden',
    }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {/* Background */}
        <rect width={W} height={H} fill="#faf8f3" />

        {/* ── STEMS above tie point ── */}
        {ordered.map(({ i, fx, fy, scale }) => {
          // Stem starts at bottom of flower image, ends at tie point
          const stemStartX = fx;
          const stemStartY = fy + (FLOWER_SIZE * scale) * 0.42; // bottom of flower
          // Gentle curve toward tie
          const cpx = fx * 0.35 + TIE_X * 0.65;
          const cpy = stemStartY * 0.4 + TIE_Y * 0.6;
          return (
            <path key={`stem-${i}`}
              d={`M ${stemStartX} ${stemStartY} Q ${cpx} ${cpy} ${TIE_X} ${TIE_Y}`}
              fill="none"
              stroke={stemColor}
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.85"
            />
          );
        })}

        {/* ── STEM BUNDLE below tie point ── */}
        {Array.from({ length: Math.min(count + 2, 10) }).map((_, i) => {
          const spread = Math.min(count + 1, 9);
          const ox = (i - spread / 2) * 4;
          return (
            <line key={`bundle-${i}`}
              x1={TIE_X + ox * 0.3}
              y1={TIE_Y + 2}
              x2={TIE_X + ox}
              y2={H + 10}
              stroke={stemColor}
              strokeWidth="2.0"
              strokeLinecap="round"
              opacity="0.8"
            />
          );
        })}

        {/* ── FLOWERS ── */}
        {ordered.map(({ f, i, fx, fy, scale, rot }) => {
          const info = FLOWER_TYPES[f.type];
          if (!info) return null;
          const sz = FLOWER_SIZE * scale;
          return (
            <g
              key={`flower-${i}-${f.type}`}
              transform={`rotate(${rot}, ${fx}, ${fy})`}
            >
              <image
                href={info.image}
                x={fx - sz / 2}
                y={fy - sz / 2}
                width={sz}
                height={sz}
                preserveAspectRatio="xMidYMid meet"
                style={{ mixBlendMode: 'darken' }}
              />
            </g>
          );
        })}

        {/* ── RIBBON BOW at tie point ── */}
        <g transform={`translate(${TIE_X}, ${TIE_Y})`}>
          {/* Left loop */}
          <path d="M0,0 C-12,-16 -62,-30 -64,2 C-64,22 -32,26 0,0Z"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1.4" opacity="0.96" />
          <path d="M0,0 C-12,-16 -62,-30 -64,2 C-64,22 -32,26 0,0Z"
            fill="rgba(255,255,255,0.4)" stroke="none" />
          {/* Right loop */}
          <path d="M0,0 C12,-16 62,-30 64,2 C64,22 32,26 0,0Z"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1.4" opacity="0.96" />
          <path d="M0,0 C12,-16 62,-30 64,2 C64,22 32,26 0,0Z"
            fill="rgba(255,255,255,0.4)" stroke="none" />
          {/* Left tail */}
          <path d="M-6,7 C-22,36 -42,76 -30,100 C-18,72 -6,36 0,9Z"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1.2" opacity="0.88" />
          {/* Right tail */}
          <path d="M6,7 C22,36 42,76 30,100 C18,72 6,36 0,9Z"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1.2" opacity="0.88" />
          {/* Knot */}
          <ellipse cx="0" cy="4" rx="12" ry="10"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1.5" />
          <ellipse cx="-2" cy="2" rx="5" ry="3.5"
            fill="rgba(255,255,255,0.65)" stroke="none" />
        </g>
      </svg>
    </div>
  );
}

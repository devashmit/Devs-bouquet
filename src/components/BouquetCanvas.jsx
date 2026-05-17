import React, { useMemo } from 'react';
import FLOWER_TYPES from '../engine/flowers';

/**
 * BouquetCanvas — dome cluster bouquet layout.
 *
 * Matches the reference image:
 * - Flowers clustered in a rounded dome shape
 * - Each flower positioned at (x, y) with its own scale and slight rotation
 * - Stems all converge downward to a single tie point
 * - White satin ribbon bow at the tie point
 * - mix-blend-mode: darken removes white PNG backgrounds
 */

const W = 500;
const H = 600;
const TIE_X = W / 2;
const TIE_Y = H * 0.74;

// Predefined cluster positions for up to 10 flowers
// Positions are relative to canvas center, in a dome shape
// [x_offset_from_center, y_offset_from_dome_center, scale, rotation_deg]
const CLUSTER_SLOTS = [
  // 1 flower — center
  [[0, 0, 1.0, 0]],
  // 2 flowers
  [[-70, 10, 0.9, -8], [70, 10, 0.9, 8]],
  // 3 flowers
  [[0, -20, 1.0, 0], [-85, 20, 0.85, -12], [85, 20, 0.85, 12]],
  // 4 flowers
  [[-50, -30, 0.9, -6], [50, -30, 0.9, 6], [-90, 25, 0.8, -15], [90, 25, 0.8, 15]],
  // 5 flowers
  [[0, -40, 0.95, 0], [-65, -15, 0.85, -8], [65, -15, 0.85, 8], [-95, 30, 0.78, -18], [95, 30, 0.78, 18]],
  // 6 flowers
  [[0, -50, 0.9, 0], [-60, -25, 0.82, -7], [60, -25, 0.82, 7], [-100, 10, 0.75, -16], [100, 10, 0.75, 16], [0, 20, 0.78, 3]],
  // 7 flowers
  [[0, -55, 0.88, 0], [-55, -30, 0.8, -7], [55, -30, 0.8, 7], [-100, 5, 0.73, -16], [100, 5, 0.73, 16], [-40, 25, 0.75, -5], [40, 25, 0.75, 5]],
  // 8 flowers
  [[0, -60, 0.85, 0], [-55, -35, 0.78, -7], [55, -35, 0.78, 7], [-100, 0, 0.72, -16], [100, 0, 0.72, 16], [-45, 25, 0.73, -5], [45, 25, 0.73, 5], [0, 30, 0.7, 2]],
  // 9 flowers
  [[0, -65, 0.83, 0], [-52, -38, 0.76, -7], [52, -38, 0.76, 7], [-98, -5, 0.7, -16], [98, -5, 0.7, 16], [-45, 22, 0.71, -5], [45, 22, 0.71, 5], [-15, 32, 0.68, -3], [15, 32, 0.68, 3]],
  // 10 flowers
  [[0, -68, 0.8, 0], [-50, -40, 0.74, -7], [50, -40, 0.74, 7], [-95, -8, 0.68, -16], [95, -8, 0.68, 16], [-42, 20, 0.69, -5], [42, 20, 0.69, 5], [-15, 30, 0.66, -3], [15, 30, 0.66, 3], [0, -10, 0.72, 1]],
];

// Dome center — where the flower cluster is centered
const DOME_CX = W / 2;
const DOME_CY = H * 0.38;

// Base flower image size
const BASE_SIZE = 220;

function getSlots(count) {
  const idx = Math.min(count, 10) - 1;
  const slots = CLUSTER_SLOTS[idx] || CLUSTER_SLOTS[CLUSTER_SLOTS.length - 1];
  // If more flowers than slots, repeat last slot with slight offsets
  const result = [...slots];
  while (result.length < count) {
    const last = slots[slots.length - 1];
    result.push([last[0] + (result.length % 2 === 0 ? -20 : 20), last[1] + 15, last[2] * 0.9, last[3] + 5]);
  }
  return result;
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
  if (c.pink === max) return { fill: '#f8d0dc', stroke: '#d4889a' };
  if (c.warm === max) return { fill: '#f8ecc0', stroke: '#c8a840' };
  if (c.blue === max) return { fill: '#d8ccf0', stroke: '#9878c8' };
  return { fill: '#f4f0ea', stroke: '#b8a898' };
}

export default function BouquetCanvas({ flowers = [] }) {
  const count = flowers.length;
  const slots = useMemo(() => getSlots(count), [count]);
  const ribbon = useMemo(() => getRibbonColor(flowers), [flowers]);

  // Z-order: center flowers on top
  const ordered = useMemo(() => {
    return flowers.map((f, i) => {
      const slot = slots[i] || slots[slots.length - 1];
      const [ox, oy, scale, rot] = slot;
      const cx = DOME_CX + ox;
      const cy = DOME_CY + oy;
      // Distance from dome center = z depth (closer to center = higher z)
      const dist = Math.sqrt(ox * ox + oy * oy);
      return { f, i, cx, cy, scale, rot, z: -dist };
    }).sort((a, b) => a.z - b.z); // back to front
  }, [flowers, slots]);

  if (count === 0) return null;

  return (
    <div style={{
      width: '100%', height: '100%',
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
        {/* Background */}
        <rect width={W} height={H} fill="#fffdf9" />

        {/* ── STEMS (behind flowers) ── */}
        <g>
          {ordered.map(({ i, cx, cy }) => {
            // Stem from flower center down to tie point, with gentle curve
            const cpx = cx * 0.4 + TIE_X * 0.6;
            const cpy = cy * 0.3 + TIE_Y * 0.7;
            return (
              <path key={`stem-${i}`}
                d={`M ${cx} ${cy + BASE_SIZE * 0.28} Q ${cpx} ${cpy} ${TIE_X + (i - count / 2) * 2} ${TIE_Y}`}
                fill="none"
                stroke="#5a7a42"
                strokeWidth="2.8"
                strokeLinecap="round"
                opacity="0.75"
              />
            );
          })}
          {/* Stem bundle below tie */}
          {Array.from({ length: Math.min(count + 2, 9) }).map((_, i) => {
            const ox = (i - Math.min(count + 1, 8) / 2) * 3.5;
            return (
              <line key={`b-${i}`}
                x1={TIE_X + ox} y1={TIE_Y}
                x2={TIE_X + ox * 1.8} y2={H + 20}
                stroke="#5a7a42" strokeWidth="2.5"
                strokeLinecap="round" opacity="0.65"
              />
            );
          })}
        </g>

        {/* ── FLOWERS ── */}
        {ordered.map(({ f, i, cx, cy, scale, rot }) => {
          const info = FLOWER_TYPES[f.type];
          if (!info) return null;

          const sz = BASE_SIZE * scale;
          const ix = cx - sz / 2;
          const iy = cy - sz / 2;

          return (
            <g
              key={`flower-${i}-${f.type}`}
              transform={`rotate(${rot}, ${cx}, ${cy})`}
            >
              <image
                href={info.image}
                x={ix} y={iy}
                width={sz} height={sz}
                preserveAspectRatio="xMidYMid meet"
                style={{ mixBlendMode: 'darken' }}
              />
            </g>
          );
        })}

        {/* ── RIBBON BOW ── */}
        <g transform={`translate(${TIE_X}, ${TIE_Y})`}>
          {/* Left loop */}
          <path d="M0,0 C-10,-14 -58,-28 -60,2 C-60,20 -30,24 0,0Z"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1.5" opacity="0.95" />
          <path d="M0,0 C-10,-14 -58,-28 -60,2 C-60,20 -30,24 0,0Z"
            fill="rgba(255,255,255,0.35)" stroke="none" />
          {/* Right loop */}
          <path d="M0,0 C10,-14 58,-28 60,2 C60,20 30,24 0,0Z"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1.5" opacity="0.95" />
          <path d="M0,0 C10,-14 58,-28 60,2 C60,20 30,24 0,0Z"
            fill="rgba(255,255,255,0.35)" stroke="none" />
          {/* Left tail */}
          <path d="M-5,6 C-20,32 -38,68 -28,92 C-16,66 -5,32 0,8Z"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1.2" opacity="0.88" />
          {/* Right tail */}
          <path d="M5,6 C20,32 38,68 28,92 C16,66 5,32 0,8Z"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1.2" opacity="0.88" />
          {/* Knot */}
          <ellipse cx="0" cy="4" rx="11" ry="9"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1.5" />
          <ellipse cx="-2" cy="2" rx="4" ry="3"
            fill="rgba(255,255,255,0.6)" stroke="none" />
        </g>
      </svg>
    </div>
  );
}

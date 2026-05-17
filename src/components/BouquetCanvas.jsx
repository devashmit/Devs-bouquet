import React, { useMemo } from 'react';
import FLOWER_TYPES from '../engine/flowers';

/**
 * BouquetCanvas — fan bouquet using darken blend mode.
 *
 * Each flower PNG has a white/cream background.
 * mix-blend-mode: darken makes white pixels invisible against
 * the cream canvas, so flowers layer naturally without white boxes.
 *
 * Layout:
 * - Flowers fan out from a grip point (ribbon position)
 * - Each flower is positioned so its stem base is near the grip
 * - Center flower upright, outer flowers angled left/right
 * - Flower size shrinks as count grows so heads stay separated
 */

const W = 500;
const H = 600;
const GRIP_X = W / 2;
const GRIP_Y = H * 0.80;

function getFanAngles(count) {
  if (count === 0) return [];
  if (count === 1) return [0];
  const arc = Math.min(15 + (count - 1) * 12, 110);
  return Array.from({ length: count }, (_, i) => {
    const t = (i / (count - 1)) - 0.5;
    return t * arc;
  });
}

function getSize(count) {
  if (count === 1) return 340;
  if (count === 2) return 280;
  if (count === 3) return 240;
  if (count === 4) return 210;
  if (count === 5) return 190;
  return Math.max(160, 190 - (count - 5) * 8);
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
  if (c.pink === max) return { fill: '#f4b8c8', stroke: '#d4889a' };
  if (c.warm === max) return { fill: '#f0d890', stroke: '#c8a840' };
  if (c.blue === max) return { fill: '#c8b8e8', stroke: '#9878c8' };
  return { fill: '#f0ece4', stroke: '#c0b0a0' };
}

export default function BouquetCanvas({ flowers = [] }) {
  const count = flowers.length;
  const angles = useMemo(() => getFanAngles(count), [count]);
  const size = useMemo(() => getSize(count), [count]);
  const ribbon = useMemo(() => getRibbonColor(flowers), [flowers]);

  // Paint outer flowers first (behind), center last (in front)
  const order = useMemo(() =>
    flowers
      .map((f, i) => ({ f, i, angle: angles[i] ?? 0, z: count - Math.abs(i - (count - 1) / 2) }))
      .sort((a, b) => a.z - b.z),
    [flowers, angles, count]
  );

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
        style={{ width: '100%', height: '100%', display: 'block', background: '#fffdf9' }}
      >
        {/* Background */}
        <rect width={W} height={H} fill="#fffdf9" />

        {/* Stems — behind flowers */}
        {order.map(({ i, angle }) => {
          const rad = (angle * Math.PI) / 180;
          // Stem end = where the flower base sits (bottom of image)
          // Image bottom-center is at grip, so stem goes from grip upward
          const stemTop = size * 0.55; // how far up the stem goes
          const ex = GRIP_X - Math.sin(rad) * stemTop;
          const ey = GRIP_Y - Math.cos(rad) * stemTop;
          const cpx = GRIP_X - Math.sin(rad) * stemTop * 0.45 + Math.cos(rad) * 5 * Math.sign(angle);
          const cpy = GRIP_Y - Math.cos(rad) * stemTop * 0.45;
          return (
            <path key={`s${i}`}
              d={`M${GRIP_X},${GRIP_Y} Q${cpx},${cpy} ${ex},${ey}`}
              fill="none" stroke="#6a8a52" strokeWidth="2.6"
              strokeLinecap="round" opacity="0.7"
            />
          );
        })}

        {/* Stem bundle below grip */}
        {Array.from({ length: Math.min(count + 2, 9) }).map((_, i) => {
          const ox = (i - Math.min(count + 1, 8) / 2) * 3;
          return (
            <line key={`b${i}`}
              x1={GRIP_X + ox} y1={GRIP_Y}
              x2={GRIP_X + ox * 1.5} y2={H + 10}
              stroke="#6a8a52" strokeWidth="2.3"
              strokeLinecap="round" opacity="0.6"
            />
          );
        })}

        {/* Flowers — rotated around grip, darken blend removes white bg */}
        {order.map(({ f, i, angle }) => {
          const info = FLOWER_TYPES[f.type];
          if (!info) return null;

          // Place image so its bottom-center = grip point, then rotate around grip
          const ix = GRIP_X - size / 2;
          const iy = GRIP_Y - size;

          return (
            <g
              key={`f${i}-${f.type}`}
              transform={`rotate(${angle},${GRIP_X},${GRIP_Y})`}
            >
              <image
                href={info.image}
                x={ix} y={iy}
                width={size} height={size}
                preserveAspectRatio="xMidYMid meet"
                style={{ mixBlendMode: 'darken' }}
              />
            </g>
          );
        })}

        {/* Ribbon bow */}
        <g transform={`translate(${GRIP_X},${GRIP_Y})`}>
          <path d="M0,0 C-8,-12 -50,-24 -52,2 C-52,16 -26,20 0,0Z"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1.3" opacity="0.95" />
          <path d="M0,0 C8,-12 50,-24 52,2 C52,16 26,20 0,0Z"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1.3" opacity="0.95" />
          <path d="M-4,4 C-16,26 -28,54 -20,76 C-12,54 -4,26 0,6Z"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1" opacity="0.88" />
          <path d="M4,4 C16,26 28,54 20,76 C12,54 4,26 0,6Z"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1" opacity="0.88" />
          <ellipse cx="0" cy="3" rx="9" ry="7"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1.4" />
          <ellipse cx="-2" cy="1" rx="3.5" ry="2.5"
            fill="rgba(255,255,255,0.55)" stroke="none" />
        </g>
      </svg>
    </div>
  );
}

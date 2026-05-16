import React, { useMemo } from 'react';
import FLOWER_TYPES from '../engine/flowers';

/**
 * BouquetCanvas — fan bouquet compositor using real PNG flower images.
 *
 * Key insight: each PNG has the flower head in the TOP ~65% and stem in the
 * bottom ~35%. We only show the flower head portion per flower (clipped),
 * and draw SVG stems separately converging at the grip point.
 * This way flowers don't cover each other with white rectangles.
 */

const W = 500;
const H = 600;
const GRIP_X = W / 2;
const GRIP_Y = H * 0.75; // ribbon/tie point

// How much of the image is "flower head" vs stem (top 65%)
const HEAD_FRACTION = 0.68;

function getFanAngles(count) {
  if (count === 0) return [];
  if (count === 1) return [0];
  const totalArc = Math.min(20 + (count - 1) * 13, 120);
  return Array.from({ length: count }, (_, i) => {
    const t = (i / (count - 1)) - 0.5;
    return t * totalArc;
  });
}

function getFlowerSize(count) {
  const base = 300;
  if (count <= 1) return base;
  return Math.max(base * 0.5, base * (1 - (count - 1) * 0.042));
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
  if (c.pink === max) return { fill: '#f4b8c8', stroke: '#d4889a' };
  if (c.warm === max) return { fill: '#f0d890', stroke: '#c8a840' };
  if (c.blue === max) return { fill: '#c8b8e8', stroke: '#9878c8' };
  return { fill: '#f0ece4', stroke: '#c0b0a0' };
}

function Ribbon({ x, y, fill, stroke }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M0,0 C-8,-12 -50,-24 -52,2 C-52,16 -26,20 0,0Z"
        fill={fill} stroke={stroke} strokeWidth="1.3" opacity="0.95" />
      <path d="M0,0 C8,-12 50,-24 52,2 C52,16 26,20 0,0Z"
        fill={fill} stroke={stroke} strokeWidth="1.3" opacity="0.95" />
      <path d="M-4,4 C-16,26 -30,56 -22,78 C-13,56 -4,26 0,6Z"
        fill={fill} stroke={stroke} strokeWidth="1" opacity="0.88" />
      <path d="M4,4 C16,26 30,56 22,78 C13,56 4,26 0,6Z"
        fill={fill} stroke={stroke} strokeWidth="1" opacity="0.88" />
      <ellipse cx="0" cy="3" rx="9" ry="7"
        fill={fill} stroke={stroke} strokeWidth="1.4" />
      <ellipse cx="-2" cy="1" rx="3.5" ry="2.5"
        fill="rgba(255,255,255,0.55)" stroke="none" />
    </g>
  );
}

export default function BouquetCanvas({ flowers = [] }) {
  const count = flowers.length;
  const fanAngles = useMemo(() => getFanAngles(count), [count]);
  const flowerSize = useMemo(() => getFlowerSize(count), [count]);
  const ribbonColors = useMemo(() => getRibbonColors(flowers), [flowers]);

  // Paint order: outer flowers behind, center flowers in front
  const renderOrder = useMemo(() => {
    return flowers
      .map((f, i) => ({
        f, i,
        angle: fanAngles[i] ?? 0,
        z: count - Math.abs(i - (count - 1) / 2),
      }))
      .sort((a, b) => a.z - b.z);
  }, [flowers, fanAngles, count]);

  if (count === 0) return null;

  // The stem length = bottom fraction of the image
  const stemLen = flowerSize * (1 - HEAD_FRACTION);
  // The head height = top fraction
  const headH = flowerSize * HEAD_FRACTION;

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
        <defs>
          {/* Clip path for each flower — only show the head portion */}
          {renderOrder.map(({ i }) => (
            <clipPath key={`clip-${i}`} id={`clip-${i}`}>
              {/* In the rotated coordinate space, clip to top HEAD_FRACTION of image */}
              <rect
                x={GRIP_X - flowerSize / 2}
                y={GRIP_Y - flowerSize}
                width={flowerSize}
                height={headH}
              />
            </clipPath>
          ))}
        </defs>

        {/* Solid background */}
        <rect width={W} height={H} fill="#fffdf9" />

        {/* ── STEMS (behind flowers) ── */}
        <g>
          {renderOrder.map(({ i, angle }) => {
            const rad = (angle * Math.PI) / 180;
            // Stem goes from grip up to where the flower head base sits
            const dist = flowerSize * HEAD_FRACTION * 0.85;
            const endX = GRIP_X - Math.sin(rad) * dist;
            const endY = GRIP_Y - Math.cos(rad) * dist;
            const cpX = GRIP_X - Math.sin(rad) * dist * 0.5 + Math.cos(rad) * 6;
            const cpY = GRIP_Y - Math.cos(rad) * dist * 0.5 + Math.sin(rad) * 6;
            return (
              <path key={`stem-${i}`}
                d={`M ${GRIP_X} ${GRIP_Y} Q ${cpX} ${cpY} ${endX} ${endY}`}
                fill="none" stroke="#6a8a52" strokeWidth="2.5"
                strokeLinecap="round" opacity="0.72"
              />
            );
          })}
          {/* Bundle below grip */}
          {[...Array(Math.min(count + 2, 8))].map((_, i) => {
            const ox = (i - Math.min(count + 1, 7) / 2) * 2.8;
            return (
              <line key={`b-${i}`}
                x1={GRIP_X + ox} y1={GRIP_Y + 2}
                x2={GRIP_X + ox * 1.4} y2={H + 20}
                stroke="#6a8a52" strokeWidth="2.2"
                strokeLinecap="round" opacity="0.6"
              />
            );
          })}
        </g>

        {/* ── FLOWER HEADS (clipped, rotated around grip) ── */}
        {renderOrder.map(({ f, i, angle }) => {
          const typeInfo = FLOWER_TYPES[f.type];
          if (!typeInfo) return null;

          const ix = GRIP_X - flowerSize / 2;
          const iy = GRIP_Y - flowerSize;

          return (
            <g
              key={`flower-${i}-${f.type}`}
              transform={`rotate(${angle}, ${GRIP_X}, ${GRIP_Y})`}
              clipPath={`url(#clip-${i})`}
            >
              {/* Cream backing only behind the head area */}
              <rect x={ix} y={iy} width={flowerSize} height={headH}
                fill="#fffdf9" />
              <image
                href={typeInfo.image}
                x={ix} y={iy}
                width={flowerSize} height={flowerSize}
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
          );
        })}

        {/* ── RIBBON (always on top) ── */}
        <Ribbon
          x={GRIP_X} y={GRIP_Y}
          fill={ribbonColors.fill}
          stroke={ribbonColors.stroke}
        />
      </svg>
    </div>
  );
}

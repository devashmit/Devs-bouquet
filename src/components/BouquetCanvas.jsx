import React, { useMemo } from 'react';
import FLOWER_TYPES from '../engine/flowers';
import GREENERY_CATALOG from '../engine/greenery';
import { zOrderSort } from '../engine/bouquetEngine';

/**
 * BouquetCanvas — cluster bouquet layout.
 *
 * Layer order (bottom to top):
 *   1. White background
 *   2. Greenery PNG — large, fills canvas, behind flowers
 *   3. Flower headImage PNGs — clustered in upper-center of greenery
 *
 * No SVG lines, no SVG bow, no half-cut flowers.
 * Max 5 flowers. Each flower fully visible within canvas.
 */

const W = 500;
const H = 500;

// Flower cluster center — upper portion of canvas where greenery opens up
const CX = W / 2;
const CY = H * 0.36;

// Fixed cluster positions for 1–5 flowers
// dx/dy are offsets from CX/CY
// All positions keep flowers fully within canvas at any reasonable size
const POSITIONS = [
  // 1 flower
  [{ dx: 0, dy: 0, rot: 0, scale: 1.0 }],
  // 2 flowers
  [{ dx: -45, dy: 8, rot: -8, scale: 0.92 }, { dx: 45, dy: 8, rot: 8, scale: 0.92 }],
  // 3 flowers
  [
    { dx: 0,   dy: -30, rot: 0,   scale: 0.95 },
    { dx: -52, dy: 18,  rot: -12, scale: 0.88 },
    { dx: 52,  dy: 18,  rot: 12,  scale: 0.88 },
  ],
  // 4 flowers
  [
    { dx: 0,   dy: -38, rot: 0,   scale: 0.90 },
    { dx: -50, dy: 0,   rot: -10, scale: 0.85 },
    { dx: 50,  dy: 0,   rot: 10,  scale: 0.85 },
    { dx: 0,   dy: 38,  rot: 0,   scale: 0.82 },
  ],
  // 5 flowers
  [
    { dx: 0,   dy: -42, rot: 0,   scale: 0.88 },
    { dx: -48, dy: -12, rot: -10, scale: 0.83 },
    { dx: 48,  dy: -12, rot: 10,  scale: 0.83 },
    { dx: -30, dy: 36,  rot: -6,  scale: 0.80 },
    { dx: 30,  dy: 36,  rot: 6,   scale: 0.80 },
  ],
];

// Base flower head size
function getBaseSize(count) {
  if (count <= 1) return 190;
  if (count === 2) return 168;
  if (count === 3) return 150;
  if (count === 4) return 136;
  return 124;
}

export default function BouquetCanvas({ flowers = [], greenery = null }) {
  const count = Math.min(flowers.length, 5);
  const displayFlowers = useMemo(() => flowers.slice(0, 5), [flowers]);
  const ordered = useMemo(() => zOrderSort(displayFlowers), [displayFlowers]);
  const baseSize = useMemo(() => getBaseSize(count), [count]);
  const positions = POSITIONS[Math.max(0, count - 1)] || POSITIONS[0];

  if (count === 0) return null;

  const greeneryInfo = greenery ? GREENERY_CATALOG[greenery] : null;
  // Greenery fills most of the canvas
  const gSize = W * 0.94;
  const gX = (W - gSize) / 2;
  const gY = H * 0.06;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
      isolation: 'isolate',
    }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-label="Bouquet preview"
      >
        {/* Background */}
        <rect width={W} height={H} fill="#ffffff" />

        {/* Greenery — large, behind flowers */}
        {greeneryInfo && (
          <image
            href={greeneryInfo.image}
            x={gX}
            y={gY}
            width={gSize}
            height={gSize}
            preserveAspectRatio="xMidYMid meet"
          />
        )}

        {/* Flowers — clustered, back to front via zOrderSort */}
        {ordered.map(({ type, originalIndex }) => {
          const info = FLOWER_TYPES[type];
          if (!info || originalIndex >= 5) return null;

          const pos = positions[originalIndex] ?? positions[0];
          const sz = baseSize * pos.scale;
          const fx = CX + pos.dx - sz / 2;
          const fy = CY + pos.dy - sz / 2;
          const pivotX = CX + pos.dx;
          const pivotY = CY + pos.dy;

          return (
            <g
              key={`fl-${originalIndex}-${type}`}
              transform={`rotate(${pos.rot}, ${pivotX}, ${pivotY})`}
            >
              <image
                href={info.headImage}
                x={fx}
                y={fy}
                width={sz}
                height={sz}
                preserveAspectRatio="xMidYMid meet"
                style={{ mixBlendMode: 'multiply' }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

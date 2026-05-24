import React, { useMemo } from 'react';
import FLOWER_TYPES from '../engine/flowers';
import GREENERY_CATALOG from '../engine/greenery';
import { zOrderSort } from '../engine/bouquetEngine';

/**
 * BouquetCanvas — cluster bouquet layout.
 *
 * Layer order (SVG paint order = bottom to top):
 *   1. White background rect
 *   2. Greenery PNG — large, fills canvas, ALWAYS drawn first
 *   3. Flower headImage PNGs — drawn AFTER greenery, always on top
 *
 * Bug fixes applied:
 *   - Positions clamped so no flower is ever cut by canvas edge
 *   - Greenery always rendered before flowers (z-order fix)
 *   - Flowers placed in a defined zone: center ±30% of canvas
 */

const W = 500;
const H = 500;

// Safe zone: flowers must stay within this box (accounting for flower radius)
// This prevents any flower from being clipped at canvas edges
const SAFE_PAD = 20; // minimum distance from canvas edge to flower center

// Flower cluster zone — upper-center of canvas where greenery opens up
// Derived from greenery bounding box: greenery fills ~94% of canvas
// The "open" zone where flowers should sit is roughly the upper 40% center
const ZONE_CX = W / 2;       // horizontal center
const ZONE_CY = H * 0.33;    // vertical center of flower zone (upper third)
const ZONE_RX = W * 0.22;    // horizontal radius of placement zone (±22% of width)
const ZONE_RY = H * 0.18;    // vertical radius of placement zone (±18% of height)

// Fixed cluster positions — all within the zone, staggered naturally
// dx/dy are offsets from ZONE_CX/ZONE_CY
const CLUSTER_POSITIONS = [
  // 1 flower — dead center
  [
    { dx: 0, dy: 0, rot: 0, scale: 1.0 },
  ],
  // 2 flowers — side by side, slight height difference
  [
    { dx: -38, dy: 5,  rot: -8,  scale: 0.95 },
    { dx:  38, dy: -5, rot:  8,  scale: 0.95 },
  ],
  // 3 flowers — triangle: one top-center, two lower sides
  [
    { dx:   0, dy: -28, rot:  0,  scale: 1.00 },
    { dx: -44, dy:  18, rot: -10, scale: 0.90 },
    { dx:  44, dy:  18, rot:  10, scale: 0.90 },
  ],
  // 4 flowers — diamond
  [
    { dx:   0, dy: -35, rot:  0,  scale: 0.95 },
    { dx: -42, dy:   0, rot: -10, scale: 0.88 },
    { dx:  42, dy:   0, rot:  10, scale: 0.88 },
    { dx:   0, dy:  35, rot:  0,  scale: 0.85 },
  ],
  // 5 flowers — arc: top-center + two mid + two lower
  [
    { dx:   0, dy: -38, rot:  0,  scale: 0.95 },
    { dx: -40, dy: -10, rot: -10, scale: 0.88 },
    { dx:  40, dy: -10, rot:  10, scale: 0.88 },
    { dx: -24, dy:  30, rot:  -6, scale: 0.83 },
    { dx:  24, dy:  30, rot:   6, scale: 0.83 },
  ],
];

function getBaseSize(count) {
  if (count <= 1) return 185;
  if (count === 2) return 162;
  if (count === 3) return 145;
  if (count === 4) return 132;
  return 120;
}

/**
 * Clamp a flower's top-left corner so the flower stays fully within canvas.
 * @param {number} x - top-left x of flower image
 * @param {number} y - top-left y of flower image
 * @param {number} sz - flower image size (square)
 * @returns {{ x: number, y: number }}
 */
function clampFlower(x, y, sz) {
  const minX = SAFE_PAD;
  const minY = SAFE_PAD;
  const maxX = W - sz - SAFE_PAD;
  const maxY = H - sz - SAFE_PAD;
  return {
    x: Math.max(minX, Math.min(maxX, x)),
    y: Math.max(minY, Math.min(maxY, y)),
  };
}

export default function BouquetCanvas({ flowers = [], greenery = null }) {
  const count = Math.min(flowers.length, 5);
  const displayFlowers = useMemo(() => flowers.slice(0, 5), [flowers]);

  // z-order: outer flowers behind, center flower on top
  const ordered = useMemo(() => zOrderSort(displayFlowers), [displayFlowers]);
  const baseSize = useMemo(() => getBaseSize(count), [count]);
  const positions = CLUSTER_POSITIONS[Math.max(0, count - 1)] ?? CLUSTER_POSITIONS[0];

  if (count === 0) return null;

  // Resolve greenery — fall back to eucalyptus if key not found
  const greeneryKey = greenery && GREENERY_CATALOG[greenery] ? greenery : 'eucalyptus';
  const greeneryInfo = GREENERY_CATALOG[greeneryKey];
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
        {/* ── Layer 1: Background ── */}
        <rect width={W} height={H} fill="#ffffff" />

        {/* ── Layer 2: Greenery — ALWAYS first, always behind flowers ── */}
        {greeneryInfo && (
          <image
            href={greeneryInfo.image}
            x={gX}
            y={gY}
            width={gSize}
            height={gSize}
            preserveAspectRatio="xMidYMid meet"
            style={{ mixBlendMode: 'multiply' }}
          />
        )}

        {/* ── Layer 3: Flowers — ALWAYS after greenery, always on top ── */}
        {ordered.map(({ type, originalIndex }) => {
          const info = FLOWER_TYPES[type];
          if (!info || originalIndex >= 5) return null;

          const pos = positions[originalIndex] ?? positions[0];
          const sz = baseSize * pos.scale;

          const rawX = ZONE_CX + pos.dx - sz / 2;
          const rawY = ZONE_CY + pos.dy - sz / 2;
          const { x: fx, y: fy } = clampFlower(rawX, rawY, sz);
          const pivotX = fx + sz / 2;
          const pivotY = fy + sz / 2;

          return (
            <g
              key={`fl-${originalIndex}-${type}`}
              transform={`rotate(${pos.rot}, ${pivotX}, ${pivotY})`}
            >
              {/* No blend mode — flowers have alpha channels, render normally on top */}
              <image
                href={info.headImage}
                x={fx}
                y={fy}
                width={sz}
                height={sz}
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

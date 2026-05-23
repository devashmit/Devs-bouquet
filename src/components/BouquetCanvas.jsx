import React, { useMemo } from 'react';
import FLOWER_TYPES from '../engine/flowers';
import GREENERY_CATALOG from '../engine/greenery';
import { zOrderSort } from '../engine/bouquetEngine';

/**
 * BouquetCanvas — flowers sit INSIDE the greenery.
 *
 * Layout:
 * - Greenery fills most of the canvas (large, centered)
 * - Flowers are placed in the upper portion of the greenery
 *   in a tight cluster, small enough to look natural inside the foliage
 * - Max 5 flowers, each placed at a specific position
 */

const W = 500;
const H = 500;
const CX = W / 2;
const CY = H * 0.42; // flower cluster center — upper area of greenery

// Fixed positions for up to 5 flowers inside the greenery
// Tight cluster, flowers overlap naturally like a real bouquet
const FLOWER_POSITIONS = [
  { dx: 0,    dy: 0,   rot: 0,   scale: 1.00 }, // center focal
  { dx: -55,  dy: 15,  rot: -12, scale: 0.82 }, // left
  { dx: 55,   dy: 15,  rot: 12,  scale: 0.82 }, // right
  { dx: -28,  dy: -45, rot: -6,  scale: 0.75 }, // upper left
  { dx: 28,   dy: -45, rot: 6,   scale: 0.75 }, // upper right
];

// Flower head size — small enough to sit inside greenery naturally
function getHeadSize(count) {
  if (count === 1) return 180;
  if (count === 2) return 155;
  if (count === 3) return 138;
  if (count === 4) return 125;
  return 115; // 5 flowers
}

export default function BouquetCanvas({ flowers = [], greenery = null }) {
  const count = Math.min(flowers.length, 5); // max 5
  const displayFlowers = flowers.slice(0, 5);
  const headSize = useMemo(() => getHeadSize(count), [count]);
  const ordered  = useMemo(() => zOrderSort(displayFlowers), [displayFlowers]);

  if (count === 0) return null;

  const GreeneryEntry = greenery ? GREENERY_CATALOG[greenery] : null;
  const greeneryImage = GreeneryEntry?.image ?? null;

  // Greenery fills the full canvas
  const greenerySize = W * 0.95;

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
      >
        <defs>
          <filter id="fl-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#3a2010" floodOpacity="0.15"/>
          </filter>
          <filter id="fl-blur">
            <feGaussianBlur stdDeviation="1"/>
          </filter>
        </defs>

        <rect width={W} height={H} fill="#ffffff"/>

        {/* Greenery — large, fills canvas, behind flowers */}
        {greeneryImage && (
          <image
            href={greeneryImage}
            x={(W - greenerySize) / 2}
            y={(H - greenerySize) / 2}
            width={greenerySize}
            height={greenerySize}
            preserveAspectRatio="xMidYMid meet"
            style={{ mixBlendMode: 'multiply' }}
          />
        )}

        {/* Flowers — small, clustered in upper center of greenery */}
        {ordered.map(({ type, originalIndex }, renderIdx) => {
          const info = FLOWER_TYPES[type];
          if (!info || originalIndex >= 5) return null;

          const pos = FLOWER_POSITIONS[originalIndex];
          const sz = headSize * pos.scale;
          const fx = CX + pos.dx - sz / 2;
          const fy = CY + pos.dy - sz / 2;
          const isBack = renderIdx < Math.floor(ordered.length * 0.4) && count > 2;

          return (
            <g
              key={`fl-${originalIndex}-${type}`}
              transform={`rotate(${pos.rot}, ${CX + pos.dx}, ${CY + pos.dy})`}
              filter={isBack ? 'url(#fl-blur)' : 'url(#fl-shadow)'}
            >
              <image
                href={info.headImage}
                x={fx} y={fy}
                width={sz} height={sz}
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

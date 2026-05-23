import React, { useMemo } from 'react';
import FLOWER_TYPES from '../engine/flowers';
import GREENERY_CATALOG from '../engine/greenery';
import { getFanAngles, getRibbonColor, zOrderSort } from '../engine/bouquetEngine';

/**
 * BouquetCanvas
 * - Flowers fan out from center, large enough to fill the canvas
 * - Greenery behind flowers
 * - No stems, no bow
 */

const W = 500;
const H = 500;
const CX = W / 2;   // center X
const CY = H * 0.52; // center of flower cluster

function getHeadSize(count) {
  // Large enough to be clearly visible
  if (count === 1) return 320;
  if (count === 2) return 260;
  if (count === 3) return 220;
  if (count === 4) return 195;
  if (count === 5) return 175;
  if (count === 6) return 158;
  return Math.max(130, 158 - (count - 6) * 10);
}

// Cluster positions — each flower placed around center, not fan-rotated
// This gives a natural bouquet cluster look
function getClusterPositions(count) {
  if (count === 0) return [];
  if (count === 1) return [{ x: 0, y: 0, rot: 0, scale: 1.0 }];

  const positions = [
    { x: 0,    y: 0,   rot: 0,   scale: 1.0  }, // center
    { x: -70,  y: 20,  rot: -15, scale: 0.88 }, // left
    { x: 70,   y: 20,  rot: 15,  scale: 0.88 }, // right
    { x: -40,  y: -50, rot: -8,  scale: 0.82 }, // upper left
    { x: 40,   y: -50, rot: 8,   scale: 0.82 }, // upper right
    { x: 0,    y: -70, rot: 0,   scale: 0.78 }, // top
    { x: -90,  y: -10, rot: -22, scale: 0.75 }, // far left
    { x: 90,   y: -10, rot: 22,  scale: 0.75 }, // far right
    { x: -55,  y: 55,  rot: -12, scale: 0.72 }, // lower left
    { x: 55,   y: 55,  rot: 12,  scale: 0.72 }, // lower right
  ];

  return positions.slice(0, count);
}

export default function BouquetCanvas({ flowers = [], greenery = null }) {
  const count = flowers.length;
  const baseSize = useMemo(() => getHeadSize(count), [count]);
  const ordered  = useMemo(() => zOrderSort(flowers), [flowers]);
  const positions = useMemo(() => getClusterPositions(count), [count]);

  if (count === 0) return null;

  const GreeneryEntry = greenery ? GREENERY_CATALOG[greenery] : null;
  const greeneryImage = GreeneryEntry?.image ?? null;
  const greeneryW = Math.min(count * 35 + 140, 340);

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
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#5a3020" floodOpacity="0.12"/>
          </filter>
          <filter id="fl-blur">
            <feGaussianBlur stdDeviation="0.8"/>
          </filter>
        </defs>

        <rect width={W} height={H} fill="#ffffff"/>

        {/* Greenery behind everything */}
        {greeneryImage && (
          <image
            href={greeneryImage}
            x={CX - greeneryW / 2}
            y={CY - greeneryW * 0.62}
            width={greeneryW}
            height={greeneryW}
            preserveAspectRatio="xMidYMid meet"
            style={{ mixBlendMode: 'multiply' }}
          />
        )}

        {/* Flowers — clustered arrangement, back to front */}
        {ordered.map(({ type, originalIndex }, renderIdx) => {
          const info = FLOWER_TYPES[type];
          if (!info) return null;

          const pos = positions[originalIndex] ?? positions[0];
          const sz = baseSize * pos.scale;
          const fx = CX + pos.x - sz / 2;
          const fy = CY + pos.y - sz / 2;
          const isBack = renderIdx < Math.floor(ordered.length * 0.4) && count > 3;

          return (
            <g
              key={`fl-${originalIndex}-${type}`}
              transform={`rotate(${pos.rot}, ${CX + pos.x}, ${CY + pos.y})`}
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

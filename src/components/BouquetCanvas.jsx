import React, { useMemo } from 'react';
import FLOWER_TYPES from '../engine/flowers';
import GREENERY_CATALOG from '../engine/greenery';
import { getFanAngles, getRibbonColor, zOrderSort } from '../engine/bouquetEngine';

const W = 500;
const H = 580;
const TIE_X = W / 2;
const TIE_Y = H * 0.65; // higher up so flowers fill canvas better

// Smaller sizes so flowers don't dominate
function getHeadSize(count) {
  if (count === 1) return 200;
  if (count === 2) return 170;
  if (count === 3) return 150;
  if (count === 4) return 135;
  if (count === 5) return 122;
  if (count === 6) return 112;
  return Math.max(90, 112 - (count - 6) * 8);
}

export default function BouquetCanvas({ flowers = [], greenery = null }) {
  const count = flowers.length;
  const angles   = useMemo(() => getFanAngles(count), [count]);
  const headSize = useMemo(() => getHeadSize(count), [count]);
  const ordered  = useMemo(() => zOrderSort(flowers), [flowers]);

  if (count === 0) return null;

  const GreeneryEntry = greenery ? GREENERY_CATALOG[greenery] : null;
  const greeneryImage = GreeneryEntry?.image ?? null;
  const greeneryW = Math.min(count * 30 + 120, 280);

  return (
    <div style={{
      width: '100%', height: '100%',
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
          <filter id="head-shadow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#5a3020" floodOpacity="0.10"/>
          </filter>
          <filter id="head-blur">
            <feGaussianBlur stdDeviation="0.7"/>
          </filter>
          <radialGradient id="bg-atmo" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="rgba(244,194,194,0.04)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>

        <rect width={W} height={H} fill="#ffffff"/>
        <rect width={W} height={H} fill="url(#bg-atmo)"/>

        {/* Greenery — behind flowers, centered at tie point */}
        {greeneryImage && (
          <image
            href={greeneryImage}
            x={TIE_X - greeneryW / 2}
            y={TIE_Y - greeneryW * 0.6}
            width={greeneryW}
            height={greeneryW}
            preserveAspectRatio="xMidYMid meet"
            style={{ mixBlendMode: 'multiply' }}
          />
        )}

        {/* NO stem lines — greenery handles the base visual */}

        {/* Flower heads — fanned around tie point */}
        {ordered.map(({ type, originalIndex }, renderIdx) => {
          const info = FLOWER_TYPES[type];
          if (!info) return null;

          const angle = angles[originalIndex] ?? 0;
          const isOuter = renderIdx < Math.floor(ordered.length * 0.35) && count > 3;

          const ix = TIE_X - headSize / 2;
          const iy = TIE_Y - headSize;

          return (
            <g
              key={`head-${originalIndex}-${type}`}
              transform={`rotate(${angle}, ${TIE_X}, ${TIE_Y})`}
              filter={isOuter ? 'url(#head-blur)' : 'url(#head-shadow)'}
            >
              <image
                href={info.headImage}
                x={ix} y={iy}
                width={headSize} height={headSize}
                preserveAspectRatio="xMidYMax meet"
                style={{ mixBlendMode: 'multiply' }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

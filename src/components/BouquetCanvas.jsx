import React, { useMemo } from 'react';
import FLOWER_TYPES from '../engine/flowers';
import GREENERY_CATALOG from '../engine/greenery';
import { getFanAngles, getRibbonColor, zOrderSort } from '../engine/bouquetEngine';

/**
 * BouquetCanvas — premium flower head composition.
 *
 * - Uses pre-cropped *_head.png (stems removed)
 * - Selected greenery rendered behind flowers
 * - No bow — clean professional look
 * - mix-blend-mode: multiply removes white PNG backgrounds
 */

const W = 500;
const H = 580;
const TIE_X = W / 2;
const TIE_Y = H * 0.70;

function getHeadSize(count) {
  if (count === 1) return 260;
  if (count === 2) return 220;
  if (count === 3) return 195;
  if (count === 4) return 175;
  if (count === 5) return 158;
  if (count === 6) return 144;
  return Math.max(118, 144 - (count - 6) * 9);
}

export default function BouquetCanvas({ flowers = [], greenery = null }) {
  const count = flowers.length;
  const angles   = useMemo(() => getFanAngles(count), [count]);
  const headSize = useMemo(() => getHeadSize(count), [count]);
  const ordered  = useMemo(() => zOrderSort(flowers), [flowers]);

  if (count === 0) return null;

  const GreeneryEntry = greenery ? GREENERY_CATALOG[greenery] : null;
  const GreeneryComponent = GreeneryEntry?.component ?? null;
  const greeneryW = Math.min(count * 28 + 110, 260);

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
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#5a3020" floodOpacity="0.10"/>
          </filter>
          <filter id="head-blur">
            <feGaussianBlur stdDeviation="0.8"/>
          </filter>
          <radialGradient id="bg-atmo" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="rgba(244,194,194,0.04)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>

        <rect width={W} height={H} fill="#ffffff"/>
        <rect width={W} height={H} fill="url(#bg-atmo)"/>

        {/* Greenery layer — behind flowers */}
        {GreeneryComponent && (
          <foreignObject
            x={TIE_X - greeneryW / 2}
            y={TIE_Y - greeneryW * 0.48}
            width={greeneryW}
            height={greeneryW * 0.72}
          >
            <div xmlns="http://www.w3.org/1999/xhtml"
              style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GreeneryComponent size={greeneryW} />
            </div>
          </foreignObject>
        )}

        {/* Unified stems */}
        <g opacity="0.68">
          {ordered.map(({ originalIndex }) => {
            const spread = (originalIndex - (count - 1) / 2) * 5;
            return (
              <path key={`stem-${originalIndex}`}
                d={`M ${TIE_X + spread * 0.15} ${TIE_Y + 2} C ${TIE_X + spread * 0.4} ${TIE_Y + 35} ${TIE_X + spread * 0.7} ${TIE_Y + 75} ${TIE_X + spread} ${H + 10}`}
                fill="none" stroke="#5a7a42" strokeWidth="2.0" strokeLinecap="round"
              />
            );
          })}
        </g>

        {/* Flower heads */}
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

        {/* Stem tie — simple wrap, no bow */}
        <rect
          x={TIE_X - 12} y={TIE_Y - 4}
          width={24} height={14}
          rx="3"
          fill="#c8b090" opacity="0.55"
        />
        <rect
          x={TIE_X - 10} y={TIE_Y - 2}
          width={20} height={10}
          rx="2"
          fill="#d8c0a0" opacity="0.4"
        />
      </svg>
    </div>
  );
}

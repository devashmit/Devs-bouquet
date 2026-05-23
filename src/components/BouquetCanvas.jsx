import React, { useMemo } from 'react';
import FLOWER_TYPES from '../engine/flowers';
import GREENERY_TYPES from '../engine/greenery';
import { getFanAngles, getRibbonColor, zOrderSort } from '../engine/bouquetEngine';

/**
 * BouquetCanvas — premium flower head composition.
 *
 * Each flower PNG is clipped to show only the bloom (top headCrop fraction).
 * The clipped head sits above TIE_Y; unified stems are drawn below.
 * Greenery SVG sits behind flowers at the base.
 */

const W = 500;
const H = 600;
const TIE_X = W / 2;
const TIE_Y = H * 0.70;

function getImgSize(count) {
  if (count === 1) return 320;
  if (count === 2) return 280;
  if (count === 3) return 250;
  if (count === 4) return 225;
  if (count === 5) return 205;
  if (count === 6) return 188;
  return Math.max(155, 188 - (count - 6) * 10);
}

export default function BouquetCanvas({ flowers = [], greenery = 'leafy' }) {
  const count = flowers.length;
  const angles  = useMemo(() => getFanAngles(count), [count]);
  const imgSize = useMemo(() => getImgSize(count), [count]);
  const ribbon  = useMemo(() => getRibbonColor(flowers), [flowers]);
  const ordered = useMemo(() => zOrderSort(flowers), [flowers]);

  if (count === 0) return null;

  const GreeneryComponent = GREENERY_TYPES[greenery]?.component;
  const greeneryW = Math.min(count * 28 + 90, 220);

  return (
    <div style={{ width: '100%', height: '100%', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          {/* Clip path for each flower — ellipse covering only the head area */}
          {ordered.map(({ type, originalIndex }) => {
            const info = FLOWER_TYPES[type];
            if (!info) return null;
            const headH = imgSize * info.headCrop;
            const ix = TIE_X - imgSize / 2;
            const iy = TIE_Y - headH; // top of visible head area

            // Ellipse clip — slightly wider than the image, rounded at top
            // This gives a natural petal-shaped crop instead of a hard rectangle
            const clipCx = TIE_X;
            const clipCy = iy + headH * 0.45;
            const clipRx = imgSize * 0.48;
            const clipRy = headH * 0.55;

            return (
              <clipPath key={`clip-${originalIndex}`} id={`head-clip-${originalIndex}`}>
                <ellipse cx={clipCx} cy={clipCy} rx={clipRx} ry={clipRy} />
              </clipPath>
            );
          })}

          {/* Drop shadow filter */}
          <filter id="flower-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#8a5040" floodOpacity="0.12"/>
          </filter>

          {/* Blur filter for background flowers */}
          <filter id="flower-blur">
            <feGaussianBlur stdDeviation="0.8"/>
          </filter>

          {/* Warm vignette */}
          <radialGradient id="vignette" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="transparent"/>
            <stop offset="100%" stopColor="rgba(160,100,70,0.04)"/>
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width={W} height={H} fill="#ffffff"/>
        <rect width={W} height={H} fill="url(#vignette)"/>

        {/* Atmospheric wash */}
        <ellipse cx={W*0.5} cy={H*0.38} rx={W*0.48} ry={H*0.35}
          fill="rgba(244,194,194,0.04)"/>

        {/* Greenery behind everything */}
        {GreeneryComponent && (
          <foreignObject
            x={TIE_X - greeneryW / 2}
            y={TIE_Y - greeneryW * 0.5}
            width={greeneryW}
            height={greeneryW * 0.7}
          >
            <div xmlns="http://www.w3.org/1999/xhtml"
              style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GreeneryComponent size={greeneryW} />
            </div>
          </foreignObject>
        )}

        {/* Unified stems — curved paths from TIE_Y downward */}
        <g opacity="0.72">
          {ordered.map(({ originalIndex }) => {
            const angle = angles[originalIndex] ?? 0;
            const rad = (angle * Math.PI) / 180;
            // Stem starts just below TIE_Y, spreads slightly
            const spread = originalIndex - (count - 1) / 2;
            const endX = TIE_X + spread * 5;
            const endY = H + 10;
            const cp1x = TIE_X + Math.sin(rad) * 15;
            const cp1y = TIE_Y + 30;
            const cp2x = endX + spread * 3;
            const cp2y = TIE_Y + (H - TIE_Y) * 0.5;
            return (
              <path key={`stem-${originalIndex}`}
                d={`M ${TIE_X} ${TIE_Y} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${endX} ${endY}`}
                fill="none" stroke="#5a7a42" strokeWidth="2.2" strokeLinecap="round"/>
            );
          })}
        </g>

        {/* Flower heads — clipped to show only bloom area */}
        {ordered.map(({ type, originalIndex }, renderIdx) => {
          const info = FLOWER_TYPES[type];
          if (!info) return null;
          const angle = angles[originalIndex] ?? 0;
          const isOuter = Math.abs(originalIndex - (count - 1) / 2) > (count - 1) / 3;
          const headH = imgSize * info.headCrop;

          // Image positioned so bottom of head area = TIE_Y
          const ix = TIE_X - imgSize / 2;
          const iy = TIE_Y - headH;

          return (
            <g
              key={`flower-${originalIndex}-${type}`}
              transform={`rotate(${angle}, ${TIE_X}, ${TIE_Y})`}
              filter={isOuter && count > 3 ? 'url(#flower-blur)' : 'url(#flower-shadow)'}
            >
              <image
                href={info.image}
                x={ix}
                y={iy}
                width={imgSize}
                height={imgSize}
                preserveAspectRatio="xMidYMin meet"
                clipPath={`url(#head-clip-${originalIndex})`}
                style={{ mixBlendMode: 'multiply' }}
              />
            </g>
          );
        })}

        {/* Ribbon bow */}
        <g transform={`translate(${TIE_X},${TIE_Y})`}>
          {/* Left loop */}
          <path d="M0,0 C-8,-10 -48,-22 -50,2 C-50,16 -26,20 0,0Z"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1.2" opacity="0.95"/>
          <path d="M0,0 C-8,-10 -48,-22 -50,2 C-50,16 -26,20 0,0Z"
            fill="rgba(255,255,255,0.35)" stroke="none"/>
          {/* Right loop */}
          <path d="M0,0 C8,-10 48,-22 50,2 C50,16 26,20 0,0Z"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1.2" opacity="0.95"/>
          <path d="M0,0 C8,-10 48,-22 50,2 C50,16 26,20 0,0Z"
            fill="rgba(255,255,255,0.35)" stroke="none"/>
          {/* Short tails */}
          <path d="M-4,5 C-12,18 -20,34 -14,46 C-8,32 -3,18 0,7Z"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1" opacity="0.85"/>
          <path d="M4,5 C12,18 20,34 14,46 C8,32 3,18 0,7Z"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1" opacity="0.85"/>
          {/* Knot */}
          <ellipse cx="0" cy="3" rx="9" ry="7"
            fill={ribbon.fill} stroke={ribbon.stroke} strokeWidth="1.3"/>
          <ellipse cx="-1.5" cy="1.5" rx="3.5" ry="2.5"
            fill="rgba(255,255,255,0.6)" stroke="none"/>
        </g>
      </svg>
    </div>
  );
}

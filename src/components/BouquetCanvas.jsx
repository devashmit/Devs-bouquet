import React, { useMemo } from 'react';
import FLOWER_TYPES from '../engine/flowers';
import {
  getFanAngles,
  getFlowerSize,
  getRibbonColor,
  zOrderSort,
} from '../engine/bouquetEngine';

/**
 * BouquetCanvas
 *
 * Renders a hand-tied bouquet as an SVG scene.
 * Each flower PNG is placed so its bottom-center aligns with the Tie_Point,
 * then rotated around the Tie_Point by its fan angle.
 *
 * Returns null when flowers is empty (AIBouquetViewer handles the placeholder).
 */

const W = 480;
const H = 580;
const TIE_X = 240;
const TIE_Y = H * 0.68; // ≈ 394

export default function BouquetCanvas({ flowers = [] }) {
  const count = flowers.length;

  const angles = useMemo(() => getFanAngles(count), [count]);
  const size = useMemo(() => getFlowerSize(count), [count]);
  const ribbon = useMemo(() => getRibbonColor(flowers), [flowers]);

  // Sort so outer flowers render first (behind), center flowers last (in front)
  const ordered = useMemo(() => zOrderSort(flowers), [flowers]);

  if (count === 0) return null;

  // Number of stem lines in the bundle below the tie point
  const stemCount = Math.min(count + 2, 10);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-label="Bouquet preview"
    >
      {/* Background */}
      <rect width={W} height={H} fill="#faf8f3" />

      {/* Stem bundle below tie point — REMOVED, looks cleaner without */}



      {/* Flower images — outer flowers first (behind), center last (in front) */}
      {ordered.map(({ type, originalIndex }) => {
        const info = FLOWER_TYPES[type];
        if (!info) return null;
        const angle = angles[originalIndex] ?? 0;

        return (
          <g
            key={`fl-${originalIndex}-${type}`}
            transform={`rotate(${angle}, ${TIE_X}, ${TIE_Y})`}
          >
            <image
              href={info.image}
              x={TIE_X - size / 2}
              y={TIE_Y - size}
              width={size}
              height={size}
              preserveAspectRatio="xMidYMid meet"
              style={{ mixBlendMode: 'darken' }}
            />
          </g>
        );
      })}

      {/* Ribbon bow at TIE_X, TIE_Y */}
      <g transform={`translate(${TIE_X},${TIE_Y})`}>
        {/* Left loop */}
        <path
          d="M0,0 C-10,-14 -58,-28 -60,2 C-60,20 -30,24 0,0Z"
          fill={ribbon.fill}
          stroke={ribbon.stroke}
          strokeWidth="1.4"
          opacity="0.96"
        />
        <path
          d="M0,0 C-10,-14 -58,-28 -60,2 C-60,20 -30,24 0,0Z"
          fill="rgba(255,255,255,0.38)"
          stroke="none"
        />
        {/* Right loop */}
        <path
          d="M0,0 C10,-14 58,-28 60,2 C60,20 30,24 0,0Z"
          fill={ribbon.fill}
          stroke={ribbon.stroke}
          strokeWidth="1.4"
          opacity="0.96"
        />
        <path
          d="M0,0 C10,-14 58,-28 60,2 C60,20 30,24 0,0Z"
          fill="rgba(255,255,255,0.38)"
          stroke="none"
        />
        {/* Left tail */}
        <path
          d="M-5,6 C-16,22 -28,44 -20,58 C-12,42 -4,22 0,8Z"
          fill={ribbon.fill}
          stroke={ribbon.stroke}
          strokeWidth="1.2"
          opacity="0.88"
        />
        {/* Right tail */}
        <path
          d="M5,6 C16,22 28,44 20,58 C12,42 4,22 0,8Z"
          fill={ribbon.fill}
          stroke={ribbon.stroke}
          strokeWidth="1.2"
          opacity="0.88"
        />
        {/* Center knot */}
        <ellipse
          cx="0"
          cy="4"
          rx="11"
          ry="9"
          fill={ribbon.fill}
          stroke={ribbon.stroke}
          strokeWidth="1.5"
        />
        <ellipse cx="-2" cy="2" rx="4.5" ry="3" fill="rgba(255,255,255,0.65)" stroke="none" />
      </g>
    </svg>
  );
}

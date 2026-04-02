import React from 'react';
import { createRng } from '../randomizer';

// Lavender spike — dense purple florets
export default function Lavender({ x = 0, y = 0, scale = 1, rotation = 0, seed = 1, styleMode = 'sketch' }) {
  const rng = createRng(seed);
  const j = (v, a) => v + (rng.random() - 0.5) * 2 * a;

  const isMono = styleMode === 'mono';
  const fill   = isMono ? 'rgba(160,155,175,0.8)' : 'rgba(130,100,190,0.75)';
  const dfill  = isMono ? 'rgba(130,125,145,0.9)' : 'rgba(100,70,160,0.85)';
  const sk     = isMono ? '#444' : '#5a3a8a';
  const stemC  = isMono ? '#666' : '#6a8a5a';

  const floretCount = 14;

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation}) scale(${scale})`}>
      {/* Stem */}
      <path d={`M${j(0,1)},0 C${j(1,2)},${j(-20,3)} ${j(-1,2)},${j(-44,3)} ${j(0,1)},${j(-65,3)}`}
        fill="none" stroke={stemC} strokeWidth="1.3" strokeLinecap="round" />
      {/* Dense florets */}
      {Array.from({ length: floretCount }).map((_, i) => {
        const t = i / (floretCount - 1);
        const yOff = -t * 52 - 12;
        const side = i % 2 === 0 ? 1 : -1;
        const xOff = side * j(5, 2);
        const tilt = side * j(22, 6);
        const f = i > floretCount * 0.6 ? dfill : fill; // darker at top
        return (
          <ellipse key={i}
            cx={j(xOff, 1.5)} cy={j(yOff, 2)}
            rx={j(4, 0.8)} ry={j(6, 1)}
            fill={f} stroke={sk} strokeWidth="0.7"
            opacity={0.7 + rng.random() * 0.3}
            transform={`rotate(${tilt}, ${xOff}, ${yOff})`}
          />
        );
      })}
    </g>
  );
}

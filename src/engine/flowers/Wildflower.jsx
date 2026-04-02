import React from 'react';
import { createRng } from '../randomizer';

// Tiny yellow wildflower clusters
export default function Wildflower({ x = 0, y = 0, scale = 1, rotation = 0, seed = 1, styleMode = 'sketch' }) {
  const rng = createRng(seed);
  const j = (v, a) => v + (rng.random() - 0.5) * 2 * a;

  const isMono = styleMode === 'mono';
  const isPastel = styleMode === 'pastel';
  const fill   = isMono ? '#d8d8d8' : isPastel ? '#fef4c0' : '#f8e040';
  const stroke = isMono ? '#666'    : isPastel ? '#c0a840' : '#a08020';
  const stemC  = isMono ? '#777'    : '#7a9a5a';

  const branches = 6;

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation}) scale(${scale})`}>
      {Array.from({ length: branches }).map((_, i) => {
        const angle = (i / branches) * 360 - 80 + j(0, 15);
        const rad = (angle * Math.PI) / 180;
        const len = j(16, 4);
        const bx = Math.cos(rad) * len;
        const by = Math.sin(rad) * len;
        return (
          <g key={i}>
            <path d={`M${j(0,1)},${j(0,1)} C${j(bx*0.4,2)},${j(by*0.4,2)} ${j(bx*0.8,2)},${j(by*0.8,2)} ${j(bx,2)},${j(by,2)}`}
              fill="none" stroke={stemC} strokeWidth="0.8" opacity="0.7" />
            <circle cx={j(bx,2)} cy={j(by,2)} r={j(3.5,0.8)}
              fill={fill} stroke={stroke} strokeWidth="0.7" opacity="0.9" />
          </g>
        );
      })}
    </g>
  );
}

import React from 'react';
import { createRng } from '../randomizer';

// Small star-shaped wildflower (like the pink star in the reference image)
export default function Lily({ x = 0, y = 0, scale = 1, rotation = 0, seed = 1, styleMode = 'sketch' }) {
  const rng = createRng(seed);
  const j = (v, a) => v + (rng.random() - 0.5) * 2 * a;

  const isMono = styleMode === 'mono';
  const isPastel = styleMode === 'pastel';
  const fill   = isMono ? '#e0e0e0' : isPastel ? '#f8e0f0' : '#f0c0d8';
  const stroke = isMono ? '#555'    : isPastel ? '#c0a0b8' : '#b07090';

  const petalCount = 5;

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation}) scale(${scale})`}>
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i / petalCount) * 360 - 90 + j(0, 5);
        const rad = (angle * Math.PI) / 180;
        const len = j(20, 3);
        const w = j(6, 1);
        const tipX = Math.cos(rad) * len;
        const tipY = Math.sin(rad) * len;
        const lx = Math.cos(rad + Math.PI / 2) * w;
        const ly = Math.sin(rad + Math.PI / 2) * w;
        return (
          <path key={i}
            d={`M${j(lx*0.3,1)},${j(ly*0.3,1)} C${j(lx+tipX*0.3,2)},${j(ly+tipY*0.3,2)} ${j(tipX*0.8+lx*0.2,2)},${j(tipY*0.8+ly*0.2,2)} ${j(tipX,2)},${j(tipY,2)} C${j(tipX*0.8-lx*0.2,2)},${j(tipY*0.8-ly*0.2,2)} ${j(-lx+tipX*0.3,2)},${j(-ly+tipY*0.3,2)} ${j(-lx*0.3,1)},${j(-ly*0.3,1)} Z`}
            fill={fill} stroke={stroke} strokeWidth="1"
            opacity={0.85 + rng.random() * 0.15}
          />
        );
      })}
      {/* Center */}
      <circle cx={j(0,1)} cy={j(0,1)} r={j(4,1)}
        fill={isMono ? '#bbb' : isPastel ? '#f8e0a0' : '#f5d060'}
        stroke={isMono ? '#666' : '#c09030'} strokeWidth="0.8" />
    </g>
  );
}

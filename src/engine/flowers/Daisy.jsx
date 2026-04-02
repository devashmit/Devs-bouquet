import React from 'react';
import { createRng } from '../randomizer';

// Large daisy — long thin white petals, golden center
export default function Daisy({ x = 0, y = 0, scale = 1, rotation = 0, seed = 1, styleMode = 'sketch' }) {
  const rng = createRng(seed);
  const j = (v, a) => v + (rng.random() - 0.5) * 2 * a;

  const isMono = styleMode === 'mono';
  const pfill  = isMono ? 'rgba(240,240,240,0.9)' : 'rgba(255,255,252,0.92)';
  const psk    = isMono ? '#555' : '#6a6040';
  const cfill  = isMono ? '#c0c0c0' : '#e8c030';
  const csk    = isMono ? '#666' : '#a08020';

  const petalCount = 16;

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation}) scale(${scale})`}>
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i / petalCount) * 360 + j(0, 4);
        const rad = (angle * Math.PI) / 180;
        const len = j(30, 3);
        const w = j(5, 1);

        const tipX = Math.cos(rad) * len;
        const tipY = Math.sin(rad) * len;
        const px = -Math.sin(rad) * w;
        const py = Math.cos(rad) * w;

        return (
          <path key={i}
            d={`M${j(px*0.4,1)},${j(py*0.4,1)} C${j(px+tipX*0.25,2)},${j(py+tipY*0.25,2)} ${j(tipX*0.7+px*0.3,2)},${j(tipY*0.7+py*0.3,2)} ${j(tipX,1)},${j(tipY,1)} C${j(tipX*0.7-px*0.3,2)},${j(tipY*0.7-py*0.3,2)} ${j(-px+tipX*0.25,2)},${j(-py+tipY*0.25,2)} ${j(-px*0.4,1)},${j(-py*0.4,1)} Z`}
            fill={pfill} stroke={psk} strokeWidth="0.85"
            opacity={0.85 + rng.random() * 0.15}
          />
        );
      })}
      {/* Center — large golden disc */}
      <circle cx={j(0,1)} cy={j(0,1)} r={j(11,1)}
        fill={cfill} stroke={csk} strokeWidth="1.2" />
      {/* Inner darker ring */}
      <circle cx={j(0,1)} cy={j(0,1)} r={j(6,1)}
        fill={isMono ? '#aaa' : '#c8a010'} stroke={csk} strokeWidth="0.7" opacity="0.7" />
      {/* Texture dots */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <circle key={i} cx={j(Math.cos(a)*5,1)} cy={j(Math.sin(a)*5,1)} r="1"
          fill={isMono ? '#888' : '#a08010'} opacity="0.5" />;
      })}
    </g>
  );
}

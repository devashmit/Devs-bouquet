import React from 'react';
import { createRng } from '../randomizer';

// Tall tulip — slightly open at top, ink lines visible
export default function Tulip({ x = 0, y = 0, scale = 1, rotation = 0, seed = 1, styleMode = 'sketch' }) {
  const rng = createRng(seed);
  const j = (v, a) => v + (rng.random() - 0.5) * 2 * a;

  const isMono = styleMode === 'mono';
  const wfill  = isMono ? 'rgba(200,190,190,0.35)' : 'rgba(240,190,185,0.4)';
  const ifill  = isMono ? 'rgba(170,160,160,0.45)' : 'rgba(215,155,155,0.48)';
  const sk     = isMono ? '#3a3a3a' : '#5a3040';

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation}) scale(${scale})`}>
      {/* Left petal */}
      <path d={`M${j(-2,2)},${j(4,2)} C${j(-20,3)},${j(-4,3)} ${j(-26,3)},${j(-32,3)} ${j(-16,3)},${j(-56,3)} C${j(-10,3)},${j(-66,3)} ${j(-2,3)},${j(-68,3)} ${j(2,3)},${j(-60,3)} C${j(4,3)},${j(-44,3)} ${j(2,3)},${j(-18,3)} ${j(-2,2)},${j(4,2)} Z`}
        fill={wfill} stroke={sk} strokeWidth="1.2" />
      {/* Right petal */}
      <path d={`M${j(2,2)},${j(4,2)} C${j(20,3)},${j(-4,3)} ${j(26,3)},${j(-32,3)} ${j(16,3)},${j(-56,3)} C${j(10,3)},${j(-66,3)} ${j(2,3)},${j(-68,3)} ${j(-2,3)},${j(-60,3)} C${j(-4,3)},${j(-44,3)} ${j(-2,3)},${j(-18,3)} ${j(2,2)},${j(4,2)} Z`}
        fill={wfill} stroke={sk} strokeWidth="1.2" />
      {/* Center petal — slightly darker */}
      <path d={`M${j(0,1)},${j(4,2)} C${j(-10,2)},${j(-12,3)} ${j(-12,2)},${j(-42,3)} ${j(0,2)},${j(-66,3)} C${j(12,2)},${j(-42,3)} ${j(10,2)},${j(-12,3)} ${j(0,1)},${j(4,2)} Z`}
        fill={ifill} stroke={sk} strokeWidth="1.2" />
      {/* Ink vein lines */}
      <path d={`M${j(-6,1)},${j(-10,2)} C${j(-10,1)},${j(-32,2)} ${j(-8,1)},${j(-54,2)} ${j(-4,1)},${j(-62,2)}`}
        fill="none" stroke={sk} strokeWidth="0.65" opacity="0.4" />
      <path d={`M${j(6,1)},${j(-10,2)} C${j(10,1)},${j(-32,2)} ${j(8,1)},${j(-54,2)} ${j(4,1)},${j(-62,2)}`}
        fill="none" stroke={sk} strokeWidth="0.65" opacity="0.4" />
      <path d={`M${j(0,1)},${j(-8,2)} C${j(0,1)},${j(-30,2)} ${j(0,1)},${j(-52,2)} ${j(0,1)},${j(-62,2)}`}
        fill="none" stroke={sk} strokeWidth="0.65" opacity="0.3" />
    </g>
  );
}

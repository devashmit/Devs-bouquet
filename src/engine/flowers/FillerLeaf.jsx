import React from 'react';
import { createRng } from '../randomizer';

// Large pointed sage/eucalyptus leaf — like in the reference
export default function FillerLeaf({ x = 0, y = 0, scale = 1, rotation = 0, seed = 1, styleMode = 'sketch' }) {
  const rng = createRng(seed);
  const j = (v, a) => v + (rng.random() - 0.5) * 2 * a;

  const isMono = styleMode === 'mono';
  const fill   = isMono ? 'rgba(170,180,165,0.75)' : 'rgba(140,175,130,0.7)';
  const sk     = isMono ? '#555' : '#4a6a3a';

  // Single large pointed leaf
  const lw = j(18, 3);
  const lh = j(52, 5);

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation}) scale(${scale})`}>
      {/* Main leaf shape — pointed oval */}
      <path
        d={`M0,0 C${j(-lw,3)},${j(-lh*0.3,4)} ${j(-lw*0.8,3)},${j(-lh*0.7,4)} 0,${j(-lh,4)} C${j(lw*0.8,3)},${j(-lh*0.7,4)} ${j(lw,3)},${j(-lh*0.3,4)} 0,0 Z`}
        fill={fill} stroke={sk} strokeWidth="1"
      />
      {/* Center vein */}
      <path d={`M0,0 C${j(0,1)},${j(-lh*0.4,3)} ${j(0,1)},${j(-lh*0.7,3)} 0,${j(-lh,4)}`}
        fill="none" stroke={sk} strokeWidth="0.7" opacity="0.5" />
      {/* Side veins */}
      <path d={`M${j(0,1)},${j(-lh*0.3,2)} C${j(lw*0.4,2)},${j(-lh*0.35,2)} ${j(lw*0.7,2)},${j(-lh*0.4,2)} ${j(lw*0.75,2)},${j(-lh*0.45,2)}`}
        fill="none" stroke={sk} strokeWidth="0.5" opacity="0.4" />
      <path d={`M${j(0,1)},${j(-lh*0.3,2)} C${j(-lw*0.4,2)},${j(-lh*0.35,2)} ${j(-lw*0.7,2)},${j(-lh*0.4,2)} ${j(-lw*0.75,2)},${j(-lh*0.45,2)}`}
        fill="none" stroke={sk} strokeWidth="0.5" opacity="0.4" />
    </g>
  );
}

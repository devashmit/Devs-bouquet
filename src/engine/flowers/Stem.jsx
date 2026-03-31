import React, { useMemo } from 'react';
import { getStemColors } from '../styles';
import { createRng } from '../randomizer';

export default function Stem({
  x1 = 0, y1 = 0, x2 = 0, y2 = 60,
  curvature = 0.3, seed = 42,
  styleMode = 'sketch', strokeWidth = 2,
  showLeaf = false, leafSide = 'left',
  className = ''
}) {
  const rng = useMemo(() => createRng(seed), [seed]);
  const colors = useMemo(() => getStemColors(styleMode), [styleMode]);

  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  
  // Handle edge case if x1==x2 and y1==y2
  if (len === 0) return null;

  const perpX = -dy / len;
  const perpY = dx / len;
  
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  
  const curveOffset = len * curvature * rng.scale(0.5);
  const cx = mx + perpX * curveOffset;
  const cy = my + perpY * curveOffset;
  
  const stemPath = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  
  // Predict leaf position approximately halfway down the curve
  const lx = 0.25 * x1 + 0.5 * cx + 0.25 * x2;
  const ly = 0.25 * y1 + 0.5 * cy + 0.25 * y2;
  
  const leafDir = leafSide === 'left' ? -1 : 1;
  const leafLen = rng.range(12, 20);
  const leafW = rng.range(5, 10);
  
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const leafAngle = angle + leafDir * rng.range(0.4, 0.9);
  
  const tipX = lx + Math.cos(leafAngle) * leafLen;
  const tipY = ly + Math.sin(leafAngle) * leafLen;
  
  const nx = Math.cos(leafAngle + Math.PI/2);
  const ny = Math.sin(leafAngle + Math.PI/2);
  
  const cx1 = (lx + tipX) / 2 + nx * leafW;
  const cy1 = (ly + tipY) / 2 + ny * leafW;
  const cx2 = (lx + tipX) / 2 - nx * leafW;
  const cy2 = (ly + tipY) / 2 - ny * leafW;

  const leafPath = `M ${lx} ${ly} Q ${cx1} ${cy1} ${tipX} ${tipY} Q ${cx2} ${cy2} ${lx} ${ly} Z`;

  return (
    <g className={`stem ${className}`} data-type="stem">
      <path 
        d={stemPath} 
        fill="none" 
        stroke={colors.stroke || '#5a7d4e'} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
      />
      {showLeaf && (
        <path 
          d={leafPath} 
          fill={colors.fill || '#c8e0c8'} 
          stroke={colors.stroke || '#5a7d4e'} 
          strokeWidth={strokeWidth * 0.7} 
          strokeLinejoin="round" 
          opacity="0.95"
        />
      )}
    </g>
  );
}

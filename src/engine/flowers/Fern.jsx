import React from 'react';

export default function Fern(props) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" {...props}>
      {/* Fern - Feathery fronds */}
      <path d="M50 95 Q55 50 45 5" fill="none" stroke="#33691e" strokeWidth="2" strokeLinecap="round" />
      
      <g fill="#558b2f" stroke="none">
        {/* Draw multiple small pointed leaves mirroring up the stem */}
        {[...Array(14)].map((_, i) => {
          const t = i / 14;
          const y = 85 - t * 75;
          const curveX = 50 + (t * 10 - Math.pow(t, 2) * 15); // Approximate the Q curve X
          const scale = 1 - t * 0.7; // Get smaller near top
          
          return (
            <g key={i}>
              <path d="M0 0 Q15 -5 20 0 Q15 5 0 0 Z" transform={`translate(${curveX}, ${y + 2}) rotate(-25) scale(${scale})`} />
              <path d="M0 0 Q-15 -5 -20 0 Q-15 5 0 0 Z" transform={`translate(${curveX}, ${y}) rotate(25) scale(${scale})`} />
            </g>
          );
        })}
        {/* Tip leaf */}
        <path d="M0 0 Q0 -10 -5 -15 Q5 -10 0 0 Z" transform="translate(45, 5)" />
      </g>
    </svg>
  );
}

import React from 'react';

export default function BabysBreath(props) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" {...props}>
      {/* Baby's Breath - Clouds of tiny white 4-petal flowers */}
      <g stroke="#aed581" strokeWidth="1" strokeLinecap="round">
        <line x1="50" y1="90" x2="50" y2="50" />
        <line x1="50" y1="70" x2="30" y2="40" />
        <line x1="50" y1="65" x2="70" y2="35" />
        <line x1="30" y1="40" x2="15" y2="30" />
        <line x1="30" y1="40" x2="25" y2="20" />
        <line x1="70" y1="35" x2="85" y2="25" />
        <line x1="70" y1="35" x2="65" y2="15" />
        <line x1="50" y1="50" x2="40" y2="25" />
        <line x1="50" y1="50" x2="60" y2="20" />
      </g>
      
      <g fill="#ffffff" stroke="#eceff1" strokeWidth="0.5">
        {/* Draw multiple 4-petal clusters */}
        {[[15,30],[25,20],[30,40],[40,25],[50,50],[60,20],[65,15],[70,35],[85,25],[45,35],[55,40],[35,50],[65,50]].map((pt, i) => (
          <g key={i} transform={`translate(${pt[0]}, ${pt[1]}) scale(0.6)`}>
            <circle cx="-3" cy="0" r="3" />
            <circle cx="3" cy="0" r="3" />
            <circle cx="0" cy="-3" r="3" />
            <circle cx="0" cy="3" r="3" />
            <circle cx="0" cy="0" r="1.5" fill="#f4ff81" stroke="none" />
          </g>
        ))}
      </g>
    </svg>
  );
}

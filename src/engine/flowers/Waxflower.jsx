import React from 'react';

export default function Waxflower(props) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" {...props}>
      {/* Waxflower - Tiny 5-petal stars, clustered on branches */}
      <g stroke="#8d6e63" strokeWidth="1.5" strokeLinecap="round">
        <line x1="50" y1="90" x2="50" y2="30" />
        <line x1="50" y1="70" x2="25" y2="50" />
        <line x1="50" y1="55" x2="75" y2="40" />
        <line x1="50" y1="40" x2="35" y2="20" />
        <line x1="50" y1="30" x2="65" y2="15" />
      </g>
      
      <g fill="#f48fb1" stroke="#ec407a" strokeWidth="0.5">
        {/* Draw multiple 5-petal clusters */}
        {[[25,50],[75,40],[35,20],[65,15],[50,30],[40,60],[60,50],[45,45],[55,30]].map((pt, i) => (
          <g key={i} transform={`translate(${pt[0]}, ${pt[1]}) scale(0.6)`}>
            <circle cx="0" cy="-4" r="3" />
            <circle cx="-3.8" cy="-1.2" r="3" />
            <circle cx="-2.3" cy="3.2" r="3" />
            <circle cx="2.3" cy="3.2" r="3" />
            <circle cx="3.8" cy="-1.2" r="3" />
            <circle cx="0" cy="0" r="2" fill="#880e4f" stroke="none" />
          </g>
        ))}
      </g>
    </svg>
  );
}

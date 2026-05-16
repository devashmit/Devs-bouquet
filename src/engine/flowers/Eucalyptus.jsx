import React from 'react';

export default function Eucalyptus(props) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" {...props}>
      {/* Eucalyptus - Oval leaves on arching stem */}
      <path d="M50 95 Q60 50 40 5" fill="none" stroke="#558b2f" strokeWidth="2.5" strokeLinecap="round" />
      
      <g fill="#81c784" stroke="#4caf50" strokeWidth="0.5">
        {/* Leaf pairs up the stem */}
        {/* Bottom pair */}
        <ellipse cx="65" cy="75" rx="15" ry="8" transform="rotate(-20, 65, 75)" />
        <ellipse cx="35" cy="80" rx="15" ry="8" transform="rotate(30, 35, 80)" />
        
        {/* Mid-low pair */}
        <ellipse cx="68" cy="55" rx="14" ry="7" transform="rotate(-30, 68, 55)" />
        <ellipse cx="38" cy="60" rx="14" ry="7" transform="rotate(40, 38, 60)" />
        
        {/* Mid pair */}
        <ellipse cx="66" cy="38" rx="12" ry="6" transform="rotate(-40, 66, 38)" />
        <ellipse cx="36" cy="42" rx="12" ry="6" transform="rotate(50, 36, 42)" />
        
        {/* Mid-high pair */}
        <ellipse cx="60" cy="22" rx="10" ry="5" transform="rotate(-50, 60, 22)" />
        <ellipse cx="33" cy="25" rx="10" ry="5" transform="rotate(60, 33, 25)" />
        
        {/* Top pair */}
        <ellipse cx="50" cy="8" rx="8" ry="4" transform="rotate(-70, 50, 8)" />
        <ellipse cx="35" cy="12" rx="8" ry="4" transform="rotate(70, 35, 12)" />
        
        {/* Very top leaf */}
        <ellipse cx="38" cy="3" rx="7" ry="3.5" transform="rotate(-20, 38, 3)" />
      </g>
    </svg>
  );
}

import React from 'react';

export default function Snapdragon(props) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" {...props}>
      {/* Snapdragon - Vertical spike of small hooded florets */}
      <line x1="50" y1="10" x2="50" y2="90" stroke="#7cb342" strokeWidth="3" strokeLinecap="round" />
      <g fill="#ec407a">
        {/* Top small buds */}
        <ellipse cx="50" cy="15" rx="4" ry="6" />
        <ellipse cx="50" cy="22" rx="5" ry="7" />
        {/* Lower florets */}
        <path d="M48 30 Q40 25 35 30 Q30 35 35 40 Q40 45 48 35 Z" />
        <path d="M52 35 Q60 30 65 35 Q70 40 65 45 Q60 50 52 40 Z" />
        
        <path d="M48 45 Q38 40 32 45 Q26 50 32 55 Q38 60 48 50 Z" />
        <path d="M52 50 Q62 45 68 50 Q74 55 68 60 Q62 65 52 55 Z" />
        
        <path d="M48 60 Q36 55 28 60 Q20 65 28 70 Q36 75 48 65 Z" />
        <path d="M52 65 Q64 60 72 65 Q80 70 72 75 Q64 80 52 70 Z" />
      </g>
      {/* Light highlights on florets */}
      <g fill="#f48fb1">
        <circle cx="40" cy="33" r="2" />
        <circle cx="60" cy="38" r="2" />
        <circle cx="38" cy="48" r="2.5" />
        <circle cx="62" cy="53" r="2.5" />
        <circle cx="36" cy="63" r="3" />
        <circle cx="64" cy="68" r="3" />
      </g>
    </svg>
  );
}

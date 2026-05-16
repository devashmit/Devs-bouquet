import React from 'react';

export default function Lily(props) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" {...props}>
      {/* Lily - 6 flared petals + long stamens */}
      <g fill="#ffffff" stroke="#e8eaf6" strokeWidth="1">
        <path d="M50 50 Q40 30 50 5 Q60 30 50 50 Z" transform="rotate(0, 50, 50)" />
        <path d="M50 50 Q40 30 50 5 Q60 30 50 50 Z" transform="rotate(60, 50, 50)" />
        <path d="M50 50 Q40 30 50 5 Q60 30 50 50 Z" transform="rotate(120, 50, 50)" />
        <path d="M50 50 Q40 30 50 5 Q60 30 50 50 Z" transform="rotate(180, 50, 50)" />
        <path d="M50 50 Q40 30 50 5 Q60 30 50 50 Z" transform="rotate(240, 50, 50)" />
        <path d="M50 50 Q40 30 50 5 Q60 30 50 50 Z" transform="rotate(300, 50, 50)" />
      </g>
      {/* Center detail */}
      <circle cx="50" cy="50" r="6" fill="#cddc39" />
      {/* Stamens */}
      <g stroke="#9e9d24" strokeWidth="1" fill="#795548">
        <line x1="50" y1="50" x2="40" y2="25" />
        <ellipse cx="40" cy="25" rx="2" ry="4" transform="rotate(20, 40, 25)" />
        
        <line x1="50" y1="50" x2="70" y2="35" />
        <ellipse cx="70" cy="35" rx="2" ry="4" transform="rotate(60, 70, 35)" />
        
        <line x1="50" y1="50" x2="70" y2="65" />
        <ellipse cx="70" cy="65" rx="2" ry="4" transform="rotate(120, 70, 65)" />
        
        <line x1="50" y1="50" x2="40" y2="75" />
        <ellipse cx="40" cy="75" rx="2" ry="4" transform="rotate(-30, 40, 75)" />
        
        <line x1="50" y1="50" x2="25" y2="50" />
        <ellipse cx="25" cy="50" rx="2" ry="4" transform="rotate(90, 25, 50)" />
      </g>
    </svg>
  );
}

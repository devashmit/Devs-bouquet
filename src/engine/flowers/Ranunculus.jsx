import React from 'react';

export default function Ranunculus(props) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" {...props}>
      {/* Ranunculus - Stacked tissue-thin petals like an onion dome */}
      <circle cx="50" cy="50" r="45" fill="#ffb74d" />
      <circle cx="50" cy="50" r="38" fill="#ffa726" />
      <circle cx="50" cy="50" r="30" fill="#ff9800" />
      <circle cx="50" cy="50" r="22" fill="#fb8c00" />
      <circle cx="50" cy="50" r="15" fill="#f57c00" />
      <circle cx="50" cy="50" r="8" fill="#ef6c00" />
      <circle cx="50" cy="50" r="3" fill="#e65100" />
      {/* Curved lines to simulate petal edges */}
      <path d="M20 50 Q50 20 80 50 Q50 80 20 50 Z" fill="none" stroke="#e65100" strokeWidth="1" opacity="0.4" />
      <path d="M30 50 Q50 30 70 50 Q50 70 30 50 Z" fill="none" stroke="#e65100" strokeWidth="1" opacity="0.4" />
      <path d="M50 20 Q80 50 50 80 Q20 50 50 20 Z" fill="none" stroke="#e65100" strokeWidth="1" opacity="0.4" />
      <path d="M50 30 Q70 50 50 70 Q30 50 50 30 Z" fill="none" stroke="#e65100" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

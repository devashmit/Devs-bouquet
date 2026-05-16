import React from 'react';

export default function Tulip(props) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" {...props}>
      {/* Tulip - Smooth 6-petal cup */}
      <path d="M50 80 Q20 70 20 40 Q20 15 40 5 Q45 20 50 30 Q55 20 60 5 Q80 15 80 40 Q80 70 50 80 Z" fill="#f48fb1" />
      <path d="M50 80 Q35 60 35 30 Q35 15 45 10 Q50 30 50 30 Q50 30 55 10 Q65 15 65 30 Q65 60 50 80 Z" fill="#f06292" />
      <path d="M50 80 Q45 60 45 35 Q45 25 50 20 Q55 25 55 35 Q55 60 50 80 Z" fill="#e91e63" />
    </svg>
  );
}

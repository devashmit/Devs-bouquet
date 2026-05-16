import React from 'react';

export default function Rose(props) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" {...props}>
      {/* Rose - Deep red spiral center with overlapping rounded petals */}
      <circle cx="50" cy="50" r="45" fill="#8b0000" />
      <path d="M50 10 A40 40 0 0 1 90 50 A40 40 0 0 1 50 90 A40 40 0 0 1 10 50 A40 40 0 0 1 50 10 Z" fill="#9e0e24" />
      <path d="M50 20 A30 30 0 0 1 80 50 A30 30 0 0 1 50 80 A30 30 0 0 1 20 50 A30 30 0 0 1 50 20 Z" fill="#b21f36" />
      <path d="M50 30 A20 20 0 0 1 70 50 A20 20 0 0 1 50 70 A20 20 0 0 1 30 50 A20 20 0 0 1 50 30 Z" fill="#c42b47" />
      <path d="M40 40 Q50 30 60 40 Q70 50 60 60 Q50 70 40 60 Q30 50 40 40 Z" fill="#d93856" />
      <path d="M45 45 Q50 40 55 45 Q60 50 55 55 Q50 60 45 55 Q40 50 45 45 Z" fill="#ed4768" />
    </svg>
  );
}

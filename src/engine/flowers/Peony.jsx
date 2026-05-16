import React from 'react';

export default function Peony(props) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" {...props}>
      {/* Peony - Large fluffy ball, 12+ ruffled petals */}
      <circle cx="50" cy="50" r="46" fill="#f8b6c4" />
      <path d="M 50 4 C 70 4, 96 20, 96 50 C 96 80, 70 96, 50 96 C 30 96, 4 80, 4 50 C 4 20, 30 4, 50 4 Z" fill="#f4a5b6" />
      <path d="M 50 12 C 65 12, 88 25, 88 50 C 88 75, 65 88, 50 88 C 35 88, 12 75, 12 50 C 12 25, 35 12, 50 12 Z" fill="#ef92a8" />
      <path d="M 50 20 C 60 20, 78 32, 78 50 C 78 68, 60 80, 50 80 C 40 80, 22 68, 22 50 C 22 32, 40 20, 50 20 Z" fill="#e87a95" />
      <path d="M 50 30 C 55 30, 68 38, 68 50 C 68 62, 55 70, 50 70 C 45 70, 32 62, 32 50 C 32 38, 45 30, 50 30 Z" fill="#df6181" />
      <circle cx="50" cy="50" r="10" fill="#f4c95f" />
    </svg>
  );
}

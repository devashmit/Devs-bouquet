import React from 'react';

export default function Sunflower(props) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" {...props}>
      {/* Sunflower - Brown disk center, 13+ long yellow petals */}
      <g fill="#f1c40f">
        <ellipse cx="50" cy="15" rx="8" ry="18" transform="rotate(0, 50, 50)" />
        <ellipse cx="50" cy="15" rx="8" ry="18" transform="rotate(30, 50, 50)" />
        <ellipse cx="50" cy="15" rx="8" ry="18" transform="rotate(60, 50, 50)" />
        <ellipse cx="50" cy="15" rx="8" ry="18" transform="rotate(90, 50, 50)" />
        <ellipse cx="50" cy="15" rx="8" ry="18" transform="rotate(120, 50, 50)" />
        <ellipse cx="50" cy="15" rx="8" ry="18" transform="rotate(150, 50, 50)" />
        <ellipse cx="50" cy="15" rx="8" ry="18" transform="rotate(180, 50, 50)" />
        <ellipse cx="50" cy="15" rx="8" ry="18" transform="rotate(210, 50, 50)" />
        <ellipse cx="50" cy="15" rx="8" ry="18" transform="rotate(240, 50, 50)" />
        <ellipse cx="50" cy="15" rx="8" ry="18" transform="rotate(270, 50, 50)" />
        <ellipse cx="50" cy="15" rx="8" ry="18" transform="rotate(300, 50, 50)" />
        <ellipse cx="50" cy="15" rx="8" ry="18" transform="rotate(330, 50, 50)" />
      </g>
      <circle cx="50" cy="50" r="22" fill="#5c4033" />
      <circle cx="50" cy="50" r="15" fill="#3e2723" />
    </svg>
  );
}

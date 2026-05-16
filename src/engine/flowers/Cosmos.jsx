import React from 'react';

export default function Cosmos(props) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" {...props}>
      {/* Cosmos - Thin 8-petal daisy, light and airy */}
      <g fill="#f8bbd0" stroke="#f48fb1" strokeWidth="0.5">
        <path d="M50 40 Q45 10 50 5 Q55 10 50 40 Z" />
        <path d="M50 40 Q45 10 50 5 Q55 10 50 40 Z" transform="rotate(45, 50, 50)" />
        <path d="M50 40 Q45 10 50 5 Q55 10 50 40 Z" transform="rotate(90, 50, 50)" />
        <path d="M50 40 Q45 10 50 5 Q55 10 50 40 Z" transform="rotate(135, 50, 50)" />
        <path d="M50 40 Q45 10 50 5 Q55 10 50 40 Z" transform="rotate(180, 50, 50)" />
        <path d="M50 40 Q45 10 50 5 Q55 10 50 40 Z" transform="rotate(225, 50, 50)" />
        <path d="M50 40 Q45 10 50 5 Q55 10 50 40 Z" transform="rotate(270, 50, 50)" />
        <path d="M50 40 Q45 10 50 5 Q55 10 50 40 Z" transform="rotate(315, 50, 50)" />
      </g>
      {/* Zigzag petal edges */}
      <g fill="none" stroke="#f8bbd0" strokeWidth="1">
        <path d="M48 5 L50 7 L52 5" />
        <path d="M48 5 L50 7 L52 5" transform="rotate(45, 50, 50)" />
        <path d="M48 5 L50 7 L52 5" transform="rotate(90, 50, 50)" />
        <path d="M48 5 L50 7 L52 5" transform="rotate(135, 50, 50)" />
        <path d="M48 5 L50 7 L52 5" transform="rotate(180, 50, 50)" />
        <path d="M48 5 L50 7 L52 5" transform="rotate(225, 50, 50)" />
        <path d="M48 5 L50 7 L52 5" transform="rotate(270, 50, 50)" />
        <path d="M48 5 L50 7 L52 5" transform="rotate(315, 50, 50)" />
      </g>
      {/* Center disk */}
      <circle cx="50" cy="50" r="8" fill="#fbc02d" />
      <circle cx="50" cy="50" r="5" fill="#f57f17" />
    </svg>
  );
}

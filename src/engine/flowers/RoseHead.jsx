import React from 'react';

/**
 * Rose flower head — detailed botanical SVG, no stem, transparent background.
 * Viewbox: 0 0 120 120, flower centered at 60,60
 */
export default function RoseHead({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer petals */}
      <ellipse cx="60" cy="30" rx="14" ry="22" fill="#c0394a" opacity="0.85" transform="rotate(0 60 60)"/>
      <ellipse cx="60" cy="30" rx="14" ry="22" fill="#c0394a" opacity="0.85" transform="rotate(45 60 60)"/>
      <ellipse cx="60" cy="30" rx="14" ry="22" fill="#c0394a" opacity="0.85" transform="rotate(90 60 60)"/>
      <ellipse cx="60" cy="30" rx="14" ry="22" fill="#c0394a" opacity="0.85" transform="rotate(135 60 60)"/>
      <ellipse cx="60" cy="30" rx="14" ry="22" fill="#c0394a" opacity="0.85" transform="rotate(180 60 60)"/>
      <ellipse cx="60" cy="30" rx="14" ry="22" fill="#c0394a" opacity="0.85" transform="rotate(225 60 60)"/>
      <ellipse cx="60" cy="30" rx="14" ry="22" fill="#c0394a" opacity="0.85" transform="rotate(270 60 60)"/>
      <ellipse cx="60" cy="30" rx="14" ry="22" fill="#c0394a" opacity="0.85" transform="rotate(315 60 60)"/>
      {/* Mid petals */}
      <ellipse cx="60" cy="36" rx="11" ry="17" fill="#d94055" opacity="0.9" transform="rotate(22 60 60)"/>
      <ellipse cx="60" cy="36" rx="11" ry="17" fill="#d94055" opacity="0.9" transform="rotate(67 60 60)"/>
      <ellipse cx="60" cy="36" rx="11" ry="17" fill="#d94055" opacity="0.9" transform="rotate(112 60 60)"/>
      <ellipse cx="60" cy="36" rx="11" ry="17" fill="#d94055" opacity="0.9" transform="rotate(157 60 60)"/>
      <ellipse cx="60" cy="36" rx="11" ry="17" fill="#d94055" opacity="0.9" transform="rotate(202 60 60)"/>
      <ellipse cx="60" cy="36" rx="11" ry="17" fill="#d94055" opacity="0.9" transform="rotate(247 60 60)"/>
      {/* Inner petals */}
      <ellipse cx="60" cy="42" rx="8" ry="12" fill="#e8566a" opacity="0.95" transform="rotate(0 60 60)"/>
      <ellipse cx="60" cy="42" rx="8" ry="12" fill="#e8566a" opacity="0.95" transform="rotate(60 60 60)"/>
      <ellipse cx="60" cy="42" rx="8" ry="12" fill="#e8566a" opacity="0.95" transform="rotate(120 60 60)"/>
      <ellipse cx="60" cy="42" rx="8" ry="12" fill="#e8566a" opacity="0.95" transform="rotate(180 60 60)"/>
      <ellipse cx="60" cy="42" rx="8" ry="12" fill="#e8566a" opacity="0.95" transform="rotate(240 60 60)"/>
      <ellipse cx="60" cy="42" rx="8" ry="12" fill="#e8566a" opacity="0.95" transform="rotate(300 60 60)"/>
      {/* Center spiral */}
      <circle cx="60" cy="60" r="10" fill="#c0394a"/>
      <path d="M60 52 C64 54 66 58 64 62 C62 66 58 67 55 65 C52 63 52 59 54 56 C56 53 60 52 62 54" stroke="#a02030" strokeWidth="1.5" fill="none"/>
      {/* Petal highlights */}
      <ellipse cx="60" cy="30" rx="5" ry="10" fill="rgba(255,200,200,0.25)" transform="rotate(0 60 60)"/>
      <ellipse cx="60" cy="30" rx="5" ry="10" fill="rgba(255,200,200,0.25)" transform="rotate(90 60 60)"/>
      <ellipse cx="60" cy="30" rx="5" ry="10" fill="rgba(255,200,200,0.25)" transform="rotate(180 60 60)"/>
      <ellipse cx="60" cy="30" rx="5" ry="10" fill="rgba(255,200,200,0.25)" transform="rotate(270 60 60)"/>
    </svg>
  );
}

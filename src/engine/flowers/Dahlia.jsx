import React from 'react';

export default function Dahlia(props) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" {...props}>
      {/* Dahlia - Geometric rings of pointed petals */}
      <g fill="#d81b60">
        <polygon points="50,5 55,20 50,35 45,20" transform="rotate(0, 50, 50)" />
        <polygon points="50,5 55,20 50,35 45,20" transform="rotate(45, 50, 50)" />
        <polygon points="50,5 55,20 50,35 45,20" transform="rotate(90, 50, 50)" />
        <polygon points="50,5 55,20 50,35 45,20" transform="rotate(135, 50, 50)" />
        <polygon points="50,5 55,20 50,35 45,20" transform="rotate(180, 50, 50)" />
        <polygon points="50,5 55,20 50,35 45,20" transform="rotate(225, 50, 50)" />
        <polygon points="50,5 55,20 50,35 45,20" transform="rotate(270, 50, 50)" />
        <polygon points="50,5 55,20 50,35 45,20" transform="rotate(315, 50, 50)" />
      </g>
      <g fill="#e91e63">
        <polygon points="50,15 54,25 50,40 46,25" transform="rotate(22.5, 50, 50)" />
        <polygon points="50,15 54,25 50,40 46,25" transform="rotate(67.5, 50, 50)" />
        <polygon points="50,15 54,25 50,40 46,25" transform="rotate(112.5, 50, 50)" />
        <polygon points="50,15 54,25 50,40 46,25" transform="rotate(157.5, 50, 50)" />
        <polygon points="50,15 54,25 50,40 46,25" transform="rotate(202.5, 50, 50)" />
        <polygon points="50,15 54,25 50,40 46,25" transform="rotate(247.5, 50, 50)" />
        <polygon points="50,15 54,25 50,40 46,25" transform="rotate(292.5, 50, 50)" />
        <polygon points="50,15 54,25 50,40 46,25" transform="rotate(337.5, 50, 50)" />
      </g>
      <g fill="#f06292">
        <polygon points="50,25 53,35 50,45 47,35" transform="rotate(0, 50, 50)" />
        <polygon points="50,25 53,35 50,45 47,35" transform="rotate(45, 50, 50)" />
        <polygon points="50,25 53,35 50,45 47,35" transform="rotate(90, 50, 50)" />
        <polygon points="50,25 53,35 50,45 47,35" transform="rotate(135, 50, 50)" />
        <polygon points="50,25 53,35 50,45 47,35" transform="rotate(180, 50, 50)" />
        <polygon points="50,25 53,35 50,45 47,35" transform="rotate(225, 50, 50)" />
        <polygon points="50,25 53,35 50,45 47,35" transform="rotate(270, 50, 50)" />
        <polygon points="50,25 53,35 50,45 47,35" transform="rotate(315, 50, 50)" />
      </g>
      <circle cx="50" cy="50" r="10" fill="#f8bbd0" />
    </svg>
  );
}

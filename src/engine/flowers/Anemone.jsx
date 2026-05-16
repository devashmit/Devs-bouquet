import React from 'react';

export default function Anemone(props) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" {...props}>
      {/* Anemone - 5 white petals + dark button center */}
      <g fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="1">
        <path d="M50 50 C40 20 30 5 50 5 C70 5 60 20 50 50 Z" transform="rotate(0, 50, 50)" />
        <path d="M50 50 C40 20 30 5 50 5 C70 5 60 20 50 50 Z" transform="rotate(72, 50, 50)" />
        <path d="M50 50 C40 20 30 5 50 5 C70 5 60 20 50 50 Z" transform="rotate(144, 50, 50)" />
        <path d="M50 50 C40 20 30 5 50 5 C70 5 60 20 50 50 Z" transform="rotate(216, 50, 50)" />
        <path d="M50 50 C40 20 30 5 50 5 C70 5 60 20 50 50 Z" transform="rotate(288, 50, 50)" />
      </g>
      {/* Dark center */}
      <circle cx="50" cy="50" r="15" fill="#212121" />
      <circle cx="50" cy="50" r="8" fill="#424242" />
      <g fill="#000000">
        <circle cx="50" cy="30" r="2" />
        <circle cx="68" cy="42" r="2" />
        <circle cx="61" cy="62" r="2" />
        <circle cx="39" cy="62" r="2" />
        <circle cx="32" cy="42" r="2" />
      </g>
    </svg>
  );
}

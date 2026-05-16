import React from 'react';

export default function Lavender(props) {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" {...props}>
      {/* Lavender - Long purple spike with tiny florets */}
      <line x1="50" y1="15" x2="50" y2="95" stroke="#81c784" strokeWidth="2" strokeLinecap="round" />
      <g fill="#7e57c2">
        {/* Tiny florets clustered along the stem */}
        {[...Array(12)].map((_, i) => (
          <ellipse key={`l1-${i}`} cx="47" cy={20 + i * 5} rx="4" ry="2" transform={`rotate(-20, 47, ${20 + i * 5})`} />
        ))}
        {[...Array(12)].map((_, i) => (
          <ellipse key={`l2-${i}`} cx="53" cy={22 + i * 5} rx="4" ry="2" transform={`rotate(20, 53, ${22 + i * 5})`} />
        ))}
        {[...Array(10)].map((_, i) => (
          <ellipse key={`l3-${i}`} cx="50" cy={18 + i * 6} rx="3" ry="3" />
        ))}
      </g>
      <g fill="#b39ddb">
        {[...Array(8)].map((_, i) => (
          <circle key={`hl-${i}`} cx="48" cy={25 + i * 7} r="1.5" />
        ))}
      </g>
    </svg>
  );
}

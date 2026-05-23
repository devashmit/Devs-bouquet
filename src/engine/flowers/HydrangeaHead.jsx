import React from 'react';

export default function HydrangeaHead({ size = 120 }) {
  // Hydrangea = cluster of small 4-petal florets
  const florets = [
    {cx: 60, cy: 60, r: 0},
    {cx: 60, cy: 38, r: 0},
    {cx: 78, cy: 49, r: 0},
    {cx: 78, cy: 71, r: 0},
    {cx: 60, cy: 82, r: 0},
    {cx: 42, cy: 71, r: 0},
    {cx: 42, cy: 49, r: 0},
    {cx: 60, cy: 26, r: 0},
    {cx: 88, cy: 42, r: 0},
    {cx: 92, cy: 65, r: 0},
    {cx: 75, cy: 88, r: 0},
    {cx: 45, cy: 88, r: 0},
    {cx: 28, cy: 65, r: 0},
    {cx: 32, cy: 42, r: 0},
  ];

  const colors = ['#7090d0', '#8098d8', '#6888c8', '#90a8e0', '#7898d4'];

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cluster background */}
      <circle cx="60" cy="60" r="42" fill="#c8d8f0" opacity="0.15"/>
      {/* Each floret — 4 petals + center */}
      {florets.map((f, fi) => {
        const color = colors[fi % colors.length];
        const lighter = colors[(fi + 2) % colors.length];
        return (
          <g key={fi}>
            {[0, 90, 180, 270].map((a, pi) => {
              const rad = (a * Math.PI) / 180;
              return (
                <ellipse key={pi}
                  cx={f.cx + Math.cos(rad) * 7} cy={f.cy + Math.sin(rad) * 7}
                  rx="5" ry="7"
                  fill={color}
                  opacity="0.82"
                  transform={`rotate(${a + 90} ${f.cx + Math.cos(rad) * 7} ${f.cy + Math.sin(rad) * 7})`}
                />
              );
            })}
            <circle cx={f.cx} cy={f.cy} r="3.5" fill={lighter} opacity="0.9"/>
            <circle cx={f.cx} cy={f.cy} r="1.5" fill="white" opacity="0.7"/>
          </g>
        );
      })}
    </svg>
  );
}

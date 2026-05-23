import React from 'react';

export default function SunflowerHead({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ray petals — back layer */}
      {Array.from({length: 16}, (_, i) => {
        const a = (i * 22.5 * Math.PI) / 180;
        return (
          <ellipse key={`b${i}`}
            cx={60 + Math.cos(a) * 28} cy={60 + Math.sin(a) * 28}
            rx="6" ry="14"
            fill="#e8a020"
            opacity="0.75"
            transform={`rotate(${i * 22.5 + 90} ${60 + Math.cos(a) * 28} ${60 + Math.sin(a) * 28})`}
          />
        );
      })}
      {/* Ray petals — front layer, offset */}
      {Array.from({length: 16}, (_, i) => {
        const a = ((i * 22.5 + 11.25) * Math.PI) / 180;
        return (
          <ellipse key={`f${i}`}
            cx={60 + Math.cos(a) * 26} cy={60 + Math.sin(a) * 26}
            rx="5.5" ry="13"
            fill="#f0b830"
            opacity="0.88"
            transform={`rotate(${i * 22.5 + 11.25 + 90} ${60 + Math.cos(a) * 26} ${60 + Math.sin(a) * 26})`}
          />
        );
      })}
      {/* Dark center disk */}
      <circle cx="60" cy="60" r="20" fill="#3a2010"/>
      <circle cx="60" cy="60" r="18" fill="#4a2818"/>
      {/* Disk florets pattern */}
      {Array.from({length: 24}, (_, i) => {
        const a = (i * 15 * Math.PI) / 180;
        const r = 6 + (i % 3) * 3;
        return (
          <circle key={i}
            cx={60 + Math.cos(a) * r} cy={60 + Math.sin(a) * r}
            r="1.8" fill="#5a3820" opacity="0.8"/>
        );
      })}
      {/* Center highlight */}
      <circle cx="57" cy="57" r="4" fill="rgba(255,200,100,0.12)"/>
      {/* Petal veins */}
      {Array.from({length: 8}, (_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return (
          <line key={i}
            x1={60 + Math.cos(a) * 14} y1={60 + Math.sin(a) * 14}
            x2={60 + Math.cos(a) * 38} y2={60 + Math.sin(a) * 38}
            stroke="#c88010" strokeWidth="0.6" opacity="0.5"/>
        );
      })}
    </svg>
  );
}

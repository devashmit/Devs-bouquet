import React from 'react';

export default function DaisyHead({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Back petals */}
      {Array.from({length: 16}, (_, i) => {
        const a = (i * 22.5 * Math.PI) / 180;
        return (
          <ellipse key={`b${i}`}
            cx={60 + Math.cos(a) * 24} cy={60 + Math.sin(a) * 24}
            rx="5" ry="16"
            fill="#f8f8f0"
            opacity="0.8"
            transform={`rotate(${i * 22.5 + 90} ${60 + Math.cos(a) * 24} ${60 + Math.sin(a) * 24})`}
          />
        );
      })}
      {/* Front petals */}
      {Array.from({length: 16}, (_, i) => {
        const a = ((i * 22.5 + 11.25) * Math.PI) / 180;
        return (
          <ellipse key={`f${i}`}
            cx={60 + Math.cos(a) * 23} cy={60 + Math.sin(a) * 23}
            rx="4.5" ry="15"
            fill="#ffffff"
            opacity="0.95"
            transform={`rotate(${i * 22.5 + 11.25 + 90} ${60 + Math.cos(a) * 23} ${60 + Math.sin(a) * 23})`}
          />
        );
      })}
      {/* Yellow center */}
      <circle cx="60" cy="60" r="14" fill="#f0c030"/>
      <circle cx="60" cy="60" r="12" fill="#f4cc40"/>
      {/* Center texture dots */}
      {Array.from({length: 20}, (_, i) => {
        const a = (i * 18 * Math.PI) / 180;
        const r = 3 + (i % 4) * 2;
        return (
          <circle key={i}
            cx={60 + Math.cos(a) * r} cy={60 + Math.sin(a) * r}
            r="1.5" fill="#d4a020" opacity="0.6"/>
        );
      })}
      {/* Center highlight */}
      <circle cx="57" cy="57" r="3" fill="rgba(255,240,150,0.5)"/>
      {/* Petal shadows at base */}
      {Array.from({length: 8}, (_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return (
          <ellipse key={`sh${i}`}
            cx={60 + Math.cos(a) * 13} cy={60 + Math.sin(a) * 13}
            rx="3" ry="5"
            fill="#d0c8a0" opacity="0.2"
            transform={`rotate(${i * 45 + 90} ${60 + Math.cos(a) * 13} ${60 + Math.sin(a) * 13})`}
          />
        );
      })}
    </svg>
  );
}

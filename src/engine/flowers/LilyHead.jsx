import React from 'react';

export default function LilyHead({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 6 petals */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const cx = 60 + Math.cos(rad) * 22;
        const cy = 60 + Math.sin(rad) * 22;
        return (
          <g key={i}>
            <ellipse
              cx={cx} cy={cy}
              rx="11" ry="22"
              fill={i % 2 === 0 ? '#f8f0e8' : '#f4ece0'}
              opacity="0.92"
              transform={`rotate(${a + 90} ${cx} ${cy})`}
            />
            {/* Petal stripe */}
            <line
              x1={60 + Math.cos(rad) * 10} y1={60 + Math.sin(rad) * 10}
              x2={60 + Math.cos(rad) * 42} y2={60 + Math.sin(rad) * 42}
              stroke="#d4a060" strokeWidth="0.8" opacity="0.5"
            />
          </g>
        );
      })}
      {/* Petal tips curl */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <ellipse key={`tip${i}`}
            cx={60 + Math.cos(rad) * 40} cy={60 + Math.sin(rad) * 40}
            rx="4" ry="6"
            fill="#e8d8c0"
            opacity="0.6"
            transform={`rotate(${a + 90} ${60 + Math.cos(rad) * 40} ${60 + Math.sin(rad) * 40})`}
          />
        );
      })}
      {/* Center */}
      <circle cx="60" cy="60" r="8" fill="#f0e0c0"/>
      {/* Stamens */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <g key={`s${i}`}>
            <line x1="60" y1="60"
              x2={60 + Math.cos(rad) * 14} y2={60 + Math.sin(rad) * 14}
              stroke="#c08040" strokeWidth="1"/>
            <ellipse
              cx={60 + Math.cos(rad) * 15} cy={60 + Math.sin(rad) * 15}
              rx="2" ry="3"
              fill="#c06030"
              transform={`rotate(${a + 90} ${60 + Math.cos(rad) * 15} ${60 + Math.sin(rad) * 15})`}
            />
          </g>
        );
      })}
      {/* Pistil */}
      <circle cx="60" cy="60" r="3" fill="#a06030"/>
      {/* Petal blush spots */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <circle key={`sp${i}`}
            cx={60 + Math.cos(rad) * 18} cy={60 + Math.sin(rad) * 18}
            r="2" fill="#d08040" opacity="0.35"/>
        );
      })}
    </svg>
  );
}

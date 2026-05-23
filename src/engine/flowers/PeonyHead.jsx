import React from 'react';

export default function PeonyHead({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer guard petals — large, ruffled */}
      {[0,40,80,120,160,200,240,280,320].map((a, i) => (
        <ellipse key={i} cx="60" cy="26" rx="13" ry="24"
          fill={i % 2 === 0 ? '#f0a0b8' : '#e890aa'}
          opacity="0.8"
          transform={`rotate(${a} 60 60)`}/>
      ))}
      {/* Mid petals */}
      {[20,60,100,140,180,220,260,300,340].map((a, i) => (
        <ellipse key={i} cx="60" cy="32" rx="10" ry="18"
          fill="#f4b0c4"
          opacity="0.88"
          transform={`rotate(${a} 60 60)`}/>
      ))}
      {/* Inner petals */}
      {[0,45,90,135,180,225,270,315].map((a, i) => (
        <ellipse key={i} cx="60" cy="40" rx="8" ry="13"
          fill="#f8c8d8"
          opacity="0.92"
          transform={`rotate(${a} 60 60)`}/>
      ))}
      {/* Innermost */}
      {[22,67,112,157,202,247].map((a, i) => (
        <ellipse key={i} cx="60" cy="46" rx="6" ry="9"
          fill="#fcd8e4"
          opacity="0.95"
          transform={`rotate(${a} 60 60)`}/>
      ))}
      {/* Center */}
      <circle cx="60" cy="60" r="9" fill="#f0a0b8"/>
      {/* Stamens */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <g key={i}>
            <line x1="60" y1="60"
              x2={60 + Math.cos(rad) * 7} y2={60 + Math.sin(rad) * 7}
              stroke="#f8d060" strokeWidth="0.8"/>
            <circle cx={60 + Math.cos(rad) * 7} cy={60 + Math.sin(rad) * 7}
              r="1.2" fill="#f8d060"/>
          </g>
        );
      })}
      {/* Petal sheen */}
      {[0,90,180,270].map((a, i) => (
        <ellipse key={i} cx="60" cy="26" rx="4" ry="12"
          fill="rgba(255,240,248,0.3)"
          transform={`rotate(${a} 60 60)`}/>
      ))}
    </svg>
  );
}

import React, { useMemo } from 'react';
import FLOWER_TYPES from '../engine/flowers';

// Dimensions and Anchor Points
const W = 500;
const H = 620;
const BINDING_PT = { x: 250, y: 420 };
const APEX_PT = { x: 250, y: 200 };

// Seeded PRNG for stable layouts
function seededRng(seed) {
  let s = seed ^ 0xDEADBEEF;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) | 0;
    return (s >>> 0) / 0xFFFFFFFF;
  };
}

const ROLE_ORDER = {
  FOLIAGE: 1,
  LINE: 2,
  FILLER: 3,
  FLOATER: 3,
  FOUNDATION: 4,
  FOCAL: 5,
};

function getRoleMetrics(role, rng) {
  switch (role) {
    case 'FOLIAGE':
      return { angle: 200 + rng() * 140, radius: 80 + rng() * 30, scale: 0.9, opacity: 1 };
    case 'LINE':
      return { angle: 80 + rng() * 20, radius: 70 + rng() * 30, scale: 0.85, opacity: 1 };
    case 'FILLER':
      return { angle: rng() * 360, radius: 40 + rng() * 40, scale: 0.6, opacity: 1 };
    case 'FLOATER':
      return { angle: rng() * 360, radius: 50 + rng() * 30, scale: 0.5, opacity: 0.8 };
    case 'FOUNDATION':
      return { angle: rng() * 360, radius: 20 + rng() * 30, scale: 0.9, opacity: 1 };
    case 'FOCAL':
      return { angle: rng() * 360, radius: rng() * 20, scale: 1.15, opacity: 1 };
    default:
      return { angle: rng() * 360, radius: 30 + rng() * 30, scale: 0.8, opacity: 1 };
  }
}

function processFlowers(inputFlowers) {
  let flowers = inputFlowers.map((f, i) => {
    const typeInfo = FLOWER_TYPES[f.type];
    return {
      id: `f_${i}`,
      type: f.type,
      role: typeInfo ? typeInfo.role : 'FOUNDATION',
      image: typeInfo ? typeInfo.image : null,
    };
  });

  // Sort by z-index
  flowers.sort((a, b) => ROLE_ORDER[a.role] - ROLE_ORDER[b.role]);

  const rng = seededRng(flowers.length * 997);
  const slots = [];

  for (let i = 0; i < flowers.length; i++) {
    const f = flowers[i];
    let placed = false;
    let attempts = 0;
    let x = 0, y = 0, angle = 0, radius = 0, scale = 1, opacity = 1;

    while (!placed && attempts < 50) {
      const metrics = getRoleMetrics(f.role, rng);
      angle = metrics.angle;
      radius = metrics.radius;
      scale = metrics.scale;
      opacity = metrics.opacity;

      const angleRad = (angle * Math.PI) / 180;
      x = APEX_PT.x + radius * Math.cos(angleRad) + (rng() - 0.5) * 16;
      y = APEX_PT.y + radius * Math.sin(angleRad) * 0.65 + (rng() - 0.5) * 16;

      // Collision check (20px minimum distance)
      let collision = false;
      for (const slot of slots) {
        const dx = slot.x - x;
        const dy = slot.y - y;
        if (Math.sqrt(dx * dx + dy * dy) < 20) {
          collision = true;
          break;
        }
      }

      if (!collision) placed = true;
      attempts++;
    }

    const rotation = (rng() - 0.5) * 30; // ±15° variation

    slots.push({ ...f, x, y, rotation, scale, opacity, i });
  }

  return slots;
}

export default function BouquetCanvas({ flowers = [] }) {
  const slots = useMemo(() => processFlowers(flowers), [flowers]);
  const hasFlowers = slots.length >= 4;

  if (!hasFlowers) {
    return (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#FAF7F2', borderRadius: '1.5rem',
        }}
      >
        <svg width="100" height="150" viewBox="0 0 100 150">
          <path d="M30 50 Q50 90 40 140 L60 140 Q50 90 70 50 Z" fill="none" stroke="#d4a4ae" strokeWidth="2" />
          <ellipse cx="50" cy="50" rx="20" ry="8" fill="none" stroke="#d4a4ae" strokeWidth="2" />
          <line x1="50" y1="20" x2="50" y2="50" stroke="#a38a90" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="40" y1="30" x2="45" y2="50" stroke="#a38a90" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="60" y1="30" x2="55" y2="50" stroke="#a38a90" strokeWidth="2" strokeDasharray="4 2" />
        </svg>
        <p style={{ fontFamily: 'Georgia, serif', color: '#a38a90', marginTop: '1rem', fontStyle: 'italic' }}>
          Select 4+ flowers to build your bouquet
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#FAF7F2',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 24px 72px rgba(140, 80, 60, 0.13)',
      }}
    >
      <style>{`
        @keyframes flowerGrow {
          from { opacity: 0; transform: scale(0.5) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.03)" />
          </radialGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.1" />
          </filter>
        </defs>

        <rect x="0" y="0" width={W} height={H} fill="url(#vignette)" />

        {/* Bare Stems below binding point */}
        {slots.map((slot, i) => {
          const offsetX = (i - slots.length / 2) * 2;
          return (
            <line
              key={`bare-stem-${i}`}
              x1={BINDING_PT.x + offsetX}
              y1={BINDING_PT.y}
              x2={BINDING_PT.x + offsetX * 1.5}
              y2={H + 20}
              stroke="#5a7a3a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          );
        })}

        {/* Step 1: Draw all stems first so they are behind all flowers */}
        <g filter="url(#shadow)">
          {slots.map((slot) => {
            if (!slot.image) return null;
            const size = 260 * slot.scale;
            
            const dx = BINDING_PT.x - slot.x;
            const dy = BINDING_PT.y - slot.y;
            const cx = slot.x + dx * 0.2;
            const cy = slot.y + dy * 0.5;

            const delay = `${(slot.i * 0.05).toFixed(2)}s`;

            return (
              <g key={`stem-${slot.id}`} style={{ animation: `flowerGrow 0.6s cubic-bezier(0.22,1,0.36,1) ${delay} both` }}>
                <path
                  d={`M ${slot.x} ${slot.y} Q ${cx} ${cy} ${BINDING_PT.x} ${BINDING_PT.y}`}
                  fill="none"
                  stroke="#5a7a3a"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </g>
            );
          })}
        </g>

        {/* Step 2: Draw all flower heads on top of the stems */}
        <g filter="url(#shadow)">
          {slots.map((slot) => {
            if (!slot.image) return null;
            const size = 260 * slot.scale;

            // Calculate rotation so the flower's bottom points directly at the binding point
            const dx = BINDING_PT.x - slot.x;
            const dy = BINDING_PT.y - slot.y;
            const angleToBinding = Math.atan2(dy, dx) * (180 / Math.PI);
            
            // The default PNG stem points down (90 degrees). 
            // We rotate by (angleToBinding - 90) to align the stem, plus the random jitter rotation.
            const structuralRotation = angleToBinding - 90;
            const totalRotation = structuralRotation + slot.rotation;

            const delay = `${(slot.i * 0.05).toFixed(2)}s`;

            return (
              <g key={`flower-${slot.id}`} style={{ animation: `flowerGrow 0.6s cubic-bezier(0.22,1,0.36,1) ${delay} both` }}>
                <g transform={`translate(${slot.x - size / 2}, ${slot.y - size / 2}) rotate(${totalRotation}, ${size / 2}, ${size / 2})`} opacity={slot.opacity}>
                  <image 
                    href={slot.image} 
                    width={size} 
                    height={size} 
                    style={{ mixBlendMode: 'darken' }} 
                  />
                </g>
              </g>
            );
          })}
        </g>

        {/* Dusty Rose Silk Bow at Binding Point */}
        <g transform={`translate(${BINDING_PT.x}, ${BINDING_PT.y})`}>
          <path d="M 0 0 Q -30 -20 -40 0 Q -30 20 0 0" fill="#d4a4ae" opacity="0.9" />
          <path d="M 0 0 Q 30 -20 40 0 Q 30 20 0 0" fill="#d4a4ae" opacity="0.9" />
          <path d="M -5 5 Q -20 30 -30 60 Q -10 40 0 10 Z" fill="#b9828d" opacity="0.85" />
          <path d="M 5 5 Q 20 30 30 60 Q 10 40 0 10 Z" fill="#b9828d" opacity="0.85" />
          <circle cx="0" cy="0" r="6" fill="#a36e79" />
        </g>
      </svg>
    </div>
  );
}

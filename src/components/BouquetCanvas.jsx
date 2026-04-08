import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import FLOWER_TYPES from '../engine/flowers';

/**
 * BouquetCanvas — Rebuilt Template Bouquet System Compositing Engine.
 * Follows a strict 3-Layer architecture:
 * Layer 1: Watercolor Base Stems (Fixed)
 * Layer 2: Selected Flower Assets in tight predefined slots
 * Layer 3: Watercolor Front Ribbon Bow (Fixed)
 */

const W = 800;
const H = 900;

// Hardcoded explicit tight slots centered roughly on X: 400
const BOUQUET_SLOTS = [
  // Front Focal 
  { x: 400, y: 520, rotation: -2,   scale: 1.15, zIndex: 10 }, // Slot 1
  { x: 395, y: 420, rotation: 4,    scale: 1.10, zIndex: 9 },  // Slot 2
  // Sides mid
  { x: 260, y: 480, rotation: -18,  scale: 1.00, zIndex: 8 },  // Slot 3
  { x: 540, y: 470, rotation: 22,   scale: 1.00, zIndex: 8 },  // Slot 4
  // Upper mid
  { x: 300, y: 350, rotation: -12,  scale: 0.95, zIndex: 6 },  // Slot 5
  { x: 500, y: 340, rotation: 15,   scale: 0.95, zIndex: 6 },  // Slot 6
  // Deep Background
  { x: 400, y: 280, rotation: -5,   scale: 0.85, zIndex: 4 },  // Slot 7
  { x: 220, y: 380, rotation: -25,  scale: 0.80, zIndex: 4 },  // Slot 8
  { x: 580, y: 390, rotation: 28,   scale: 0.80, zIndex: 4 },  // Slot 9
  { x: 400, y: 220, rotation: 6,    scale: 0.75, zIndex: 3 }   // Slot 10
];

export default function BouquetCanvas({ flowers = [] }) {
  const count = flowers.length;

  // Process selected flowers into slots and order by zIndex (back to front)
  const validFlowers = useMemo(() => {
    return flowers.slice(0, 10).map((f, i) => {
      return { flower: f, slot: BOUQUET_SLOTS[i], originalIndex: i };
    }).sort((a, b) => a.slot.zIndex - b.slot.zIndex);
  }, [flowers]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#fdfbfa', // Strict cream background
      borderRadius: '1rem',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <filter id="softShadow">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Layer 1: Base Stems */}
        <image 
          href="/assets/template/base_stems.png" 
          x="0" y="0" 
          width={W} height={H} 
          preserveAspectRatio="xMidYMid slice" 
          opacity={count === 0 ? 0.3 : 1} 
          style={{ transition: 'opacity 0.5s ease-in-out' }}
        />

        {/* Layer 2: Flower Slots */}
        {validFlowers.map(({ flower, slot, originalIndex }) => {
          const typeInfo = FLOWER_TYPES[flower.type];
          if (!typeInfo) return null;

          // Base flower sizes around 280px to look lush
          const s = 280 * slot.scale; 
          const ix = slot.x - s / 2;
          const iy = slot.y - s / 2;

          return (
            <g
              key={`flower-${flower.id}-${originalIndex}`}
              transform={`rotate(${slot.rotation}, ${slot.x}, ${slot.y})`}
            >
              <image
                href={typeInfo.image}
                x={ix} y={iy}
                width={s} height={s}
                preserveAspectRatio="xMidYMid meet"
                filter="url(#softShadow)"
                style={{
                  filter: 'saturate(1.15) contrast(1.05)',
                  transformOrigin: `${slot.x}px ${slot.y}px`,
                  transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
              />
            </g>
          );
        })}

        {/* Layer 3: Foreground Ribbon */}
        {/* Render fully opaque only if there are flowers to bundle */}
        <image 
          href="/assets/template/front_ribbon.png" 
          x={400 - 150} 
          y={580} 
          width={300} 
          height={250} 
          preserveAspectRatio="xMidYMid meet" 
          filter="url(#softShadow)"
          opacity={count === 0 ? 0.1 : 1}
          style={{ transition: 'opacity 0.5s ease-in-out' }}
        />
      </svg>

      {/* Empty State Overlay */}
      {count === 0 && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          pointerEvents: 'none'
        }}>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1rem',
            color: '#a38a90',
            textAlign: 'center',
            lineHeight: 1.65,
            margin: 0,
            background: 'rgba(253, 251, 250, 0.85)',
            padding: '1rem 2rem',
            borderRadius: '2rem'
          }}>
            Select flowers to build your watercolor arrangement
          </p>
        </div>
      )}
    </div>
  );
}

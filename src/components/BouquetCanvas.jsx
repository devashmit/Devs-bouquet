import React, { useMemo } from 'react';
import FLOWER_TYPES from '../engine/flowers';

/**
 * BouquetCanvas — Advanced Foliage-based Compositing Engine
 * Enforces the strict 5-layer architecture, dynamic scaling, and sharp SVG silhouetting!
 */

const W = 800;
const H = 900;

const BOUQUET_SLOTS = [
  // Slot 1 — Lowest Center (Peony position in reference)
  { x: 400, y: 360, rotation: 0, scale: 1.15, zIndex: 10 },
  // Slot 2 — Mid Left (Rose position in reference)
  { x: 300, y: 320, rotation: -12, scale: 1.0, zIndex: 9 },
  // Slot 3 — Mid Right (Sunflower position in reference)
  { x: 500, y: 320, rotation: 12, scale: 1.0, zIndex: 8 },
  // Slot 4 — Top Center (Lily position in reference)
  { x: 400, y: 250, rotation: 0, scale: 0.95, zIndex: 7 },
  // Slot 5 — Upper Right Back
  { x: 460, y: 250, rotation: 20, scale: 0.85, zIndex: 6 },
  // Slot 6 — Upper Left Back
  { x: 340, y: 250, rotation: -20, scale: 0.85, zIndex: 6 },
  // Slot 7 — High Back Peak
  { x: 400, y: 200, rotation: 4, scale: 0.8, zIndex: 5 },
  // Slot 8 — Lower Right Fill
  { x: 530, y: 360, rotation: 25, scale: 0.85, zIndex: 4 },
  // Slot 9 — Lower Left Fill
  { x: 270, y: 360, rotation: -25, scale: 0.85, zIndex: 4 },
  // Slot 10 — Extreme High Fill
  { x: 400, y: 160, rotation: -3, scale: 0.75, zIndex: 3 }
];

export default function BouquetCanvas({ flowers = [] }) {
  const count = flowers.length;

  const validFlowers = useMemo(() => {
    return flowers.slice(0, 10).map((f, i) => {
      return { flower: f, slot: BOUQUET_SLOTS[i], originalIndex: i };
    }).sort((a, b) => a.slot.zIndex - b.slot.zIndex);
  }, [flowers]);

  const backFlowers = validFlowers.filter(f => f.slot.zIndex < 10);
  const heroFlowers = validFlowers.filter(f => f.slot.zIndex >= 10);

  const renderFlower = ({ flower, slot, originalIndex }) => {
    const typeInfo = FLOWER_TYPES[flower.type];
    if (!typeInfo) return null;

    // Center standard flower assets
    const s = 250 * slot.scale; 
    const ix = slot.x - s / 2;
    const iy = slot.y - s / 2;

    return (
      <g
        key={`flower-${flower.id}-${originalIndex}-${slot.zIndex}`}
        transform={`rotate(${slot.rotation}, ${slot.x}, ${slot.y})`}
      >
        <image
          href={typeInfo.image}
          x={ix} y={iy}
          width={s} height={s}
          preserveAspectRatio="xMidYMid meet"
          mask="url(#softFlowerMask)"
          style={{
            transformOrigin: `${slot.x}px ${slot.y}px`,
            transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        />
      </g>
    );
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#FAF8F5', // Strict cream background canvas
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
          <filter id="ribbonShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.2" />
          </filter>

          {/* Organic Radial Mask: Softly fades edges to merge petals beautifully while fading out individual long stems! */}
          <radialGradient id="flowerFade" cx="0.5" cy="0.45" r="0.45">
            <stop offset="65%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>
          <mask id="softFlowerMask" maskContentUnits="objectBoundingBox">
            <rect x="0" y="0" width="1" height="1" fill="url(#flowerFade)" />
          </mask>
          
          {/* Taper mask forces the foliage base to mimic a hand-held bouquet stem bundle! */}
          <mask id="stemBaseTaper">
            <rect x="0" y="0" width="800" height="640" fill="white" />
            {/* Tapering explicitly from y=640 to y=710, nothing rendered beneath 710px! */}
            <polygon points="100,640 700,640 420,710 380,710" fill="white" />
          </mask>
        </defs>

        {/* 
          Layer 2: Foliage Base Background 
          Vastly scaled down structurally from 800px to 540px width so all tropical elements 
          become smaller than foreground flowers. Fully masked to destroy the "vase" effect.
        */}
        <image 
          href="/assets/template/foliage_base.png" 
          x="130" y="150" 
          width="540" height="600" 
          preserveAspectRatio="xMidYMid meet" 
          mask="url(#stemBaseTaper)"
          style={{ mixBlendMode: 'multiply', transition: 'all 0.5s ease' }}
          opacity={count === 0 ? 0.3 : 1}
        />

        {/* Layer 3: Back Flowers (zIndex 3 through 9) */}
        {backFlowers.map(renderFlower)}

        {/* Layer 4: Front Ribbon */}
        {/* Ribbon knot centered strictly at x=400, y=660px 
            Massive 340px scaling so 110px loops are mathematically guaranteed */}
        {count > 0 && (
          <image 
            href="/assets/template/front_ribbon.png" 
            x={400 - 170} 
            y={660 - 90} 
            width={340} 
            height={260} 
            preserveAspectRatio="xMidYMid meet" 
            filter="url(#ribbonShadow)"
            style={{ mixBlendMode: 'multiply', transition: 'all 0.5s ease' }}
          />
        )}

        {/* Layer 5: Hero Flower (zIndex 10) */}
        {heroFlowers.map(renderFlower)}

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
            Select flowers to build your arrangement
          </p>
        </div>
      )}
    </div>
  );
}

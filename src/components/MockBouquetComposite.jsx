import React, { useMemo } from 'react';
import FLOWER_TYPES from '../engine/flowers';

/**
 * Fallback composer for Mock Mode when real AI generation is unavailable.
 * Uses high-quality watercolor PNGs dynamically positioned to mimic a bouquet.
 */
export default function MockBouquetComposite({ flowers, ribbonColor }) {
  const styles = useMemo(() => {
    // Generate overlapping absolute positions based on array index
    return flowers.map((f, i) => {
       const isCenter = i === 0;
       // Alternate left, right, left, right...
       const dir = i % 2 === 0 ? 1 : -1;
       const spread = 25; // x spread
       
       const xOffset = isCenter ? 0 : dir * (spread + (i * 8));
       const yOffset = isCenter ? -60 : -40 + (i * 15);
       const rotate = isCenter ? 0 : dir * (10 + i * 4);
       const scale = isCenter ? 1.0 : Math.max(0.7, 0.95 - (i * 0.05));
       const zIndex = flowers.length - i; // Make center (0) go to the front
       
       return {
         position: 'absolute',
         left: `calc(50% + ${xOffset}px)`,
         top: `calc(50% + ${yOffset}px)`,
         transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
         width: '280px', // default width for the high-res pngs
         height: 'auto',
         zIndex: zIndex,
         transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
         objectFit: 'contain'
       };
    });
  }, [flowers]);

  const ribbonColors = {
    blush: '#f4a3b4',
    champagne: '#e6c875',
    ivory: '#f8f4e6'
  };
  const colorHex = ribbonColors[ribbonColor] || ribbonColors.ivory;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#fff' }}>
       {flowers.map((f, i) => {
          const typeInfo = FLOWER_TYPES[f.type];
          if (!typeInfo) return null;
          return (
            <img 
              key={`${f.type}-${i}`} 
              src={typeInfo.image} 
              alt={typeInfo.name} 
              style={styles[i]} 
            />
          );
       })}
       
       {/* Beautiful ribbon SVG dynamically colored */}
       <div style={{
           position: 'absolute',
           bottom: '18%',
           left: '50%',
           transform: 'translateX(-50%)',
           width: '180px',
           height: '140px',
           zIndex: 1000,
           filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))'
       }}>
         <svg viewBox="0 0 100 120" width="100%" height="100%">
            {/* Left Loop */}
            <path 
              d="M50,70 C10,50 30,10 50,70 Z" 
              fill={colorHex} 
              opacity="0.95"
            />
            {/* Right Loop */}
            <path 
              d="M50,70 C90,50 70,10 50,70 Z" 
              fill={colorHex} 
              opacity="0.95"
            />
            {/* Knot */}
            <ellipse cx="50" cy="70" rx="8" ry="6" fill={colorHex} />
            {/* Left Tail */}
            <path 
              d="M48,72 C40,90 20,110 30,120 C35,115 45,95 50,75 Z" 
              fill={colorHex} 
              opacity="0.9"
            />
            {/* Right Tail */}
            <path 
               d="M52,72 C60,90 80,110 70,120 C65,115 55,95 50,75 Z" 
               fill={colorHex} 
               opacity="0.9"
            />
         </svg>
       </div>
    </div>
  );
}

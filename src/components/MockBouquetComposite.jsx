import React, { useMemo } from 'react';
import FLOWER_TYPES from '../engine/flowers';

/**
 * Fallback composer for Mock Mode when real AI generation is unavailable.
 * Uses high-quality watercolor PNGs dynamically positioned to mimic a dense bouquet.
 */
export default function MockBouquetComposite({ flowers, ribbonColor }) {
  const styles = useMemo(() => {
    // Generate overlapping absolute positions based on array index
    return flowers.map((f, i) => {
       const isCenter = i === 0;
       // Alternate left, right, left, right...
       const dir = i % 2 === 0 ? 1 : -1;
       const spread = 25; 
       
       const xOffset = isCenter ? 0 : dir * (spread + (i * 12));
       const yOffset = isCenter ? -80 : -20 + (i * 18);
       const rotate = isCenter ? 0 : dir * (8 + i * 3);
       const scale = isCenter ? 0.95 : Math.max(0.7, 0.9 - (i * 0.05));
       
       // CRITICAL FIX: The highest flowers (i=0) are in the BACK.
       // The lowest flowers on screen (higher index) are in the FRONT.
       // This successfully masks the tall stems with the plush flower heads of the lower ones!
       const zIndex = i + 1; 
       
       return {
         position: 'absolute',
         left: `calc(50% + ${xOffset}px)`,
         top: `calc(50% + ${yOffset}px)`,
         transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
         width: '280px', // high-res baseline
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

  // Utilize cache-busting to ensure newly processed clean alpha images are pulled immediately
  const timestamp = Date.now();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#FAF8F5' }}>
       {flowers.map((f, i) => {
          const typeInfo = FLOWER_TYPES[f.type];
          if (!typeInfo) return null;
          return (
            <img 
              key={`${f.type}-${i}`} 
              src={`${typeInfo.image}?v=${timestamp}`} 
              alt={typeInfo.name} 
              style={styles[i]} 
            />
          );
       })}
       
       {/* Beautiful ribbon SVG dynamically colored to bind the stems */}
       <div style={{
           position: 'absolute',
           top: 'calc(50% + 110px)', // Mathematically covers the converging stem points!
           left: '50%',
           transform: 'translate(-50%, -50%)',
           width: '210px',
           height: '160px',
           zIndex: 1000,
           filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))'
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

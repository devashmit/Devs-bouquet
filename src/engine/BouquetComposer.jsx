import React, { useMemo, useState } from 'react';
import { createRng } from './randomizer';
import { getFlowerComponent, Stem } from './flowers';
import { getRibbonColors, getStyleOptions } from './styles';
import { motion } from 'framer-motion';

/**
 * BouquetComposer — arranges flowers in a beautiful asymmetrical radial cluster.
 * Pure SVG engine with watercolor/ink filter.
 */
export default function BouquetComposer({
  flowers = [],
  styleMode = 'sketch',
  showRibbon = true,
  width = 500,
  height = 650,
  seed = 1,
  className = '',
  id,
  interactive = false,
  onFlowerChange,
}) {
  const rng = useMemo(() => createRng(seed), [seed]);
  const ribbonColors = useMemo(() => getRibbonColors(styleMode), [styleMode]);

  // Layout computation
  const layout = useMemo(() => {
    if (!flowers.length) return { arranged: [], stems: [], splatters: [] };

    const cx = width / 2;
    // Tighter, slightly elevated dome
    const bouquetCenterY = height * 0.35;
    const stemBaseX = cx;
    const stemBaseY = height * 0.75;
    const ribbonY = height * 0.65;
    
    // Sort flowers so larger ones or filler tend to go to back
    const count = flowers.length;

    const arranged = flowers.map((flower, i) => {
      const flowerRng = createRng(flower.seed || seed + i * 13);
      let fx, fy, fscale, frotation;

      if (flower.x !== undefined && flower.y !== undefined) {
        fx = cx + flower.x;
        fy = bouquetCenterY + flower.y;
        fscale = flower.scale || 1;
        frotation = flower.rotation || 0;
      } else if (count === 1) {
        fx = cx;
        fy = bouquetCenterY;
        fscale = (flower.scale || 1) * 1.3;
        frotation = flowerRng.rotation(10);
      } else {
        // Asymmetrical radial cluster - Tight Fibonacci spiral distribution
        const rRatio = i / (count - 1 || 1);
        const radius = Math.min(width, height) * 0.18 * Math.sqrt(rRatio); // Tight dome
        const angle = i * 137.5 + flowerRng.jitter(0, 5); 
        const rad = (angle * Math.PI) / 180;

        fx = cx + Math.cos(rad) * radius * 0.85;
        fy = bouquetCenterY + Math.sin(rad) * radius * 0.65; 

        // Scale variation - ensure dense overlap
        const depthScale = 1.15 - (rRatio * 0.3); 
        fscale = (flower.scale || 1) * depthScale * flowerRng.range(1.0, 1.25);
        
        frotation = (angle % 360) + flowerRng.jitter(0, 10);
        if (frotation > 90 && frotation < 270) frotation += 180; 
      }

      return {
        ...flower,
        layoutX: fx,
        layoutY: fy,
        layoutScale: fscale,
        layoutRotation: frotation,
        zIndex: i,
      };
    });

    // Generate stems connecting flowers to base
    const stems = arranged.map((flower, i) => {
      const flowerRng = createRng((flower.seed || seed) + 500 + i);
      const stemTopX = flower.layoutX;
      // Precision alignment: Start exactly where the image fade mask ends
      const stemTopY = flower.layoutY + (flower.type === 'filler' ? 10 : 0) * flower.layoutScale;
      
      const gatherX = stemBaseX + flowerRng.jitter(0, 4);
      const gatherY = ribbonY + flowerRng.jitter(0, 6);
      
      return {
        x1: stemTopX,
        y1: stemTopY,
        x2: gatherX,
        y2: gatherY,
        baseX2: gatherX + flowerRng.range(-20, 20),
        baseY2: stemBaseY + flowerRng.range(0, 40),
        curvature: flowerRng.range(0.12, 0.35) * (flower.layoutX < cx ? -1 : 1), 
        seed: flower.seed || seed + 500 + i,
        showLeaf: flowerRng.random() > 0.6,
        leafSide: flowerRng.random() > 0.5 ? 'left' : 'right',
        styleMode,
        strokeWidth: flowerRng.range(2.0, 3.5)
      };
    });

    // Splatters
    const splatters = [];
    for(let i=0; i<15; i++) {
        splatters.push({
            cx: cx + rng.jitter(0, width * 0.35),
            cy: bouquetCenterY + rng.jitter(0, height * 0.3),
            r: rng.range(0.5, 1.5),
            opacity: rng.range(0.2, 0.6)
        });
    }

    return { arranged, stems, splatters, ribbonY, stemBaseX };
  }, [flowers, width, height, seed, rng, styleMode]);

  if (!flowers.length) return null;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className={`bouquet-composer ${className}`}
      id={id}
      style={{ maxWidth: '90vw', touchAction: 'none' }}
    >
      <defs>
        {/* Soft drop shadow for subtle depth */}
        <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
        </filter>
      </defs>

      {/* Background — soft cream watercolor paper texture color */}
      <rect width={width} height={height} fill="#fffafa" rx="8" />
      
      {/* Light splatters for artistic sketch effect */}
      <g fill="#8a6e70">
         {layout.splatters.map((s, i) => (
            <circle key={`splatter-${i}`} cx={s.cx} cy={s.cy} r={s.r} opacity={s.opacity} />
         ))}
      </g>

      {/* Render internal filtered group */}
      <g>
        {/* Full Stems */}
        {layout.stems.map((stem, i) => (
          <Stem
            key={`stem-${i}`}
            x1={stem.x1} y1={stem.y1}
            x2={stem.baseX2} y2={stem.baseY2} // Draw full length through knot
            curvature={stem.curvature}
            seed={stem.seed}
            showLeaf={stem.showLeaf}
            leafSide={stem.leafSide}
            styleMode={styleMode}
            strokeWidth={stem.strokeWidth}
          />
        ))}

        {/* Flowers */}
        {layout.arranged.map((flower, i) => {
          const FlowerComponent = getFlowerComponent(flower.type);
          const node = (
            <FlowerComponent
              x={interactive ? 0 : flower.layoutX}
              y={interactive ? 0 : flower.layoutY}
              scale={flower.layoutScale}
              rotation={flower.layoutRotation}
              seed={flower.seed || seed + i * 17}
              styleMode={styleMode}
              className={interactive ? 'flower-interactive' : ''}
            />
          );

          if (interactive) {
            return (
              <motion.g
                key={`flower-${i}-${flower.seed || i}`}
                drag
                dragMomentum={false}
                style={{ x: flower.layoutX, y: flower.layoutY, cursor: 'grab', filter: 'url(#soft-shadow)' }}
                whileDrag={{ cursor: 'grabbing', scale: 1.05 }}
                onDragEnd={(e, info) => {
                   const cx = width / 2;
                   const bouquetCenterY = height * 0.35;
                   const dx = info.offset.x;
                   const dy = info.offset.y;
                   
                   const startX = flower.x !== undefined ? flower.x : (flower.layoutX - cx);
                   const startY = flower.y !== undefined ? flower.y : (flower.layoutY - bouquetCenterY);
                   
                   onFlowerChange?.(i, { x: startX + dx, y: startY + dy });
                }}
              >
                {node}
              </motion.g>
            );
          }
          return <React.Fragment key={`flower-${i}-${flower.seed || i}`}>{node}</React.Fragment>;
        })}

        {/* Ribbon */}
        {showRibbon && (
          <g transform={`translate(${layout.stemBaseX}, ${layout.ribbonY})`}>
            {/* Left loops */}
            <path d="M0,0 C-25,-15 -45,10 -15,15 C-5,15 0,5 0,0 Z" fill={ribbonColors.fill} stroke={ribbonColors.stroke} strokeWidth="1.5" opacity="0.85" />
            <path d="M-5,5 C-15,10 -30,20 -35,50 C-20,40 -10,30 -5,5 Z" fill="none" stroke={ribbonColors.stroke} strokeWidth="2" opacity="0.9" strokeLinecap="round" />
            
            {/* Right loops */}
            <path d="M0,0 C25,-15 45,10 15,15 C5,15 0,5 0,0 Z" fill={ribbonColors.fill} stroke={ribbonColors.stroke} strokeWidth="1.5" opacity="0.85" />
            <path d="M5,5 C15,10 30,20 35,50 C20,40 10,30 5,5 Z" fill="none" stroke={ribbonColors.stroke} strokeWidth="2" opacity="0.9" strokeLinecap="round" />
            
            {/* Knot */}
            <ellipse cx="0" cy="2" rx="6" ry="4" fill={ribbonColors.fill} stroke={ribbonColors.stroke} strokeWidth="2" />
          </g>
        )}
      </g>
    </svg>
  );
}

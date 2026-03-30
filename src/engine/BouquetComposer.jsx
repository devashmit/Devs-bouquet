import React, { useMemo } from 'react';
import { createRng } from './randomizer';
import { getFlowerComponent, Stem } from './flowers';
import { getRibbonColors, getStyleOptions } from './styles';
import rough from 'roughjs';
import { useRef, useEffect } from 'react';

/**
 * BouquetComposer — arranges flowers in a radial cluster layout.
 * Center = dense, edges = airy. Stems converge at base.
 * Optional ribbon at convergence point.
 */
export default function BouquetComposer({
  flowers = [],
  styleMode = 'sketch',
  showRibbon = true,
  width = 400,
  height = 500,
  seed = 1,
  className = '',
  id,
}) {
  const rng = useMemo(() => createRng(seed), [seed]);
  const ribbonRef = useRef(null);
  const ribbonColors = useMemo(() => getRibbonColors(styleMode), [styleMode]);
  const styleOpts = useMemo(() => getStyleOptions(styleMode), [styleMode]);

  // Layout computation
  const layout = useMemo(() => {
    if (!flowers.length) return { arranged: [], stems: [] };

    const cx = width / 2;
    const bouquetTopY = height * 0.12;
    const bouquetCenterY = height * 0.35;
    const stemBaseX = cx;
    const stemBaseY = height * 0.78;
    const ribbonY = height * 0.68;

    const arranged = flowers.map((flower, i) => {
      const flowerRng = createRng(flower.seed || seed + i * 13);
      const count = flowers.length;

      let fx, fy, fscale, frotation;

      if (count === 1) {
        // Single flower: centered
        fx = cx;
        fy = bouquetCenterY - 20;
        fscale = (flower.scale || 1) * 1.3;
        frotation = flowerRng.rotation(10);
      } else {
        // Radial placement
        const angleStep = 360 / count;
        const baseAngle = angleStep * i - 90; // start from top
        const rad = (baseAngle * Math.PI) / 180;

        // Inner flowers (first half) are closer to center
        const isInner = i < Math.ceil(count / 2);
        const radiusBase = isInner
          ? Math.min(width, height) * 0.1
          : Math.min(width, height) * 0.18;

        const radius = radiusBase * flowerRng.scale(0.25);
        fx = cx + Math.cos(rad) * radius + flowerRng.jitter(0, 8);
        fy = bouquetCenterY + Math.sin(rad) * radius * 0.7 + flowerRng.jitter(0, 6);

        // Outer flowers slightly smaller
        fscale = (flower.scale || 1) * (isInner ? 1.15 : 0.9) * flowerRng.scale(0.1);
        frotation = (flower.rotation || 0) + flowerRng.rotation(20);
      }

      return {
        ...flower,
        layoutX: fx,
        layoutY: fy,
        layoutScale: fscale,
        layoutRotation: frotation,
      };
    });

    // Generate stem data
    const stems = arranged.map((flower, i) => {
      const flowerRng = createRng((flower.seed || seed) + 500 + i);
      // Stem goes from flower base to convergence point near ribbon
      const stemTopX = flower.layoutX;
      const stemTopY = flower.layoutY + 15 * flower.layoutScale;
      const convergenceX = stemBaseX + flowerRng.jitter(0, 5);
      const convergenceY = stemBaseY;

      return {
        x1: stemTopX,
        y1: stemTopY,
        x2: convergenceX,
        y2: convergenceY,
        curvature: flowerRng.range(0.05, 0.2),
        seed: (flower.seed || seed) + 500 + i,
        showLeaf: flowerRng.random() > 0.6,
        leafSide: flowerRng.random() > 0.5 ? 'left' : 'right',
      };
    });

    return { arranged, stems, ribbonY, stemBaseX };
  }, [flowers, width, height, seed, rng]);

  // Draw ribbon with rough.js
  useEffect(() => {
    const svg = ribbonRef.current;
    if (!svg || !showRibbon || !flowers.length) return;

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rc = rough.svg(svg);
    const ribbonRng = createRng(seed + 999);
    const rx = layout.stemBaseX;
    const ry = layout.ribbonY || height * 0.68;
    const rw = 30;
    const rh = 12;

    // Bow loops
    const leftBow = `M ${rx} ${ry} 
      Q ${rx - rw * ribbonRng.scale(0.2)} ${ry - rh * ribbonRng.scale(0.3)} ${rx - rw * 0.7} ${ry + 2}
      Q ${rx - rw * 0.3} ${ry + rh * 0.6} ${rx} ${ry} Z`;

    const rightBow = `M ${rx} ${ry}
      Q ${rx + rw * ribbonRng.scale(0.2)} ${ry - rh * ribbonRng.scale(0.3)} ${rx + rw * 0.7} ${ry + 2}
      Q ${rx + rw * 0.3} ${ry + rh * 0.6} ${rx} ${ry} Z`;

    svg.appendChild(rc.path(leftBow, {
      roughness: styleOpts.roughness,
      stroke: ribbonColors.stroke,
      fill: ribbonColors.fill,
      fillStyle: styleOpts.fillStyle,
      fillWeight: styleOpts.fillWeight,
      strokeWidth: styleOpts.strokeWidth,
      seed: seed + 1000,
    }));

    svg.appendChild(rc.path(rightBow, {
      roughness: styleOpts.roughness,
      stroke: ribbonColors.stroke,
      fill: ribbonColors.fill,
      fillStyle: styleOpts.fillStyle,
      fillWeight: styleOpts.fillWeight,
      strokeWidth: styleOpts.strokeWidth,
      seed: seed + 1001,
    }));

    // Ribbon tails
    const tailL = `M ${rx - 3} ${ry + 3}
      Q ${rx - 15} ${ry + 18} ${rx - 18 + ribbonRng.jitter(0, 3)} ${ry + 28}`;
    const tailR = `M ${rx + 3} ${ry + 3}
      Q ${rx + 15} ${ry + 18} ${rx + 18 + ribbonRng.jitter(0, 3)} ${ry + 28}`;

    svg.appendChild(rc.path(tailL, {
      roughness: styleOpts.roughness * 0.7,
      stroke: ribbonColors.stroke,
      fill: 'none',
      strokeWidth: styleOpts.strokeWidth * 1.3,
      seed: seed + 1002,
    }));

    svg.appendChild(rc.path(tailR, {
      roughness: styleOpts.roughness * 0.7,
      stroke: ribbonColors.stroke,
      fill: 'none',
      strokeWidth: styleOpts.strokeWidth * 1.3,
      seed: seed + 1003,
    }));
  }, [showRibbon, flowers.length, seed, styleMode, layout, ribbonColors, styleOpts, width, height]);

  if (!flowers.length) return null;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className={`bouquet-composer ${className}`}
      id={id}
      style={{ maxWidth: '90vw' }}
    >
      {/* Background — soft cream for export */}
      <rect width={width} height={height} fill="#fdf6f0" rx="8" />

      {/* Stems (drawn behind flowers) */}
      {layout.stems.map((stem, i) => (
        <Stem
          key={`stem-${i}`}
          {...stem}
          styleMode={styleMode}
        />
      ))}

      {/* Ribbon */}
      {showRibbon && (
        <svg
          ref={ribbonRef}
          x={0}
          y={0}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          overflow="visible"
        />
      )}

      {/* Flowers (drawn on top) */}
      {layout.arranged.map((flower, i) => {
        const FlowerComponent = getFlowerComponent(flower.type);
        return (
          <FlowerComponent
            key={`flower-${i}-${flower.seed}`}
            x={flower.layoutX}
            y={flower.layoutY}
            scale={flower.layoutScale}
            rotation={flower.layoutRotation}
            petalVariance={flower.petalVariance ?? 0.3}
            roughness={flower.roughness}
            strokeWidth={flower.strokeWidth}
            color={flower.color}
            seed={flower.seed || seed + i * 17}
            styleMode={styleMode}
          />
        );
      })}
    </svg>
  );
}

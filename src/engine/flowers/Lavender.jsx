import React, { useRef, useEffect, useMemo } from 'react';
import rough from 'roughjs';
import { createRng } from '../randomizer';
import { getFlowerColors, getStyleOptions } from '../styles';

/**
 * Lavender — vertical stem cluster with small repeated strokes.
 * Slight horizontal drift per bud, tapers toward top.
 */
export default function Lavender({
  x = 0, y = 0, scale = 1, rotation = 0,
  petalVariance = 0.3, roughness = 1.5, strokeWidth = 1.5,
  color, seed = 42, styleMode = 'sketch',
  className = ''
}) {
  const svgRef = useRef(null);
  const rng = useMemo(() => createRng(seed), [seed]);
  const colors = useMemo(() => getFlowerColors('lavender', styleMode), [styleMode]);
  const styleOpts = useMemo(() => getStyleOptions(styleMode), [styleMode]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rc = rough.svg(svg);
    const baseOpts = {
      roughness: roughness || styleOpts.roughness,
      bowing: styleOpts.bowing,
      strokeWidth: strokeWidth || styleOpts.strokeWidth,
      fillStyle: styleOpts.fillStyle,
      fillWeight: styleOpts.fillWeight,
      hachureGap: styleOpts.hachureGap,
      seed: seed,
    };

    const budCount = rng.int(10, 16);
    const clusterHeight = 32;
    const maxWidth = 8;
    const jt = petalVariance * 2;

    // Draw small bud ovals from bottom to top
    for (let i = 0; i < budCount; i++) {
      const t = i / (budCount - 1); // 0 = bottom, 1 = top
      const yPos = clusterHeight * 0.5 - t * clusterHeight;
      
      // Taper: wider at bottom, narrow at top
      const widthAtY = maxWidth * (1 - t * 0.6) * rng.scale(petalVariance * 0.3);
      const budH = rng.range(2.5, 4.5) * (1 - t * 0.3);
      
      // Horizontal drift
      const drift = rng.jitter(0, 2 * petalVariance);
      
      // Alternate sides slightly for organic feel
      const sideOffset = (i % 2 === 0 ? 1 : -1) * rng.range(0, widthAtY * 0.3);

      svg.appendChild(rc.ellipse(
        drift + sideOffset,
        yPos,
        widthAtY,
        budH,
        {
          ...baseOpts,
          stroke: colors.stroke,
          fill: rng.pick(colors.petals),
          roughness: (roughness || styleOpts.roughness) * 0.7,
          seed: seed + i * 5,
        }
      ));
    }

    // Central thin stem line through the cluster
    const stemPath = [];
    const stemSteps = 8;
    for (let i = 0; i <= stemSteps; i++) {
      const t = i / stemSteps;
      const sy = clusterHeight * 0.5 - t * clusterHeight;
      const sx = rng.jitter(0, 0.5);
      stemPath.push([sx, sy]);
    }

    svg.appendChild(rc.curve(stemPath, {
      ...baseOpts,
      stroke: colors.stroke,
      fill: 'none',
      strokeWidth: (strokeWidth || styleOpts.strokeWidth) * 0.5,
      roughness: (roughness || styleOpts.roughness) * 0.5,
      seed: seed + 100,
    }));

  }, [seed, roughness, strokeWidth, petalVariance, color, styleMode, rng, colors, styleOpts]);

  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}
      className={`flower flower-lavender ${className}`}
      data-type="lavender"
    >
      <svg
        ref={svgRef}
        x={-15}
        y={-20}
        width={30}
        height={40}
        viewBox="-15 -20 30 40"
        overflow="visible"
      />
    </g>
  );
}

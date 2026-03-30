import React, { useRef, useEffect, useMemo } from 'react';
import rough from 'roughjs';
import { createRng, degToRad } from '../randomizer';
import { getFlowerColors, getStyleOptions } from '../styles';

/**
 * Tulip — curved closed shape with slight tilt.
 * 3 overlapping petals forming a cupped form.
 */
export default function Tulip({
  x = 0, y = 0, scale = 1, rotation = 0,
  petalVariance = 0.3, roughness = 1.5, strokeWidth = 1.5,
  color, seed = 42, styleMode = 'sketch',
  className = ''
}) {
  const svgRef = useRef(null);
  const rng = useMemo(() => createRng(seed), [seed]);
  const colors = useMemo(() => getFlowerColors('tulip', styleMode), [styleMode]);
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

    const tilt = rng.rotation(8 * petalVariance);
    const h = 30; // tulip height
    const w = 18; // base width
    const jt = petalVariance * 4;

    // Back petal (widest, drawn first)
    const backPetalD = `
      M ${rng.jitter(-w * 0.3, jt * 0.3)} ${rng.jitter(5, jt * 0.2)}
      Q ${rng.jitter(-w * 0.7, jt)} ${rng.jitter(-h * 0.3, jt)} ${rng.jitter(0, jt * 0.5)} ${rng.jitter(-h * 0.85, jt)}
      Q ${rng.jitter(w * 0.7, jt)} ${rng.jitter(-h * 0.3, jt)} ${rng.jitter(w * 0.3, jt * 0.3)} ${rng.jitter(5, jt * 0.2)}
      Z`;

    svg.appendChild(rc.path(backPetalD, {
      ...baseOpts,
      stroke: colors.stroke,
      fill: rng.pick(colors.petals),
      seed: seed + 1,
    }));

    // Left petal
    const leftPetalD = `
      M ${rng.jitter(-1, jt * 0.2)} ${rng.jitter(4, jt * 0.2)}
      Q ${rng.jitter(-w * 0.8, jt)} ${rng.jitter(-h * 0.4, jt)} ${rng.jitter(-w * 0.15, jt * 0.5)} ${rng.jitter(-h * 0.75, jt)}
      Q ${rng.jitter(w * 0.1, jt * 0.5)} ${rng.jitter(-h * 0.5, jt)} ${rng.jitter(2, jt * 0.3)} ${rng.jitter(0, jt * 0.2)}
      Z`;

    svg.appendChild(rc.path(leftPetalD, {
      ...baseOpts,
      stroke: colors.stroke,
      fill: rng.pick(colors.petals),
      seed: seed + 2,
    }));

    // Right petal
    const rightPetalD = `
      M ${rng.jitter(1, jt * 0.2)} ${rng.jitter(4, jt * 0.2)}
      Q ${rng.jitter(w * 0.8, jt)} ${rng.jitter(-h * 0.4, jt)} ${rng.jitter(w * 0.15, jt * 0.5)} ${rng.jitter(-h * 0.75, jt)}
      Q ${rng.jitter(-w * 0.1, jt * 0.5)} ${rng.jitter(-h * 0.5, jt)} ${rng.jitter(-2, jt * 0.3)} ${rng.jitter(0, jt * 0.2)}
      Z`;

    svg.appendChild(rc.path(rightPetalD, {
      ...baseOpts,
      stroke: colors.stroke,
      fill: rng.pick(colors.petals),
      seed: seed + 3,
    }));

    // Inner line detail (cup seam)
    const seamD = `M ${rng.jitter(0, 1)} ${rng.jitter(-h * 0.6, 2)} 
      Q ${rng.jitter(0, 2)} ${rng.jitter(-h * 0.3, 2)} ${rng.jitter(0, 1)} ${rng.jitter(2, 1)}`;
    
    svg.appendChild(rc.path(seamD, {
      ...baseOpts,
      stroke: colors.stroke,
      fill: 'none',
      strokeWidth: (strokeWidth || styleOpts.strokeWidth) * 0.5,
      roughness: (roughness || styleOpts.roughness) * 0.6,
      seed: seed + 4,
    }));

  }, [seed, roughness, strokeWidth, petalVariance, color, styleMode, rng, colors, styleOpts]);

  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}
      className={`flower flower-tulip ${className}`}
      data-type="tulip"
    >
      <svg
        ref={svgRef}
        x={-25}
        y={-35}
        width={50}
        height={45}
        viewBox="-25 -35 50 45"
        overflow="visible"
      />
    </g>
  );
}

import React, { useRef, useEffect, useMemo } from 'react';
import rough from 'roughjs';
import { createRng, degToRad } from '../randomizer';
import { getFlowerColors, getStyleOptions } from '../styles';

/**
 * Rose — spiral core with layered imperfect petals.
 * Every petal is unique: different curvature, size, rotation.
 */
export default function Rose({ 
  x = 0, y = 0, scale = 1, rotation = 0,
  petalVariance = 0.3, roughness = 1.5, strokeWidth = 1.5,
  color, seed = 42, styleMode = 'sketch',
  className = ''
}) {
  const svgRef = useRef(null);
  const rng = useMemo(() => createRng(seed), [seed]);
  const colors = useMemo(() => getFlowerColors('rose', styleMode), [styleMode]);
  const styleOpts = useMemo(() => getStyleOptions(styleMode), [styleMode]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Clear previous render
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

    const petalCount = rng.int(5, 8);
    const baseRadius = 22;
    const fillColor = color || colors.fill;

    // Outer petals (larger, background layer)
    for (let i = 0; i < petalCount; i++) {
      const angle = (360 / petalCount) * i + rng.rotation(15 * petalVariance);
      const rad = degToRad(angle);
      const petalLen = baseRadius * rng.scale(petalVariance * 0.6);
      const petalWidth = (baseRadius * 0.7) * rng.scale(petalVariance * 0.5);
      const petalColor = rng.pick(colors.petals);

      // Each petal is an ellipse offset from center, rotated to its angle
      const px = Math.cos(rad) * petalLen * 0.5;
      const py = Math.sin(rad) * petalLen * 0.5;

      // Build petal path with bezier curves for organic shape
      const tipX = Math.cos(rad) * petalLen;
      const tipY = Math.sin(rad) * petalLen;
      
      const perpRad = rad + Math.PI / 2;
      const w = petalWidth * 0.5;
      const leftX = Math.cos(perpRad) * w + px * 0.4;
      const leftY = Math.sin(perpRad) * w + py * 0.4;
      const rightX = -Math.cos(perpRad) * w + px * 0.4;
      const rightY = -Math.sin(perpRad) * w + py * 0.4;

      // Control point jitter for imperfection
      const jt = petalVariance * 6;
      const cp1x = rng.jitter((leftX + tipX) / 2, jt);
      const cp1y = rng.jitter((leftY + tipY) / 2, jt);
      const cp2x = rng.jitter((rightX + tipX) / 2, jt);
      const cp2y = rng.jitter((rightY + tipY) / 2, jt);

      const d = `M 0 0 
        Q ${rng.jitter(leftX, jt * 0.3)} ${rng.jitter(leftY, jt * 0.3)} ${leftX} ${leftY}
        Q ${cp1x} ${cp1y} ${tipX} ${tipY}
        Q ${cp2x} ${cp2y} ${rightX} ${rightY}
        Q ${rng.jitter(rightX * 0.3, jt * 0.3)} ${rng.jitter(rightY * 0.3, jt * 0.3)} 0 0 Z`;

      const node = rc.path(d, {
        ...baseOpts,
        stroke: colors.stroke,
        fill: petalColor,
        seed: seed + i * 7,
      });
      svg.appendChild(node);
    }

    // Inner petals (smaller, tighter)
    const innerCount = rng.int(3, 5);
    for (let i = 0; i < innerCount; i++) {
      const angle = (360 / innerCount) * i + rng.rotation(25);
      const rad = degToRad(angle);
      const innerR = baseRadius * 0.45 * rng.scale(petalVariance * 0.4);
      const tipX = Math.cos(rad) * innerR;
      const tipY = Math.sin(rad) * innerR;
      
      const perpRad = rad + Math.PI / 2;
      const w = innerR * 0.55;
      const jt = petalVariance * 3;

      const d = `M 0 0 
        Q ${rng.jitter(Math.cos(perpRad) * w * 0.5, jt)} ${rng.jitter(Math.sin(perpRad) * w * 0.5, jt)} ${tipX} ${tipY}
        Q ${rng.jitter(-Math.cos(perpRad) * w * 0.5, jt)} ${rng.jitter(-Math.sin(perpRad) * w * 0.5, jt)} 0 0 Z`;

      const node = rc.path(d, {
        ...baseOpts,
        stroke: colors.stroke,
        fill: rng.pick(colors.petals),
        strokeWidth: (strokeWidth || styleOpts.strokeWidth) * 0.8,
        seed: seed + 100 + i * 11,
      });
      svg.appendChild(node);
    }

    // Spiral core
    let spiralPath = 'M 0 0';
    const spiralTurns = 2.5;
    const spiralSteps = 20;
    for (let i = 1; i <= spiralSteps; i++) {
      const t = i / spiralSteps;
      const angle = t * spiralTurns * 2 * Math.PI;
      const r = t * baseRadius * 0.25;
      const sx = Math.cos(angle) * r + rng.jitter(0, 0.8);
      const sy = Math.sin(angle) * r + rng.jitter(0, 0.8);
      spiralPath += ` L ${sx} ${sy}`;
    }

    const spiralNode = rc.path(spiralPath, {
      ...baseOpts,
      stroke: colors.stroke,
      fill: 'none',
      strokeWidth: (strokeWidth || styleOpts.strokeWidth) * 0.7,
      roughness: (roughness || styleOpts.roughness) * 0.8,
      seed: seed + 200,
    });
    svg.appendChild(spiralNode);

  }, [seed, roughness, strokeWidth, petalVariance, color, styleMode, rng, colors, styleOpts]);

  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}
      className={`flower flower-rose ${className}`}
      data-type="rose"
    >
      <svg
        ref={svgRef}
        x={-30}
        y={-30}
        width={60}
        height={60}
        viewBox="-30 -30 60 60"
        overflow="visible"
      />
    </g>
  );
}

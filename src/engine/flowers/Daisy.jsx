import React, { useRef, useEffect, useMemo } from 'react';
import rough from 'roughjs';
import { createRng, degToRad } from '../randomizer';
import { getFlowerColors, getStyleOptions } from '../styles';

/**
 * Daisy — central disc with radial petals.
 * Irregular spacing, each petal a unique elongated ellipse.
 */
export default function Daisy({
  x = 0, y = 0, scale = 1, rotation = 0,
  petalVariance = 0.3, roughness = 1.5, strokeWidth = 1.5,
  color, seed = 42, styleMode = 'sketch',
  className = ''
}) {
  const svgRef = useRef(null);
  const rng = useMemo(() => createRng(seed), [seed]);
  const colors = useMemo(() => getFlowerColors('daisy', styleMode), [styleMode]);
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

    const petalCount = rng.int(8, 13);
    const centerR = 6;
    const petalLen = 16;
    const petalW = 6;
    const jt = petalVariance * 3;

    // Draw petals first (behind center)
    for (let i = 0; i < petalCount; i++) {
      const baseAngle = (360 / petalCount) * i;
      const angle = baseAngle + rng.rotation(8 * petalVariance);
      const rad = degToRad(angle);

      const len = petalLen * rng.scale(petalVariance * 0.5);
      const w = petalW * rng.scale(petalVariance * 0.4);

      // Petal as elongated shape from center outward
      const tipX = Math.cos(rad) * len;
      const tipY = Math.sin(rad) * len;
      const perpRad = rad + Math.PI / 2;
      const halfW = w * 0.5;

      // Start point at center edge
      const startX = Math.cos(rad) * centerR * 0.7;
      const startY = Math.sin(rad) * centerR * 0.7;

      const leftMidX = startX + Math.cos(perpRad) * halfW * rng.scale(0.3);
      const leftMidY = startY + Math.sin(perpRad) * halfW * rng.scale(0.3);
      const rightMidX = startX - Math.cos(perpRad) * halfW * rng.scale(0.3);
      const rightMidY = startY - Math.sin(perpRad) * halfW * rng.scale(0.3);

      const d = `
        M ${startX} ${startY}
        Q ${rng.jitter(leftMidX + (tipX - startX) * 0.3, jt)} ${rng.jitter(leftMidY + (tipY - startY) * 0.3, jt)} ${rng.jitter(tipX, jt * 0.5)} ${rng.jitter(tipY, jt * 0.5)}
        Q ${rng.jitter(rightMidX + (tipX - startX) * 0.3, jt)} ${rng.jitter(rightMidY + (tipY - startY) * 0.3, jt)} ${startX} ${startY}
        Z`;

      svg.appendChild(rc.path(d, {
        ...baseOpts,
        stroke: colors.stroke,
        fill: rng.pick(colors.petals),
        seed: seed + i * 7,
      }));
    }

    // Center disc
    svg.appendChild(rc.circle(0, 0, centerR * 2, {
      ...baseOpts,
      stroke: colors.stroke,
      fill: colors.center || colors.fill,
      roughness: (roughness || styleOpts.roughness) * 0.7,
      seed: seed + 100,
    }));

    // Center texture dots
    const dotCount = rng.int(3, 6);
    for (let i = 0; i < dotCount; i++) {
      const dotAngle = rng.range(0, Math.PI * 2);
      const dotR = rng.range(0, centerR * 0.6);
      const dx = Math.cos(dotAngle) * dotR;
      const dy = Math.sin(dotAngle) * dotR;
      
      svg.appendChild(rc.circle(dx, dy, rng.range(1, 2.5), {
        ...baseOpts,
        stroke: colors.stroke,
        fill: colors.stroke,
        strokeWidth: 0.5,
        roughness: 0.8,
        seed: seed + 200 + i,
      }));
    }

  }, [seed, roughness, strokeWidth, petalVariance, color, styleMode, rng, colors, styleOpts]);

  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}
      className={`flower flower-daisy ${className}`}
      data-type="daisy"
    >
      <svg
        ref={svgRef}
        x={-25}
        y={-25}
        width={50}
        height={50}
        viewBox="-25 -25 50 50"
        overflow="visible"
      />
    </g>
  );
}

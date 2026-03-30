import React, { useRef, useEffect, useMemo } from 'react';
import rough from 'roughjs';
import { createRng } from '../randomizer';
import { getStemColors, getStyleOptions } from '../styles';

/**
 * Stem — curved bezier path, never straight.
 * Non-uniform appearance with optional leaf attachments.
 */
export default function Stem({
  x1 = 0, y1 = 0, x2 = 0, y2 = 60,
  curvature = 0.3, seed = 42,
  styleMode = 'sketch', roughness, strokeWidth,
  showLeaf = false, leafSide = 'left',
  className = ''
}) {
  const svgRef = useRef(null);
  const rng = useMemo(() => createRng(seed), [seed]);
  const colors = useMemo(() => getStemColors(styleMode), [styleMode]);
  const styleOpts = useMemo(() => getStyleOptions(styleMode), [styleMode]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rc = rough.svg(svg);
    const sw = strokeWidth || styleOpts.strokeWidth;
    const baseOpts = {
      roughness: (roughness || styleOpts.roughness) * 0.8,
      bowing: styleOpts.bowing,
      strokeWidth: sw * 1.2,
      stroke: colors.stroke,
      fill: 'none',
      seed: seed,
    };

    // Create curved stem path using multiple points with jitter
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const perpX = -dy / len;
    const perpY = dx / len;
    
    const curveOffset = len * curvature * rng.scale(0.4);
    const points = [];
    const steps = 6;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const baseX = x1 + dx * t;
      const baseY = y1 + dy * t;
      // Apply curve (sine wave shaped) with jitter
      const curveT = Math.sin(t * Math.PI) * curveOffset;
      const jitter = rng.jitter(0, 1.5);
      points.push([
        baseX + perpX * curveT + rng.jitter(0, 0.8),
        baseY + perpY * curveT + jitter,
      ]);
    }

    svg.appendChild(rc.curve(points, baseOpts));

    // Optional leaf
    if (showLeaf) {
      const leafT = rng.range(0.35, 0.6);
      const leafIdx = Math.floor(leafT * steps);
      const leafPoint = points[leafIdx] || points[Math.floor(steps / 2)];
      const leafDir = leafSide === 'left' ? -1 : 1;
      const leafLen = rng.range(8, 14);
      const leafW = rng.range(4, 7);
      
      const lx = leafPoint[0];
      const ly = leafPoint[1];
      const leafAngle = leafDir * rng.range(30, 60);
      const leafRad = (leafAngle * Math.PI) / 180;
      
      const tipX = lx + Math.cos(leafRad) * leafLen;
      const tipY = ly + Math.sin(leafRad) * leafLen;

      const leafD = `
        M ${lx} ${ly}
        Q ${rng.jitter((lx + tipX) / 2, 2)} ${rng.jitter((ly + tipY) / 2 - leafW * 0.5, 2)} ${tipX} ${tipY}
        Q ${rng.jitter((lx + tipX) / 2, 2)} ${rng.jitter((ly + tipY) / 2 + leafW * 0.5, 2)} ${lx} ${ly}
        Z`;

      svg.appendChild(rc.path(leafD, {
        ...baseOpts,
        stroke: colors.stroke,
        fill: colors.fill,
        strokeWidth: sw * 0.8,
        fillStyle: styleOpts.fillStyle,
        fillWeight: styleOpts.fillWeight,
        hachureGap: styleOpts.hachureGap,
        seed: seed + 50,
      }));

      // Leaf vein
      const veinD = `M ${lx} ${ly} Q ${rng.jitter((lx + tipX) / 2, 1)} ${rng.jitter((ly + tipY) / 2, 1)} ${tipX} ${tipY}`;
      svg.appendChild(rc.path(veinD, {
        ...baseOpts,
        stroke: colors.stroke,
        fill: 'none',
        strokeWidth: sw * 0.4,
        roughness: 0.8,
        seed: seed + 51,
      }));
    }

  }, [x1, y1, x2, y2, curvature, seed, styleMode, roughness, strokeWidth, showLeaf, leafSide, rng, colors, styleOpts]);

  // Calculate bounding box
  const minX = Math.min(x1, x2) - 30;
  const minY = Math.min(y1, y2) - 10;
  const w = Math.abs(x2 - x1) + 60;
  const h = Math.abs(y2 - y1) + 20;

  return (
    <g className={`stem ${className}`} data-type="stem">
      <svg
        ref={svgRef}
        x={minX}
        y={minY}
        width={w}
        height={h}
        viewBox={`${minX} ${minY} ${w} ${h}`}
        overflow="visible"
      />
    </g>
  );
}

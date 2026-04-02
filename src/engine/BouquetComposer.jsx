import React, { useMemo } from 'react';
import { createRng } from './randomizer';
import { getFlowerComponent } from './flowers';
import { getRibbonColors } from './styles';
import { motion } from 'framer-motion';

/**
 * BouquetComposer — ink + watercolor sketch bouquet.
 *
 * Layout matches the reference:
 * - Rose large in center-front
 * - Tulips tall, flanking left and right
 * - Daisies at sides
 * - Lavender spikes
 * - Large pointed leaves
 * - Long stems tied with thin ribbon bow
 */
export default function BouquetComposer({
  flowers = [],
  styleMode = 'sketch',
  showRibbon = true,
  width = 420,
  height = 580,
  seed = 1,
  className = '',
  id,
  interactive = false,
  onFlowerChange,
}) {
  const ribbonColors = useMemo(() => getRibbonColors(styleMode), [styleMode]);

  const layout = useMemo(() => {
    if (!flowers.length) return { arranged: [] };

    const cx = width / 2;
    const count = flowers.length;

    // Tie point — ribbon sits here
    const tieX = cx;
    const tieY = height * 0.72;

    // Flower zone center
    const fcy = height * 0.36;

    // Sort: leaves/fillers back, lavender/wildflower mid, focal front
    const zOrder = (t) => {
      if (t === 'filler') return 0;
      if (t === 'wildflower') return 1;
      if (t === 'lavender') return 2;
      if (t === 'tulip') return 3;
      if (t === 'daisy') return 4;
      if (t === 'lily') return 4;
      if (t === 'rose') return 5;
      return 3;
    };

    const sorted = [...flowers]
      .map((f, i) => ({ ...f, _origIdx: i }))
      .sort((a, b) => zOrder(a.type) - zOrder(b.type));

    const arranged = sorted.map((flower, i) => {
      const rng = createRng(flower.seed || seed + i * 17);

      let fx, fy, fscale, frotation;

      if (flower.x !== undefined && flower.y !== undefined) {
        fx = cx + flower.x;
        fy = fcy + flower.y;
        fscale = flower.scale || 1;
        frotation = flower.rotation || 0;
      } else if (count === 1) {
        fx = cx;
        fy = fcy;
        fscale = 1.4;
        frotation = rng.range(-8, 8);
      } else {
        // Natural spread — golden angle with type-based positioning
        const angle = i * 137.5 + rng.range(-15, 15);
        const rad = (angle * Math.PI) / 180;

        // Spread radius based on type
        const baseR = flower.type === 'rose' ? 0
          : flower.type === 'filler' ? rng.range(55, 90)
          : flower.type === 'lavender' ? rng.range(60, 95)
          : flower.type === 'tulip' ? rng.range(40, 75)
          : flower.type === 'daisy' ? rng.range(45, 80)
          : rng.range(35, 70);

        fx = cx + Math.cos(rad) * baseR + rng.range(-10, 10);
        fy = fcy + Math.sin(rad) * baseR * 0.65 + rng.range(-12, 12);

        // Tulips go higher
        if (flower.type === 'tulip') fy -= rng.range(30, 55);
        // Lavender goes higher too
        if (flower.type === 'lavender') fy -= rng.range(20, 40);
        // Leaves go lower/sides
        if (flower.type === 'filler') fy += rng.range(10, 30);

        const typeScale =
          flower.type === 'rose'       ? 1.5  :
          flower.type === 'daisy'      ? 1.3  :
          flower.type === 'tulip'      ? 1.35 :
          flower.type === 'lavender'   ? 1.3  :
          flower.type === 'lily'       ? 1.1  :
          flower.type === 'filler'     ? 1.2  :
          flower.type === 'wildflower' ? 1.0  : 1.2;

        fscale = typeScale * rng.range(0.88, 1.12);
        frotation = rng.range(-20, 20);
      }

      // Stem path
      const rng2 = createRng((flower.seed || seed) + 600 + i);
      const cp1x = fx + rng2.range(-12, 12);
      const cp1y = fy + rng2.range(25, 55);
      const cp2x = tieX + rng2.range(-18, 18);
      const cp2y = tieY - rng2.range(25, 65);
      const ex   = tieX + rng2.range(-7, 7);

      return {
        ...flower,
        layoutX: fx,
        layoutY: fy,
        layoutScale: fscale,
        layoutRotation: frotation,
        stemPath: `M${fx},${fy + 10} C${cp1x},${cp1y} ${cp2x},${cp2y} ${ex},${tieY}`,
      };
    });

    return { arranged, tieX, tieY };
  }, [flowers, width, height, seed]);

  if (!flowers.length) return null;

  const { arranged, tieX, tieY } = layout;
  const bundleBottom = tieY + height * 0.2;
  const stemColor = styleMode === 'mono' ? '#4a4a4a' : '#5a7a4a';

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      className={`bouquet-composer ${className}`}
      id={id}
      style={{ maxWidth: '90vw', touchAction: 'none', background: '#fefcf8' }}
    >
      {/* Warm off-white paper background */}
      <rect width={width} height={height} fill="#fefcf8" />

      {/* Watercolor ink splatter dots */}
      {Array.from({ length: 22 }).map((_, i) => {
        const sr = createRng(seed + i * 13 + 5000);
        const colors = styleMode === 'mono'
          ? ['#ccc', '#bbb']
          : ['#e8b0b8', '#c8b0d8', '#d8c8a0', '#f0c8c0'];
        return (
          <circle key={`sp-${i}`}
            cx={sr.range(10, width - 10)} cy={sr.range(10, height * 0.88)}
            r={sr.range(0.8, 3)}
            fill={colors[Math.floor(sr.random() * colors.length)]}
            opacity={sr.range(0.1, 0.38)}
          />
        );
      })}

      {/* Stems — behind flowers */}
      <g>
        {arranged.map((f, i) => (
          <path key={`stem-${i}`}
            d={f.stemPath}
            fill="none"
            stroke={stemColor}
            strokeWidth={f.type === 'filler' ? '1.2' : '1.7'}
            strokeLinecap="round"
            opacity="0.75"
          />
        ))}
        {/* Bundle below tie */}
        {Array.from({ length: Math.min(flowers.length + 2, 9) }).map((_, i) => {
          const sr = createRng(seed + i * 53 + 9000);
          const bx = tieX + sr.range(-7, 7);
          return (
            <line key={`b-${i}`}
              x1={bx} y1={tieY + 3}
              x2={bx + sr.range(-4, 4)} y2={bundleBottom}
              stroke={stemColor} strokeWidth="1.6" strokeLinecap="round" opacity="0.7"
            />
          );
        })}
      </g>

      {/* Flowers */}
      {arranged.map((flower, i) => {
        const FlowerComponent = getFlowerComponent(flower.type);
        const node = (
          <FlowerComponent
            x={interactive ? 0 : flower.layoutX}
            y={interactive ? 0 : flower.layoutY}
            scale={flower.layoutScale}
            rotation={flower.layoutRotation}
            seed={flower.seed || seed + i * 17}
            styleMode={styleMode}
          />
        );

        if (interactive) {
          return (
            <motion.g
              key={`fl-${i}`}
              drag dragMomentum={false}
              style={{ x: flower.layoutX, y: flower.layoutY, cursor: 'grab' }}
              whileDrag={{ cursor: 'grabbing', scale: 1.05 }}
              onDragEnd={(_, info) => {
                const startX = flower.x !== undefined ? flower.x : (flower.layoutX - width / 2);
                const startY = flower.y !== undefined ? flower.y : (flower.layoutY - height * 0.36);
                onFlowerChange?.(flower._origIdx ?? i, {
                  x: startX + info.offset.x,
                  y: startY + info.offset.y,
                });
              }}
            >
              {node}
            </motion.g>
          );
        }
        return <React.Fragment key={`fl-${i}`}>{node}</React.Fragment>;
      })}

      {/* Thin ribbon bow — like the reference (simple, elegant) */}
      {showRibbon && flowers.length >= 2 && (
        <g transform={`translate(${tieX}, ${tieY})`}>
          {/* Left loop */}
          <path d="M0,3 C-14,-16 -40,-2 -20,12 C-10,16 -1,8 0,3 Z"
            fill={ribbonColors.fill} stroke={ribbonColors.stroke} strokeWidth="1.1" opacity="0.85" />
          {/* Right loop */}
          <path d="M0,3 C14,-16 40,-2 20,12 C10,16 1,8 0,3 Z"
            fill={ribbonColors.fill} stroke={ribbonColors.stroke} strokeWidth="1.1" opacity="0.85" />
          {/* Left tail — thin flowing */}
          <path d="M-2,8 C-10,20 -26,40 -30,65 C-18,46 -8,26 -2,8 Z"
            fill={ribbonColors.fill} stroke={ribbonColors.stroke} strokeWidth="1" opacity="0.78" />
          {/* Right tail */}
          <path d="M2,8 C10,20 26,40 30,65 C18,46 8,26 2,8 Z"
            fill={ribbonColors.fill} stroke={ribbonColors.stroke} strokeWidth="1" opacity="0.78" />
          {/* Knot */}
          <ellipse cx="0" cy="5" rx="6" ry="4.5"
            fill={ribbonColors.fill} stroke={ribbonColors.stroke} strokeWidth="1.3" />
        </g>
      )}
    </svg>
  );
}

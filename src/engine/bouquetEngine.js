/**
 * bouquetEngine.js — Pure layout functions for the bouquet composition engine.
 * All functions are stateless and side-effect free.
 */

import FLOWER_TYPES from './flowers/index.jsx';

/**
 * Returns an array of fan angles (in degrees) for `count` flowers.
 * Angles are symmetric around 0.
 * Total arc = min(30 + (count - 2) * 20, 100) degrees.
 *
 * count=0 → []
 * count=1 → [0]
 * count>=2 → symmetric spread, max arc 100° (2→40°, 3→60°, 4→80°, 5+→100°)
 */
export function getFanAngles(count) {
  if (count === 0) return [];
  if (count === 1) return [0];
  // Spread: 2 flowers = 40°, 3 = 60°, 4 = 80°, 5+ = 100° (max)
  const totalArc = Math.min(40 + (count - 2) * 20, 100);
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1) - 0.5;
    return t * totalArc;
  });
}

/**
 * Returns the pixel size for flower images based on how many flowers are in the bouquet.
 * Size decreases as count increases so the bouquet stays within canvas bounds.
 *
 * count=1: 380, count=2: 320, count=3: 280, count=4: 250, count=5: 225
 * count>=6: max(180, 225 - (count-5)*15)
 */
export function getFlowerSize(count) {
  if (count === 1) return 200;
  if (count === 2) return 175;
  if (count === 3) return 155;
  if (count === 4) return 140;
  if (count === 5) return 128;
  if (count === 6) return 118;
  return Math.max(95, 118 - (count - 6) * 8);
}

/**
 * Returns a ribbon { fill, stroke } color based on the dominant color
 * among the selected flowers.
 *
 * pink/red dominant → { fill: '#f8d8e4', stroke: '#d4a0b0' }
 * warm dominant     → { fill: '#f8ecc0', stroke: '#c8a840' }
 * blue dominant     → { fill: '#dcd0f0', stroke: '#9878c8' }
 * default           → { fill: '#f0ece4', stroke: '#b8a898' }
 */
export function getRibbonColor(flowers) {
  const counts = { pink: 0, warm: 0, blue: 0, white: 0 };

  flowers.forEach((f) => {
    const col = FLOWER_TYPES[f.type]?.dominantColor ?? 'white';
    if (col === 'pink' || col === 'red') counts.pink++;
    else if (col === 'warm') counts.warm++;
    else if (col === 'blue') counts.blue++;
    else counts.white++;
  });

  const max = Math.max(...Object.values(counts));
  if (max === 0) return { fill: '#f0ece4', stroke: '#b8a898' };
  if (counts.pink === max) return { fill: '#f8d8e4', stroke: '#d4a0b0' };
  if (counts.warm === max) return { fill: '#f8ecc0', stroke: '#c8a840' };
  if (counts.blue === max) return { fill: '#dcd0f0', stroke: '#9878c8' };
  return { fill: '#f0ece4', stroke: '#b8a898' };
}

/**
 * Sorts flowers so outer flowers come first (rendered behind) and
 * center flowers come last (rendered in front), creating natural depth.
 * Each item in the returned array has an `originalIndex` property.
 *
 * @param {Array<{type: string}>} flowers
 * @returns {Array<{type: string, originalIndex: number}>}
 */
export function zOrderSort(flowers) {
  const count = flowers.length;
  const center = (count - 1) / 2;

  return flowers
    .map((f, i) => ({ ...f, originalIndex: i }))
    .sort((a, b) => {
      // Distance from center: larger distance = further out = rendered first (behind)
      const distA = Math.abs(a.originalIndex - center);
      const distB = Math.abs(b.originalIndex - center);
      // Outer flowers first (higher distance = lower z = earlier in array)
      return distB - distA;
    });
}

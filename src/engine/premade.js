/**
 * Curated Pre-made AI Bouquets
 * 
 * These compositions are used as starting points for users.
 */

export const PREMADE_BOUQUETS = [
  {
    id: 'harmonious-dream',
    name: 'The Harmonious Dream',
    description: 'A beautifully balanced watercolor arrangement featuring a red rose, pink peony, white lily, and yellow sunflower flowing gracefully together.',
    flowers: [
      { type: 'classic_red_rose' },
      { type: 'romantic_pink_peony' },
      { type: 'delicate_white_lily' },
      { type: 'vibrant_sunflower' },
    ],
  },
  {
    id: 'classic-romance',
    name: 'The Classic Romance',
    description: 'A timeless expression of love with red roses and peonies.',
    flowers: [
      { type: 'classic_red_rose' },
      { type: 'classic_red_rose' },
      { type: 'romantic_pink_peony' },
      { type: 'delicate_white_lily' },
      { type: 'babys_breath' },
    ],
  },
  {
    id: 'spring-morning',
    name: 'Spring Morning',
    description: 'Bright and airy, featuring sunflowers and daisies.',
    flowers: [
      { type: 'vibrant_sunflower' },
      { type: 'cheerful_daisy' },
      { type: 'soft_pink_tulip' },
      { type: 'yellow_mimosa' },
    ],
  },
  {
    id: 'quiet-sympathy',
    name: 'Quiet Sympathy',
    description: 'Soft, gentle hydrangea and lavender conveying peace.',
    flowers: [
      { type: 'textured_blue_hydrangea' },
      { type: 'purple_lavender' },
      { type: 'delicate_white_lily' },
      { type: 'babys_breath' },
    ],
  }
];

export function getPremadeBouquet(id) {
  return PREMADE_BOUQUETS.find(b => b.id === id) || PREMADE_BOUQUETS[0];
}

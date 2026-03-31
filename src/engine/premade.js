/**
 * Curated Pre-made Bouquets
 * 
 * These are structured arrays of flowers beautifully arranged by hand.
 * They act as the "Ready Bouquet" gallery.
 */

export const PREMADE_BOUQUETS = [
  {
    id: 'classic-romance',
    name: 'The Classic Romance',
    description: 'A timeless expression of love with a dense center of roses.',
    flowers: [
      { type: 'filler', x: -60, y: -40, rotation: -20, scale: 0.9, seed: 101 },
      { type: 'filler', x: 60, y: -50, rotation: 30, scale: 1.1, seed: 102 },
      { type: 'lily', x: -40, y: -80, rotation: -15, scale: 1.2, seed: 103 },
      { type: 'lily', x: 40, y: -90, rotation: 10, scale: 1.1, seed: 104 },
      { type: 'daisy', x: -70, y: 0, rotation: -40, scale: 0.8, seed: 105 },
      { type: 'tulip', x: 50, y: 10, rotation: 40, scale: 1.0, seed: 106 },
      { type: 'tulip', x: -30, y: 30, rotation: -20, scale: 1.1, seed: 107 },
      { type: 'rose', x: 0, y: -10, rotation: 0, scale: 1.5, petalVariance: 0.4, seed: 108 },
    ],
    styleMode: 'sketch',
  },
  {
    id: 'spring-morning',
    name: 'Spring Morning',
    description: 'Bright and airy, featuring daisies and tulips reaching for the sun.',
    flowers: [
      { type: 'filler', x: 0, y: -100, rotation: 0, scale: 1.2, seed: 201 },
      { type: 'filler', x: -50, y: 20, rotation: -30, scale: 0.9, seed: 202 },
      { type: 'filler', x: 50, y: 30, rotation: 40, scale: 0.9, seed: 203 },
      { type: 'lily', x: -30, y: -50, rotation: -20, scale: 1.1, seed: 204 },
      { type: 'lily', x: 30, y: -40, rotation: 15, scale: 1.0, seed: 205 },
      { type: 'daisy', x: 0, y: -30, rotation: 5, scale: 1.3, seed: 206 },
      { type: 'daisy', x: 60, y: -10, rotation: 45, scale: 1.0, seed: 207 },
      { type: 'tulip', x: -40, y: -10, rotation: -35, scale: 1.2, seed: 208 },
    ],
    styleMode: 'pastel',
  },
  {
    id: 'quiet-sympathy',
    name: 'Quiet Sympathy',
    description: 'Soft, gentle lily and baby\'s breath conveying warmth and peace.',
    flowers: [
      { type: 'filler', x: -40, y: -30, rotation: -25, scale: 1.2, seed: 301 },
      { type: 'filler', x: 40, y: -20, rotation: 35, scale: 1.1, seed: 302 },
      { type: 'filler', x: 0, y: 10, rotation: 0, scale: 1.0, seed: 303 },
      { type: 'lavender', x: -15, y: -70, rotation: -10, scale: 1.4, seed: 304 },
      { type: 'lavender', x: 20, y: -60, rotation: 15, scale: 1.3, seed: 305 },
      { type: 'daisy', x: -20, y: -10, rotation: -10, scale: 1.1, seed: 306 },
      { type: 'daisy', x: 30, y: 10, rotation: 20, scale: 0.9, seed: 307 },
      { type: 'lavender', x: -50, y: 20, rotation: -40, scale: 0.9, seed: 308 },
    ],
    styleMode: 'mono',
  }
];

export function getPremadeBouquet(id) {
  return PREMADE_BOUQUETS.find(b => b.id === id) || PREMADE_BOUQUETS[0];
}

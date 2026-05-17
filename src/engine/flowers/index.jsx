/**
 * Flower Catalog — 6 botanical PNG illustrations.
 * Each entry maps to a real PNG asset in /public/assets/flowers/.
 */
export const FLOWER_TYPES = {
  classic_red_rose: {
    name: 'Classic Red Rose',
    role: 'FOCAL',
    image: '/assets/flowers/classic_red_rose.png',
    dominantColor: 'red',
    description: 'Deep crimson petals, timeless romance',
    poetic: 'A love letter written in velvet.',
  },
  romantic_pink_peony: {
    name: 'Romantic Pink Peony',
    role: 'FOCAL',
    image: '/assets/flowers/romantic_pink_peony.png',
    dominantColor: 'pink',
    description: 'Lush, layered petals in soft blush',
    poetic: 'Abundance in every layer.',
  },
  vibrant_sunflower: {
    name: 'Vibrant Sunflower',
    role: 'FOCAL',
    image: '/assets/flowers/vibrant_sunflower.png',
    dominantColor: 'warm',
    description: 'Bright yellow petals, sun-kissed joy',
    poetic: 'Always turning toward the light.',
  },
  delicate_white_lily: {
    name: 'Delicate White Lily',
    role: 'FOUNDATION',
    image: '/assets/flowers/delicate_white_lily.png',
    dominantColor: 'white',
    description: 'Star-shaped petals, pure elegance',
    poetic: 'Quiet grace in every petal.',
  },
  textured_blue_hydrangea: {
    name: 'Textured Blue Hydrangea',
    role: 'FOUNDATION',
    image: '/assets/flowers/textured_blue_hydrangea.png',
    dominantColor: 'blue',
    description: 'Clusters of azure, rich and full',
    poetic: 'A cloud of color, softly gathered.',
  },
  cheerful_daisy: {
    name: 'Cheerful Daisy',
    role: 'FILLER',
    image: '/assets/flowers/cheerful_daisy.png',
    dominantColor: 'warm',
    description: 'White petals with a golden heart',
    poetic: 'Simple joy, honestly bloomed.',
  },
};

export default FLOWER_TYPES;

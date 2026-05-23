/**
 * Flower catalog.
 * - `image`: full botanical PNG — used in picker cards
 * - `headImage`: cropped head-only PNG — used in bouquet canvas
 * - `dominantColor`: used for ribbon color selection
 */
export const FLOWER_TYPES = {
  classic_red_rose: {
    name: 'Classic Red Rose',
    image: '/assets/flowers/classic_red_rose.png',
    headImage: '/assets/flowers/classic_red_rose_head.png',
    dominantColor: 'red',
    description: 'Deep crimson petals, timeless romance',
    poetic: 'A love letter written in velvet.',
  },
  romantic_pink_peony: {
    name: 'Romantic Pink Peony',
    image: '/assets/flowers/romantic_pink_peony.png',
    headImage: '/assets/flowers/romantic_pink_peony_head.png',
    dominantColor: 'pink',
    description: 'Lush, layered petals in soft blush',
    poetic: 'Abundance in every layer.',
  },
  vibrant_sunflower: {
    name: 'Vibrant Sunflower',
    image: '/assets/flowers/vibrant_sunflower.png',
    headImage: '/assets/flowers/vibrant_sunflower_head.png',
    dominantColor: 'warm',
    description: 'Bright yellow petals, sun-kissed joy',
    poetic: 'Always turning toward the light.',
  },
  delicate_white_lily: {
    name: 'Delicate White Lily',
    image: '/assets/flowers/delicate_white_lily.png',
    headImage: '/assets/flowers/delicate_white_lily_head.png',
    dominantColor: 'white',
    description: 'Star-shaped petals, pure elegance',
    poetic: 'Quiet grace in every petal.',
  },
  textured_blue_hydrangea: {
    name: 'Blue Hydrangea',
    image: '/assets/flowers/textured_blue_hydrangea.png',
    headImage: '/assets/flowers/textured_blue_hydrangea_head.png',
    dominantColor: 'blue',
    description: 'Clusters of azure, rich and full',
    poetic: 'A cloud of color, softly gathered.',
  },
  cheerful_daisy: {
    name: 'Cheerful Daisy',
    image: '/assets/flowers/cheerful_daisy.png',
    headImage: '/assets/flowers/cheerful_daisy_head.png',
    dominantColor: 'warm',
    description: 'White petals with a golden heart',
    poetic: 'Simple joy, honestly bloomed.',
  },
};

export default FLOWER_TYPES;

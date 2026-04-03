/**
 * Flower Catalog — 10 watercolor botanical illustrations.
 * All images use mix-blend-mode: multiply in BouquetCanvas so
 * white backgrounds become invisible when composited together.
 */
export const FLOWER_TYPES = {
  classic_red_rose: {
    name: 'Classic Red Rose',
    image: '/assets/flowers/classic_red_rose.png',
    dominantColor: 'red',
    description: 'Deep crimson petals, timeless romance',
    poetic: 'A love letter written in velvet.',
    stemHeight: 'tall',
  },
  romantic_pink_peony: {
    name: 'Romantic Pink Peony',
    image: '/assets/flowers/romantic_pink_peony.png',
    dominantColor: 'pink',
    description: 'Lush, layered petals in soft blush',
    poetic: 'Abundance in every layer.',
    stemHeight: 'medium',
  },
  vibrant_sunflower: {
    name: 'Vibrant Sunflower',
    image: '/assets/flowers/vibrant_sunflower.png',
    dominantColor: 'warm',
    description: 'Bright yellow petals, sun-kissed joy',
    poetic: 'Always turning toward the light.',
    stemHeight: 'tall',
  },
  delicate_white_lily: {
    name: 'Delicate White Lily',
    image: '/assets/flowers/delicate_white_lily.png',
    dominantColor: 'white',
    description: 'Star-shaped petals, pure elegance',
    poetic: 'Quiet grace in every petal.',
    stemHeight: 'tall',
  },
  textured_blue_hydrangea: {
    name: 'Textured Blue Hydrangea',
    image: '/assets/flowers/textured_blue_hydrangea.png',
    dominantColor: 'blue',
    description: 'Clusters of azure, rich and full',
    poetic: 'A cloud of color, softly gathered.',
    stemHeight: 'medium',
  },
  cheerful_daisy: {
    name: 'Cheerful Daisy',
    image: '/assets/flowers/cheerful_daisy.png',
    dominantColor: 'warm',
    description: 'White petals with a golden heart',
    poetic: 'Simple joy, honestly bloomed.',
    stemHeight: 'short',
  },
  soft_pink_tulip: {
    name: 'Soft Pink Tulip',
    image: '/assets/flowers/romantic_pink_peony.png', // reuse peony — same pink family
    dominantColor: 'pink',
    description: 'Sleek, cupped petals in tender pink',
    poetic: 'Spring, held in a single cup.',
    stemHeight: 'tall',
  },
  purple_lavender: {
    name: 'Purple Lavender',
    image: '/assets/flowers/textured_blue_hydrangea.png', // close blue-purple
    dominantColor: 'blue',
    description: 'Fragrant purple buds, calming grace',
    poetic: 'Breathe in — peace grows here.',
    stemHeight: 'short',
  },
  yellow_mimosa: {
    name: 'Yellow Mimosa',
    image: '/assets/flowers/vibrant_sunflower.png', // warm yellow family
    dominantColor: 'warm',
    description: 'Tiny golden spheres, delicate texture',
    poetic: 'Sunlight in its smallest form.',
    stemHeight: 'medium',
  },
  babys_breath: {
    name: "Baby's Breath",
    image: '/assets/flowers/delicate_white_lily.png', // soft white family
    dominantColor: 'white',
    description: 'Cloud-like tiny white clusters',
    poetic: 'The quiet space between blooms.',
    stemHeight: 'short',
  },
};

export default FLOWER_TYPES;

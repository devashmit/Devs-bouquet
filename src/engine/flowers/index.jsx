/**
 * Flower Catalog — 10 watercolor botanical illustrations.
 * Mapped into physical roles to structurally shape the bouquet dome.
 * All images use mix-blend-mode: multiply in BouquetCanvas.
 */
export const FLOWER_TYPES = {
  classic_red_rose: {
    name: 'Classic Red Rose',
    role: 'FOCAL',
    image: '/assets/flowers/classic_red_rose.png',
    description: 'Deep crimson petals, timeless romance',
    poetic: 'A love letter written in velvet.',
  },
  romantic_pink_peony: {
    name: 'Romantic Pink Peony',
    role: 'FOCAL',
    image: '/assets/flowers/romantic_pink_peony.png',
    description: 'Lush, layered petals in soft blush',
    poetic: 'Abundance in every layer.',
  },
  vibrant_sunflower: {
    name: 'Vibrant Sunflower',
    role: 'FOCAL',
    image: '/assets/flowers/vibrant_sunflower.png',
    description: 'Bright yellow petals, sun-kissed joy',
    poetic: 'Always turning toward the light.',
  },
  delicate_white_lily: {
    name: 'Delicate White Lily',
    role: 'FOUNDATION',
    image: '/assets/flowers/delicate_white_lily.png',
    description: 'Star-shaped petals, pure elegance',
    poetic: 'Quiet grace in every petal.',
  },
  textured_blue_hydrangea: {
    name: 'Textured Blue Hydrangea',
    role: 'FOUNDATION',
    image: '/assets/flowers/textured_blue_hydrangea.png',
    description: 'Clusters of azure, rich and full',
    poetic: 'A cloud of color, softly gathered.',
  },
  cheerful_daisy: {
    name: 'Cheerful Daisy',
    role: 'FILLER',
    image: '/assets/flowers/cheerful_daisy.png',
    description: 'White petals with a golden heart',
    poetic: 'Simple joy, honestly bloomed.',
  },
  soft_pink_tulip: {
    name: 'Soft Pink Tulip',
    role: 'FOUNDATION',
    image: '/assets/flowers/romantic_pink_peony.png', // reuse
    description: 'Sleek, cupped petals in tender pink',
    poetic: 'Spring, held in a single cup.',
  },
  purple_lavender: {
    name: 'Purple Lavender',
    role: 'LINE',
    image: '/assets/flowers/textured_blue_hydrangea.png', // reuse
    description: 'Fragrant purple buds, calming grace',
    poetic: 'Breathe in — peace grows here.',
  },
  yellow_mimosa: {
    name: 'Yellow Mimosa',
    role: 'FILLER',
    image: '/assets/flowers/vibrant_sunflower.png', // reuse
    description: 'Tiny golden spheres, delicate texture',
    poetic: 'Sunlight in its smallest form.',
  },
  babys_breath: {
    name: "Baby's Breath",
    role: 'FILLER',
    image: '/assets/flowers/delicate_white_lily.png', // reuse
    description: 'Cloud-like tiny white clusters',
    poetic: 'The quiet space between blooms.',
  },
};

export default FLOWER_TYPES;

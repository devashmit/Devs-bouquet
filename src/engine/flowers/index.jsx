import Rose from './Rose';
import Tulip from './Tulip';
import Daisy from './Daisy';
import Lily from './Lily';
import FillerLeaf from './FillerLeaf';
import Stem from './Stem';

/**
 * Flower registry — maps type strings to components.
 */
export const FLOWER_TYPES = {
  rose: {
    component: Rose,
    name: 'Rose',
    emoji: '🌹',
    description: 'Spiral core with layered petals',
  },
  tulip: {
    component: Tulip,
    name: 'Tulip',
    emoji: '🌷',
    description: 'Curved cupped shape with tilt',
  },
  daisy: {
    component: Daisy,
    name: 'Daisy',
    emoji: '🌼',
    description: 'Radial petals with center disc',
  },
  lily: {
    component: Lily,
    name: 'Lily',
    emoji: '⚜️',
    description: 'Elegant wide blossoms',
  },
  filler: {
    component: FillerLeaf,
    name: 'Filler Leaf',
    emoji: '🌿',
    description: 'Delicate baby\'s breath and soft leaves',
  },
};

/**
 * Get flower component by type string
 */
export function getFlowerComponent(type) {
  const entry = FLOWER_TYPES[type];
  return entry ? entry.component : Rose;
}

/**
 * Render a flower by type with given props
 */
export function renderFlower(type, props) {
  const Component = getFlowerComponent(type);
  return <Component {...props} />;
}

export { Rose, Tulip, Daisy, Lily as Lavender, Lily, FillerLeaf, Stem };
export default FLOWER_TYPES;

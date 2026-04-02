import Rose from './Rose';
import Tulip from './Tulip';
import Daisy from './Daisy';
import Lily from './Lily';
import Lavender from './Lavender';
import FillerLeaf from './FillerLeaf';
import Wildflower from './Wildflower';
import Stem from './Stem';

export const FLOWER_TYPES = {
  rose: {
    component: Rose,
    name: 'Rose',
    emoji: '🌹',
    description: 'Classic spiral rose',
  },
  tulip: {
    component: Tulip,
    name: 'Tulip',
    emoji: '🌷',
    description: 'Elegant cupped tulip',
  },
  daisy: {
    component: Daisy,
    name: 'Daisy',
    emoji: '🌼',
    description: 'White petals, yellow center',
  },
  lily: {
    component: Lily,
    name: 'Lily',
    emoji: '⚜️',
    description: 'Six-petal star lily',
  },
  lavender: {
    component: Lavender,
    name: 'Lavender',
    emoji: '💜',
    description: 'Purple lavender spikes',
  },
  filler: {
    component: FillerLeaf,
    name: 'Leaves',
    emoji: '🌿',
    description: 'Eucalyptus-style green leaves',
  },
  wildflower: {
    component: Wildflower,
    name: 'Wildflower',
    emoji: '🌾',
    description: 'Tiny yellow wildflower clusters',
  },
};

export function getFlowerComponent(type) {
  const entry = FLOWER_TYPES[type];
  return entry ? entry.component : Rose;
}

export function renderFlower(type, props) {
  const Component = getFlowerComponent(type);
  return <Component {...props} />;
}

export { Rose, Tulip, Daisy, Lily, Lavender, FillerLeaf, Wildflower, Stem };
export default FLOWER_TYPES;

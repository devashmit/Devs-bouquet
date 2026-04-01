import React from 'react';
import ImageFlower from './ImageFlower';

export default function FillerLeaf(props) {
  return <ImageFlower type="filler" width={190} height={190} offsetX={-95} offsetY={-130} clipHeight={190} {...props} />;
}

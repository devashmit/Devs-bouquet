import React from 'react';
import ImageFlower from './ImageFlower';

export default function FillerLeaf(props) {
  // Filler is taller and has branches, its crop height can be longer.
  return <ImageFlower type="filler" width={180} height={180} offsetX={-90} offsetY={-120} clipHeight={130} {...props} />;
}

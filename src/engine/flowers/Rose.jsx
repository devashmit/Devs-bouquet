import React from 'react';
import ImageFlower from './ImageFlower';

export default function Rose(props) {
  // Rose image is usually circular in the top half. 
  // We crop at height 100 to cut off its AI drawn stem.
  return <ImageFlower type="rose" width={160} height={160} offsetX={-80} offsetY={-100} clipHeight={100} {...props} />;
}

import React from 'react';
import ImageFlower from './ImageFlower';

export default function Lily(props) {
  return <ImageFlower type="lily" width={160} height={160} offsetX={-80} offsetY={-110} clipHeight={160} {...props} />;
}

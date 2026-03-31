import React from 'react';
import ImageFlower from './ImageFlower';

export default function Lily(props) {
  return <ImageFlower type="lily" width={150} height={150} offsetX={-75} offsetY={-100} clipHeight={110} {...props} />;
}

import React from 'react';
import ImageFlower from './ImageFlower';

export default function Tulip(props) {
  return <ImageFlower type="tulip" width={150} height={150} offsetX={-75} offsetY={-100} clipHeight={150} {...props} />;
}

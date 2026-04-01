import React from 'react';
import ImageFlower from './ImageFlower';

export default function Daisy(props) {
  return <ImageFlower type="daisy" width={150} height={150} offsetX={-75} offsetY={-100} clipHeight={150} {...props} />;
}

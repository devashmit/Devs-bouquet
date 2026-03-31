import React from 'react';
import ImageFlower from './ImageFlower';

export default function Daisy(props) {
  return <ImageFlower type="daisy" width={140} height={140} offsetX={-70} offsetY={-80} clipHeight={85} {...props} />;
}

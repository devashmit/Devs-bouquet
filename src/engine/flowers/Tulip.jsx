import React from 'react';
import ImageFlower from './ImageFlower';

export default function Tulip(props) {
  return <ImageFlower type="tulip" width={140} height={140} offsetX={-70} offsetY={-90} clipHeight={95} {...props} />;
}

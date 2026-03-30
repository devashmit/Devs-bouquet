import React from 'react';
import { motion } from 'framer-motion';
import { floatingPetalVariants } from '../engine/animations';

const petalShapes = [
  'M0,0 C5,-8 15,-8 12,0 C15,8 5,8 0,0 Z',
  'M0,0 C4,-10 14,-6 10,2 C12,10 2,8 0,0 Z',
  'M0,0 C6,-6 12,-4 10,2 C8,10 2,6 0,0 Z',
  'M0,0 C3,-12 13,-8 8,0 C13,6 3,10 0,0 Z',
];

const petalColors = [
  'rgba(244, 194, 194, 0.5)',
  'rgba(196, 183, 212, 0.4)',
  'rgba(178, 201, 171, 0.4)',
  'rgba(242, 167, 176, 0.45)',
  'rgba(245, 222, 179, 0.4)',
];

/**
 * FloatingPetals — decorative falling petals for backgrounds.
 */
export default function FloatingPetals({ count = 8 }) {
  const petals = Array.from({ length: count }, (_, i) => ({
    id: i,
    shape: petalShapes[i % petalShapes.length],
    color: petalColors[i % petalColors.length],
    left: `${(i * 13 + 5) % 95}%`,
    size: 10 + (i % 4) * 4,
    delay: i * 1.8,
  }));

  return (
    <div className="floating-petals-container" aria-hidden="true" style={{
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      {petals.map((petal) => (
        <motion.svg
          key={petal.id}
          width={petal.size}
          height={petal.size}
          viewBox="-2 -14 18 28"
          style={{
            position: 'absolute',
            left: petal.left,
            top: '-5%',
          }}
          custom={petal.id}
          animate="animate"
          variants={floatingPetalVariants}
        >
          <path
            d={petal.shape}
            fill={petal.color}
            stroke="none"
          />
        </motion.svg>
      ))}
    </div>
  );
}

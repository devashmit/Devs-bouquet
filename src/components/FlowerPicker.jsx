import React from 'react';
import { motion } from 'framer-motion';
import FLOWER_TYPES from '../engine/flowers';
import './FlowerPicker.css';

const CATALOG = Object.entries(FLOWER_TYPES).map(([key, val]) => ({ id: key, ...val }));

export default function FlowerPicker({ onAddFlower, selectedFlowers = [] }) {
  const total = selectedFlowers.length;

  const handleSelect = (flower) => {
    if (total >= 5) return; // max 5
    onAddFlower({ type: flower.id });
  };

  return (
    <div className="flower-picker">
      <div className="picker-label">
        <span>Choose your flowers</span>
        <span className="picker-count">{total} / 5</span>
      </div>

      <div className="picker-grid">
        {CATALOG.map((flower) => {
          const count = selectedFlowers.filter((f) => f.type === flower.id).length;
          const isSelected = count > 0;

          return (
            <motion.button
              key={flower.id}
              className={`picker-card${isSelected ? ' selected' : ''}`}
              onClick={() => handleSelect(flower)}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              title={flower.name}
            >
              <div className="picker-img-wrap">
                {/* Full botanical illustration for the card */}
                <img
                  src={flower.image}
                  alt={flower.name}
                  className="picker-img"
                  loading="lazy"
                />
                {isSelected && (
                  <motion.div
                    className="picker-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    {count}
                  </motion.div>
                )}
              </div>
              <div className="picker-info">
                <span className="picker-name">{flower.name}</span>
                <span className="picker-poetic">{flower.poetic}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FLOWER_TYPES from '../engine/flowers';
import './FlowerPicker.css';

const CATALOG = Object.entries(FLOWER_TYPES).map(([key, val]) => ({
  id: key,
  ...val,
}));

export default function FlowerPicker({ onAddFlower, selectedFlowers = [] }) {
  const selectedIds = selectedFlowers.map(f => f.type);

  const handleSelect = (flower) => {
    onAddFlower({ type: flower.id });
  };

  return (
    <div className="flower-picker">
      <div className="picker-label">
        Choose your flowers
        <span className="picker-count">{selectedFlowers.length}/10</span>
      </div>
      <div className="picker-grid">
        {CATALOG.map((flower) => {
          const isSelected = selectedIds.includes(flower.id);
          const count = selectedIds.filter(id => id === flower.id).length;

          return (
            <motion.button
              key={flower.id}
              className={`picker-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(flower)}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              title={flower.name}
            >
              <div className="picker-img-wrap">
                <img
                  src={flower.image}
                  alt={flower.name}
                  className="picker-img"
                  style={{ mixBlendMode: 'multiply' }}
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

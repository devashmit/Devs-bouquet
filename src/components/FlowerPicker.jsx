import React from 'react';
import { motion } from 'framer-motion';
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
        <span className="picker-count">{selectedFlowers.length} selected</span>
      </div>
      <div className="picker-grid">
        {CATALOG.map((flower) => {
          const isSelected = selectedIds.includes(flower.id);
          const count = selectedIds.filter(id => id === flower.id).length;
          
          // Role badge color mapping
          let badgeColor = 'var(--charcoal)';
          let badgeBg = 'var(--cream-dark)';
          if (flower.role === 'FOCAL') {
            badgeColor = 'var(--rose-deep)';
            badgeBg = 'var(--rose-tint)';
          } else if (flower.role === 'FOUNDATION') {
            badgeColor = '#c27b4e';
            badgeBg = '#fdece3';
          } else if (flower.role === 'FILLER') {
            badgeColor = '#6c7a89';
            badgeBg = '#e8ecf1';
          } else if (flower.role === 'LINE') {
            badgeColor = '#6d5a88';
            badgeBg = '#e9e3f4';
          } else if (flower.role === 'FLOATER') {
            badgeColor = '#4a90e2';
            badgeBg = '#e1f0ff';
          } else if (flower.role === 'FOLIAGE') {
            badgeColor = '#3d5c2a';
            badgeBg = '#eaf2e6';
          }

          const imageUrl = flower.image;

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
                  src={imageUrl} 
                  alt={flower.name} 
                  className="picker-img" 
                  style={{ width: '80%', height: '80%', objectFit: 'contain', mixBlendMode: 'darken' }} 
                />
                {isSelected && (
                  <motion.div
                    className="picker-badge-count"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    {count}
                  </motion.div>
                )}
                <div 
                  className="picker-role-badge" 
                  style={{ color: badgeColor, backgroundColor: badgeBg }}
                >
                  {flower.role}
                </div>
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

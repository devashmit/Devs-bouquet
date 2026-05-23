import React from 'react';
import { motion } from 'framer-motion';
import GREENERY_CATALOG from '../engine/greenery';
import './GreeneryPicker.css';

const CATEGORIES = ['Structural', 'Soft Filler', 'Texture', 'Accent'];

const CATALOG = Object.entries(GREENERY_CATALOG).map(([key, val]) => ({ id: key, ...val }));

export default function GreeneryPicker({ selected, onSelect }) {
  return (
    <div className="greenery-picker">
      {CATEGORIES.map(cat => {
        const items = CATALOG.filter(g => g.category === cat);
        return (
          <div key={cat} className="greenery-category">
            <p className="greenery-cat-label">{cat}</p>
            <div className="greenery-grid">
              {items.map(g => {
                const GComp = g.component;
                const isSelected = selected === g.id;
                return (
                  <motion.button
                    key={g.id}
                    className={`greenery-card${isSelected ? ' selected' : ''}`}
                    onClick={() => onSelect(g.id)}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <div className="greenery-img-wrap">
                      <GComp size={80} />
                    </div>
                    <span className="greenery-name">{g.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

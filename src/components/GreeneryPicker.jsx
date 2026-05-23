import React from 'react';
import { motion } from 'framer-motion';
import GREENERY_TYPES from '../engine/greenery';
import './GreeneryPicker.css';

const CATALOG = Object.entries(GREENERY_TYPES).map(([key, val]) => ({ id: key, ...val }));

export default function GreeneryPicker({ selected, onSelect }) {
  return (
    <div className="greenery-picker">
      <div className="greenery-grid">
        {CATALOG.map((g) => {
          const GreeneryComponent = g.component;
          const isSelected = selected === g.id;

          return (
            <motion.button
              key={g.id}
              className={`greenery-card${isSelected ? ' selected' : ''}`}
              onClick={() => onSelect(g.id)}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="greenery-img-wrap">
                <GreeneryComponent size={100} />
              </div>
              <span className="greenery-name">{g.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

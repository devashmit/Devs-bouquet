import React, { useState } from 'react';
import FLOWER_TYPES from '../engine/flowers';
import BouquetComposer from '../engine/BouquetComposer';
import './FlowerPicker.css';

/**
 * FlowerPicker — visual grid of flower types.
 * Click to add a flower to the bouquet.
 */
export default function FlowerPicker({ onAddFlower, styleMode = 'sketch' }) {
  const [hoveredType, setHoveredType] = useState(null);
  const types = Object.entries(FLOWER_TYPES);

  const handleAdd = (type) => {
    const flower = {
      type,
      seed: Math.floor(Math.random() * 100000),
      scale: 1,
      rotation: Math.random() * 30 - 15,
      petalVariance: 0.25 + Math.random() * 0.2,
      roughness: 1.2 + Math.random() * 0.8,
      strokeWidth: 1.2 + Math.random() * 0.6,
      color: null, // use style defaults
    };
    onAddFlower(flower);
  };

  return (
    <div className="flower-picker" id="flower-picker">
      <label className="picker-label">Choose your flowers</label>
      <div className="picker-grid">
        {types.map(([key, info]) => (
          <button
            key={key}
            className={`picker-card ${hoveredType === key ? 'hovered' : ''}`}
            onClick={() => handleAdd(key)}
            onMouseEnter={() => setHoveredType(key)}
            onMouseLeave={() => setHoveredType(null)}
            id={`pick-${key}`}
            title={`Add ${info.name}`}
          >
            <div className="picker-preview">
              <BouquetComposer
                flowers={[{ type: key, seed: 777 + key.charCodeAt(0), scale: 1, petalVariance: 0.3 }]}
                styleMode={styleMode}
                width={80}
                height={100}
                showRibbon={false}
                seed={key.charCodeAt(0) * 7}
              />
            </div>
            <span className="picker-name">{info.name}</span>
            <span className="picker-desc">{info.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

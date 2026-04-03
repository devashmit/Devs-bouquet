import React from 'react';
import { PREMADE_BOUQUETS } from '../engine/premade';
import AIBouquetViewer from './AIBouquetViewer';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../engine/animations';
import './PremadeGallery.css';

export default function PremadeGallery({ selectedId, onSelect }) {
  return (
    <div className="premade-gallery">
      <div className="gallery-header">
        <h3>Curated Collections</h3>
        <p className="subtext">Select a pre-arranged composition to start.</p>
      </div>

      <motion.div 
        className="gallery-grid"
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
      >
        {PREMADE_BOUQUETS.map(bouquet => (
          <motion.div 
            key={bouquet.id} 
            variants={fadeInUp}
            className={`gallery-card card ${selectedId === bouquet.id ? 'active' : ''}`}
            onClick={() => onSelect(bouquet.id, bouquet.flowers, bouquet.styleMode)}
          >
             <div className="gallery-preview">
                <AIBouquetViewer flowers={bouquet.flowers} />
             </div>
             <div className="gallery-info">
                 <h4>{bouquet.name}</h4>
                 <p>{bouquet.description}</p>
                 <span className="badge badge-rose">{bouquet.flowers.length} flowers</span>
             </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

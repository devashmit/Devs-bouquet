import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BouquetCanvas from './BouquetCanvas';
import './AIBouquetViewer.css';

/**
 * AIBouquetViewer — Wraps BouquetCanvas routing exclusively to the new Template Engine.
 * Ensures strict compliance with the new compositing architecture.
 */
export default function AIBouquetViewer({ flowers = [] }) {
  return (
    <div className="ai-bouquet-viewer" id="ai-bouquet-viewer">
      <AnimatePresence mode="wait">
        <motion.div
          key="template-canvas"
          style={{ width: '100%', height: '100%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <BouquetCanvas flowers={flowers} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

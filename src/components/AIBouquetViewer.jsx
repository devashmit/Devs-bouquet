import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BouquetCanvas from './BouquetCanvas';
import './AIBouquetViewer.css';

/**
 * AIBouquetViewer — wraps BouquetCanvas with a clean API.
 * Real-time compositing: no AI call needed for the live preview.
 * When a real OpenAI key is present, BouquetCanvas can be swapped
 * for the AI-generated result after generation completes.
 */
export default function AIBouquetViewer({ flowers = [] }) {
  return (
    <div className="ai-bouquet-viewer" id="ai-bouquet-viewer">
      <AnimatePresence mode="wait">
        <motion.div
          key="canvas"
          style={{ width: '100%', height: '100%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <BouquetCanvas flowers={flowers} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

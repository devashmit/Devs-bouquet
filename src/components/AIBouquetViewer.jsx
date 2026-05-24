import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BouquetCanvas from './BouquetCanvas';
import './AIBouquetViewer.css';

export default function AIBouquetViewer({ flowers = [], greenery = 'eucalyptus' }) {
  return (
    <div className="ai-bouquet-viewer" id="ai-bouquet-viewer">
      <AnimatePresence mode="wait">
        {flowers.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="bouquet-empty">
            <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
              <circle cx="28" cy="30" r="14" stroke="#e8c8d0" strokeWidth="1.5" strokeDasharray="5 3" fill="none"/>
              <circle cx="52" cy="24" r="12" stroke="#d8c8e8" strokeWidth="1.5" strokeDasharray="5 3" fill="none"/>
              <circle cx="40" cy="18" r="10" stroke="#c8d8c8" strokeWidth="1.5" strokeDasharray="5 3" fill="none"/>
              <line x1="40" y1="55" x2="40" y2="88" stroke="#c8d4c0" strokeWidth="2" strokeDasharray="4 3"/>
            </svg>
            <p>Pick flowers on the left<br/>to build your bouquet</p>
          </motion.div>
        ) : (
          <motion.div key="canvas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }} style={{ width: '100%', height: '100%' }}>
            <BouquetCanvas flowers={flowers} greenery={greenery} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

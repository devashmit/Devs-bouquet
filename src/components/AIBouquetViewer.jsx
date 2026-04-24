import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BouquetCanvas from './BouquetCanvas';
import { generateBouquetImage, getRibbonColor } from '../services/aiImageService';
import './AIBouquetViewer.css';

/**
 * AIBouquetViewer — Intelligent two-layer bouquet renderer.
 *
 * UX strategy:
 *  1. The SVG compositor (MockBouquetComposite) renders IMMEDIATELY — zero wait.
 *  2. AI generation (Pollinations / OpenAI) runs silently in the background.
 *  3. When the AI image finishes loading it fades in over the SVG layer.
 *  4. If AI fails for any reason, the SVG compositor remains — no error visible.
 *
 * This gives users an instant, beautiful preview that can optionally upgrade
 * to a photorealistic AI rendering.
 */
export default function AIBouquetViewer({ flowers = [] }) {
  // Client-side SVG compositing only.
  // The AI-generation-based flow has been deprecated in favor of a 
  // premium, real-time client-side compositing engine.

  return (
    <div
      className="ai-bouquet-viewer"
      id="ai-bouquet-viewer"
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {/* ── Real-time Compositor ── */}
      {flowers.length > 0 && (
        <BouquetCanvas flowers={flowers} />
      )}

      {flowers.length === 0 && (
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '0.75rem',
          background: '#FAF8F5',
          borderRadius: '1rem',
        }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <path
              d="M28 8C18 3 8 13 16 23 20 28 27 34 28 40 29 34 36 28 40 23 48 13 38 3 28 8Z"
              stroke="#d4a4ae" strokeWidth="1.5" strokeDasharray="5 3" fill="none"
            />
            <line x1="28" y1="40" x2="28" y2="52"
              stroke="#d4a4ae" strokeWidth="1.5" strokeDasharray="4 3" />
          </svg>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '1rem', color: '#a38a90',
            textAlign: 'center', lineHeight: 1.65, margin: 0,
          }}>
            Choose flowers to compose your bouquet
          </p>
        </div>
      )}

    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FLOWER_TYPES from '../engine/flowers';
import './AIBouquetViewer.css';

/**
 * AIBouquetViewer
 *
 * When the user selects flowers, this component:
 * 1. Builds a detailed watercolor bouquet prompt from the selected flowers
 * 2. Calls Pollinations AI (free, no API key) to generate a real bouquet image
 * 3. Shows a beautiful loading skeleton while generating
 * 4. Fades in the generated image when ready
 *
 * Debounces 1.2s after the last flower change before triggering generation,
 * so rapid selections don't spam the API.
 */

function buildPrompt(flowers) {
  if (!flowers.length) return '';

  // Count unique flower types
  const counts = {};
  flowers.forEach(f => {
    const name = FLOWER_TYPES[f.type]?.name || f.type;
    counts[name] = (counts[name] || 0) + 1;
  });

  const parts = Object.entries(counts).map(([name, count]) =>
    count > 1 ? `${count} ${name}s` : name
  );

  let flowerList;
  if (parts.length === 1) flowerList = parts[0];
  else if (parts.length === 2) flowerList = `${parts[0]} and ${parts[1]}`;
  else flowerList = `${parts.slice(0, -1).join(', ')}, and ${parts[parts.length - 1]}`;

  // Determine ribbon color from dominant flower colors
  const colorCounts = { pink: 0, warm: 0, blue: 0, white: 0 };
  flowers.forEach(f => {
    const c = FLOWER_TYPES[f.type]?.dominantColor;
    if (c === 'pink' || c === 'red') colorCounts.pink++;
    else if (c === 'warm') colorCounts.warm++;
    else if (c === 'blue') colorCounts.blue++;
    else colorCounts.white++;
  });
  const maxColor = Object.entries(colorCounts).sort((a, b) => b[1] - a[1])[0][0];
  const ribbonColor = { pink: 'blush pink', warm: 'champagne', blue: 'lavender', white: 'ivory' }[maxColor];

  return (
    `A beautiful hand-tied florist bouquet of ${flowerList}, ` +
    `professional watercolor botanical illustration style, ` +
    `flowers arranged in a natural rounded dome shape, stems gathered and tied with a ${ribbonColor} satin ribbon bow, ` +
    `lush green foliage and leaves filling the gaps, ` +
    `soft pastel watercolor washes, delicate ink linework, ` +
    `warm off-white paper background, centered composition, ` +
    `elegant romantic botanical art, high detail, masterpiece`
  );
}

function LoadingSkeleton() {
  return (
    <div className="bouquet-skeleton">
      <div className="skeleton-petals">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="skeleton-petal"
            style={{ '--i': i }}
          />
        ))}
      </div>
      <div className="skeleton-stem" />
      <div className="skeleton-bow" />
      <p className="skeleton-text">Arranging your bouquet…</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bouquet-empty">
      <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
        <circle cx="28" cy="30" r="14" stroke="#e8c8d0" strokeWidth="1.5" strokeDasharray="5 3" fill="none" />
        <circle cx="52" cy="24" r="12" stroke="#d8c8e8" strokeWidth="1.5" strokeDasharray="5 3" fill="none" />
        <circle cx="40" cy="18" r="10" stroke="#c8d8c8" strokeWidth="1.5" strokeDasharray="5 3" fill="none" />
        <line x1="40" y1="55" x2="40" y2="88" stroke="#c8d4c0" strokeWidth="2" strokeDasharray="4 3" />
        <path d="M32 72 Q40 68 48 72" stroke="#d4a4ae" strokeWidth="1.5" fill="none" />
      </svg>
      <p>Pick flowers on the left<br />to build your bouquet</p>
    </div>
  );
}

export default function AIBouquetViewer({ flowers = [] }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const debounceRef = useRef(null);
  const currentPromptRef = useRef('');

  useEffect(() => {
    if (flowers.length === 0) {
      setImageUrl(null);
      setLoading(false);
      setError(false);
      return;
    }

    // Debounce — wait 1.2s after last change before generating
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const prompt = buildPrompt(flowers);
      if (prompt === currentPromptRef.current) return; // same flowers, skip
      currentPromptRef.current = prompt;

      setLoading(true);
      setError(false);

      try {
        const seed = flowers.map(f => f.type).join('-').length * 137 + flowers.length * 31;
        const encodedPrompt = encodeURIComponent(prompt);
        const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=768&height=768&nologo=true&seed=${seed}&model=flux`;

        // Pre-load the image before showing it
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = url;
        });

        setImageUrl(url);
      } catch (err) {
        console.error('Bouquet generation failed:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }, 1200);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [flowers]);

  return (
    <div className="ai-bouquet-viewer" id="ai-bouquet-viewer">
      <AnimatePresence mode="wait">
        {flowers.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', height: '100%' }}
          >
            <EmptyState />
          </motion.div>
        )}

        {flowers.length > 0 && loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', height: '100%' }}
          >
            <LoadingSkeleton />
          </motion.div>
        )}

        {flowers.length > 0 && !loading && imageUrl && (
          <motion.div
            key={imageUrl}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ width: '100%', height: '100%' }}
          >
            <img
              src={imageUrl}
              alt="Your bouquet"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '1rem',
                display: 'block',
              }}
            />
          </motion.div>
        )}

        {flowers.length > 0 && !loading && error && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', height: '100%' }}
          >
            <div className="bouquet-error">
              <span>🌸</span>
              <p>Couldn't generate bouquet.<br />Check your connection and try again.</p>
              <button
                onClick={() => {
                  currentPromptRef.current = '';
                  setError(false);
                  setLoading(true);
                  // re-trigger by resetting
                  const prompt = buildPrompt(flowers);
                  const seed = Date.now();
                  const encodedPrompt = encodeURIComponent(prompt);
                  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=768&height=768&nologo=true&seed=${seed}&model=flux`;
                  const img = new Image();
                  img.onload = () => { setImageUrl(url); setLoading(false); };
                  img.onerror = () => { setError(true); setLoading(false); };
                  img.src = url;
                }}
                style={{
                  marginTop: '0.75rem',
                  padding: '0.5rem 1.25rem',
                  background: 'var(--rose-blush, #e8a0b0)',
                  border: 'none',
                  borderRadius: '2rem',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

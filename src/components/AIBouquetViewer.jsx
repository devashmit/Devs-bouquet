import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BouquetCanvas from './BouquetCanvas';
import MockBouquetComposite from './MockBouquetComposite';
import { generateBouquetImage } from '../services/aiImageService';
import './AIBouquetViewer.css';

/**
 * AIBouquetViewer — The primary intelligent bouquet renderer.
 * 
 * If OpenAI API is configured in .env, it generates a hyper-realistic, cohesive
 * watercolor painting of the chosen flowers. Otherwise, it gracefully falls back
 * to the SVG Template Compositor.
 */
export default function AIBouquetViewer({ flowers = [] }) {
  const [aiImage, setAiImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [longWait, setLongWait] = useState(false); // Triggers if API backend queue is slow

  useEffect(() => {
    if (flowers.length === 0) {
      setAiImage(null);
      setIsImageLoaded(false);
      setLongWait(false);
      return;
    }

    let active = true;
    let waitTimer;
    
    const generate = async () => {
      setIsGenerating(true);
      setIsImageLoaded(false);
      setLongWait(false);
      setError(null);

      // Trigger "This is taking a while" message if Pollinations backend is heavily loaded (after 8s)
      waitTimer = setTimeout(() => {
        if (active) setLongWait(true);
      }, 8000);

      try {
        const url = await generateBouquetImage(flowers);
        if (active && url && url !== "MOCK_COMPOSITE") {
          setAiImage(url); // Mounts the <img src>, which then begins downloading the blob async
        } else if (active && url === "MOCK_COMPOSITE") {
          setAiImage(null);
          setIsGenerating(false);
        }
      } catch (err) {
        console.error("AI Gen Failed:", err);
        if (active) {
          setError("Failed to generate AI image. Ensure API key is valid.");
          setAiImage(null); // Fallback securely
          setIsGenerating(false);
        }
      }
    };

    // Debounce generation slightly
    const timer = setTimeout(() => generate(), 800);

    return () => {
      active = false;
      clearTimeout(timer);
      clearTimeout(waitTimer);
    };
  }, [flowers]);

  return (
    <div className="ai-bouquet-viewer" id="ai-bouquet-viewer">
      <AnimatePresence mode="wait">
        
        {isGenerating && (
          <motion.div
            key="loading-ai"
            className="ai-loading-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute', inset: 0, zIndex: 50,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              backgroundColor: 'rgba(250, 248, 245, 0.95)', backdropFilter: 'blur(8px)'
            }}
          >
            <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid #e8829a', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1.2s linear infinite' }} />
            <p style={{ marginTop: '1rem', fontFamily: 'Georgia', color: '#8b7355', fontSize: '1.2rem' }}>
              Intelligently painting your arrangement...
            </p>
            <p style={{ marginTop: '0.25rem', fontFamily: 'Inter', color: '#a39180', fontSize: '0.9rem' }}>
              Generating true AI watercolor masterpiece...
            </p>
            {longWait && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ marginTop: '1rem', fontFamily: 'Inter', color: '#e8829a', fontSize: '0.85rem', fontWeight: 500, maxWidth: '80%', textAlign: 'center' }}
              >
                The free AI server is currently experiencing high load. Painting may take up to 30 seconds to transmit...
              </motion.p>
            )}
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </motion.div>
        )}

        {aiImage ? (
          <motion.div
            key={`ai-rendered-${aiImage}`}
            style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '1rem', opacity: isImageLoaded ? 1 : 0 }}
            initial={{ scale: 0.95 }}
            animate={{ scale: isImageLoaded ? 1 : 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={aiImage} 
              alt="AI Generated Bouquet" 
              onLoad={() => {
                setIsImageLoaded(true);
                setIsGenerating(false); // Valid blob received, kill loader!
              }}
              onError={(e) => {
                console.error("Critical Image Load Failure: API returned corrupted or 404 blob.");
                // Immediately abort to DOM compositor fallback
                setAiImage(null); 
                setIsGenerating(false);
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </motion.div>
        ) : (
          !isGenerating && (
            <motion.div
              key="template-canvas"
              style={{ width: '100%', height: '100%', position: 'relative' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <MockBouquetComposite flowers={flowers} ribbonColor="blush" />
            </motion.div>
          )
        )}

      </AnimatePresence>
    </div>
  );
}

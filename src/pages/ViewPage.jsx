import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BouquetComposer from '../engine/BouquetComposer';
import ReactionBar from '../components/ReactionBar';
import { getBouquet, markBouquetViewed, updateBouquetReaction } from '../firebase/bouquets';
import { exportBouquetAsPNG } from '../utils/export';
import {
  bouquetContainerVariants,
  flowerGroupVariants,
  flowerVariants,
  messageVariants,
  pageVariants,
} from '../engine/animations';
import './ViewPage.css';

export default function ViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bouquet, setBouquet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const bouquetRef = useRef(null);

  useEffect(() => {
    async function fetchBouquet() {
      if (!id) {
        setError('No bouquet ID provided');
        setLoading(false);
        return;
      }

      try {
        const data = await getBouquet(id);
        if (!data) {
          setError('This bouquet could not be found. It may have wilted away...');
        } else {
          setBouquet(data);
          // Mark as viewed
          if (!data.viewed) {
            await markBouquetViewed(id);
          }
        }
      } catch (err) {
        console.error('Error loading bouquet:', err);
        setError('Something went wrong while opening this bouquet.');
      } finally {
        setLoading(false);
      }
    }

    fetchBouquet();
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReact = async (emoji) => {
    if (id) {
      await updateBouquetReaction(id, emoji);
      setBouquet(prev => prev ? { ...prev, reaction: emoji } : prev);
    }
  };

  const handleSendBack = () => {
    navigate('/create', { state: { replyTo: bouquet?.from } });
  };

  const handleExport = () => {
    if (bouquetRef.current) {
      exportBouquetAsPNG(bouquetRef.current, `bouquet-for-${bouquet?.to || 'you'}`);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="view-page">
        <div className="loading-screen">
          <div className="loading-petal"></div>
          <p className="tagline">Unfolding petals...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="view-page">
        <div className="view-error">
          <svg width="60" height="60" viewBox="0 0 60 60" style={{ opacity: 0.3 }}>
            <path d="M30 10 C20 5, 10 15, 18 25 C22 30, 28 34, 30 38 C32 34, 38 30, 42 25 C50 15, 40 5, 30 10Z" fill="none" stroke="var(--charcoal-faint)" strokeWidth="1.5" strokeDasharray="4 3"/>
            <line x1="30" y1="38" x2="30" y2="55" stroke="var(--charcoal-faint)" strokeWidth="1.5" strokeDasharray="4 3"/>
          </svg>
          <h2>Oh no...</h2>
          <p className="tagline">{error}</p>
          <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="view-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="view-content container">
        <motion.p
          className="view-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          A bouquet, gently drawn for the heart it reaches.
        </motion.p>

        {bouquet.to && (
          <motion.h2
            className="view-recipient"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            For {bouquet.to}
          </motion.h2>
        )}

        {/* Bouquet Display */}
        <motion.div
          className="view-bouquet"
          ref={bouquetRef}
          variants={bouquetContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={flowerGroupVariants}>
            <motion.div variants={flowerVariants}>
              <BouquetComposer
                flowers={bouquet.flowers || []}
                styleMode={bouquet.styleMode || 'sketch'}
                width={400}
                height={500}
                seed={bouquet.seed || 42}
                showRibbon={(bouquet.flowers?.length || 0) >= 2}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Message */}
        {bouquet.message && (
          <motion.div
            className="view-message"
            variants={messageVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="message-text">"{bouquet.message}"</p>
            {bouquet.from && <p className="message-from">— {bouquet.from}</p>}
          </motion.div>
        )}

        <motion.p
          className="subtext"
          style={{ textAlign: 'center', marginTop: '0.5rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
        >
          Drawn softly. Sent meaningfully.
        </motion.p>

        {/* Reaction */}
        <motion.div
          className="view-reactions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5 }}
        >
          <ReactionBar
            currentReaction={bouquet.reaction}
            onReact={handleReact}
          />
        </motion.div>

        {/* Actions */}
        <motion.div
          className="view-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.5 }}
        >
          <button className="btn btn-primary" onClick={handleSendBack} id="view-send-back">
            ✿ Send One Back
          </button>
          <button className="btn btn-secondary" onClick={handleCopyLink} id="view-copy-link">
            {copied ? '✓ Copied!' : '🔗 Copy Link'}
          </button>
          <button className="btn btn-soft" onClick={handleExport} id="view-save">
            📸 Save Image
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

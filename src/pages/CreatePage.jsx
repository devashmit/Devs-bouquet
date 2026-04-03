import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import AIBouquetViewer from '../components/AIBouquetViewer';
import FlowerPicker from '../components/FlowerPicker';
import { createBouquet } from '../firebase/bouquets';
import { pageVariants } from '../engine/animations';
import './CreatePage.css';

const OCCASIONS = [
  { key: 'birthday', label: '🎂 Birthday' },
  { key: 'thank-you', label: '🙏 Thank You' },
  { key: 'love', label: '❤️ Love' },
  { key: 'sympathy', label: '🤍 Sympathy' },
  { key: 'congrats', label: '🎉 Congrats' },
  { key: 'just-because', label: '✿ Just Because' },
];

export default function CreatePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const bouquetRef = useRef(null);

  const [flowers, setFlowers] = useState([]);
  const [to, setTo] = useState('');
  const [from, setFrom] = useState(user?.displayName || '');
  const [message, setMessage] = useState('');
  const [occasion, setOccasion] = useState('just-because');
  const [isPublic, setIsPublic] = useState(true);
  const [saving, setSaving] = useState(false);
  const [bouquetSeed] = useState(() => Math.floor(Math.random() * 100000));

  const handleAddFlower = (flower) => {
    if (flowers.length >= 10) return; // Limit to 10 for AI prompt quality
    setFlowers((prev) => [...prev, flower]);
  };

  const handleRemoveFlower = (index) => {
    setFlowers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if (!flowers.length) return;
    setSaving(true);

    try {
      const id = await createBouquet(user?.uid || 'demo', {
        to,
        from: from || user?.displayName || 'Anonymous',
        message,
        occasion,
        flowers,
        isPublic,
        seed: bouquetSeed,
      });
      navigate(`/view/${id}`);
    } catch (err) {
      console.error('Error creating bouquet:', err);
      alert('Failed to create bouquet. Please try again.');
    } finally {
      setSaving(false);
    }
  };


  return (
    <motion.div
      className="create-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="create-layout container">
        {/* Left Panel — Controls */}
        <div className="create-panel create-controls">
          <div className="panel-header">
            <h2>Draw a Bouquet</h2>
            <p className="tagline">Every petal drawn with a reason.</p>
          </div>

          <FlowerPicker
            onAddFlower={handleAddFlower}
            selectedFlowers={flowers}
          />

          {flowers.length > 0 && (
            <div className="selected-flowers">
              <div className="flower-chips">
                {flowers.map((f, i) => (
                  <span key={i} className="flower-chip">
                    {f.type.replace(/_/g, ' ')}
                    <button
                      className="chip-remove"
                      onClick={() => handleRemoveFlower(i)}
                      title="Remove"
                    >×</button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="create-form">
            <div className="input-group">
              <label htmlFor="create-to">To</label>
              <input
                id="create-to"
                type="text"
                className="input-field"
                placeholder="Who is this for?"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="create-from">From</label>
              <input
                id="create-from"
                type="text"
                className="input-field"
                placeholder="Your name"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="create-message">Message</label>
              <textarea
                id="create-message"
                className="input-field"
                placeholder="Say what words cannot..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>

            <div className="input-group">
              <label>Occasion</label>
              <div className="occasion-grid">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ.key}
                    className={`occasion-chip ${occasion === occ.key ? 'active' : ''}`}
                    onClick={() => setOccasion(occ.key)}
                    id={`occasion-${occ.key}`}
                  >
                    {occ.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="checkbox-wrap">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                id="create-public"
              />
              <span>Show in the Garden (public)</span>
            </label>
          </div>

          <div className="create-actions">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleSend}
              disabled={flowers.length < 1 || saving}
              id="create-send"
              style={{ width: '100%' }}
            >
              {saving ? 'Saving your bouquet…' : flowers.length < 1 ? 'Add a flower first' : '✿ Send Bouquet'}
            </button>
          </div>
        </div>

        {/* Right Panel — Preview */}
        <div className="create-panel create-preview">
          <div className="preview-label">
            <span>Live Preview</span>
            {flowers.length < 1 && <span className="subtext" style={{ color: 'var(--rose-deep)' }}>Add your first flower to begin...</span>}
          </div>
          <div className="preview-canvas" ref={bouquetRef}>
            <AIBouquetViewer flowers={flowers} />
          </div>

          {(to || message) && flowers.length > 0 && (
            <div className="preview-message">
              {to && <p className="preview-to">For <strong>{to}</strong></p>}
              {message && <p className="preview-msg">"{message}"</p>}
              {from && <p className="preview-from">— {from}</p>}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

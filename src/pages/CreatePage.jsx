import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import BouquetComposer from '../engine/BouquetComposer';
import FlowerPicker from '../components/FlowerPicker';
import StyleToggle from '../components/StyleToggle';
import { createBouquet } from '../firebase/bouquets';
import { exportBouquetAsPNG } from '../utils/export';
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
  const [styleMode, setStyleMode] = useState('sketch');
  const [to, setTo] = useState('');
  const [from, setFrom] = useState(user?.displayName || '');
  const [message, setMessage] = useState('');
  const [occasion, setOccasion] = useState('just-because');
  const [isPublic, setIsPublic] = useState(true);
  const [saving, setSaving] = useState(false);
  const [bouquetSeed] = useState(() => Math.floor(Math.random() * 100000));

  const handleAddFlower = (flower) => {
    if (flowers.length >= 8) return;
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
        styleMode,
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

  const handleExport = () => {
    const el = bouquetRef.current;
    if (el) exportBouquetAsPNG(el, `bouquet-for-${to || 'someone'}`);
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

          <FlowerPicker onAddFlower={handleAddFlower} styleMode={styleMode} />

          {flowers.length > 0 && (
            <div className="selected-flowers">
              <label className="picker-label">
                Your flowers ({flowers.length}/8)
              </label>
              <div className="flower-chips">
                {flowers.map((f, i) => (
                  <span key={i} className="flower-chip">
                    {f.type}
                    <button
                      className="chip-remove"
                      onClick={() => handleRemoveFlower(i)}
                      title="Remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <StyleToggle value={styleMode} onChange={setStyleMode} />

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
              disabled={!flowers.length || saving}
              id="create-send"
              style={{ width: '100%' }}
            >
              {saving ? 'Drawing...' : '✿ Send Bouquet'}
            </button>
            {flowers.length > 0 && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleExport}
                id="create-export"
                style={{ width: '100%' }}
              >
                Save as Image
              </button>
            )}
          </div>
        </div>

        {/* Right Panel — Preview */}
        <div className="create-panel create-preview">
          <div className="preview-label">
            <span>Live Preview</span>
            {!flowers.length && <span className="subtext">Add flowers to begin...</span>}
          </div>
          <div className="preview-canvas" ref={bouquetRef}>
            {flowers.length > 0 ? (
              <BouquetComposer
                flowers={flowers}
                styleMode={styleMode}
                width={400}
                height={500}
                seed={bouquetSeed}
                showRibbon={flowers.length >= 2}
              />
            ) : (
              <div className="preview-empty">
                <svg width="80" height="100" viewBox="0 0 80 100" style={{ opacity: 0.2 }}>
                  <path d="M40 20 C25 10, 10 25, 25 40 C30 46, 37 50, 40 55 C43 50, 50 46, 55 40 C70 25, 55 10, 40 20Z" fill="none" stroke="var(--charcoal-faint)" strokeWidth="1" strokeDasharray="3 3"/>
                  <line x1="40" y1="55" x2="40" y2="90" stroke="var(--charcoal-faint)" strokeWidth="1" strokeDasharray="3 3"/>
                </svg>
                <p className="tagline" style={{ fontSize: '0.9rem' }}>
                  Your bouquet will bloom here
                </p>
              </div>
            )}
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

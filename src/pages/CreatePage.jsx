import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import BouquetCanvas from '../components/BouquetCanvas';
import FlowerPicker from '../components/FlowerPicker';
import GreeneryPicker from '../components/GreeneryPicker';
import { createBouquet } from '../firebase/bouquets';
import { pageVariants } from '../engine/animations';
import FLOWER_TYPES from '../engine/flowers';
import './CreatePage.css';

const OCCASIONS = [
  { key: 'birthday', label: '🎂 Birthday' },
  { key: 'thank-you', label: '🙏 Thank You' },
  { key: 'love', label: '❤️ Love' },
  { key: 'sympathy', label: '🤍 Sympathy' },
  { key: 'congrats', label: '🎉 Congrats' },
  { key: 'just-because', label: '✿ Just Because' },
];

const STEPS = [
  { id: 'flowers', label: 'Flowers' },
  { id: 'greenery', label: 'Greenery' },
  { id: 'message', label: 'Message' },
  { id: 'send', label: 'Send' },
];

const stepVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

export default function CreatePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);

  const [flowers, setFlowers] = useState([]);
  const [greenery, setGreenery] = useState('leafy');
  const [to, setTo] = useState('');
  const [from, setFrom] = useState(user?.displayName || '');
  const [message, setMessage] = useState('');
  const [occasion, setOccasion] = useState('just-because');
  const [isPublic, setIsPublic] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [bouquetSeed] = useState(() => Math.floor(Math.random() * 100000));

  const goTo = (next) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const handleAddFlower = (flower) => {
    if (flowers.length >= 12) return;
    setFlowers((prev) => [...prev, flower]);
  };

  const handleRemoveFlower = (type) => {
    const idx = [...flowers].map(f => f.type).lastIndexOf(type);
    if (idx !== -1) setFlowers(prev => prev.filter((_, i) => i !== idx));
  };

  const handleRandomize = () => {
    const keys = Object.keys(FLOWER_TYPES);
    const count = Math.floor(Math.random() * 4) + 4;
    setFlowers(Array.from({ length: count }, () => ({
      type: keys[Math.floor(Math.random() * keys.length)]
    })));
  };

  const handleSend = async () => {
    if (!flowers.length) return;
    setSaving(true);
    setSaveError('');
    try {
      const id = await createBouquet(user?.uid || 'demo', {
        to, from: from || user?.displayName || 'Anonymous',
        message, occasion, flowers, greenery, isPublic, seed: bouquetSeed,
      });
      navigate(`/view/${id}`);
    } catch (err) {
      setSaveError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const flowerCounts = flowers.reduce((acc, f) => {
    acc[f.type] = (acc[f.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <motion.div className="create-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">

      {/* Step indicator */}
      <div className="create-steps container">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            className={`step-pill ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
            onClick={() => i < step && goTo(i)}
            disabled={i > step}
          >
            <span className="step-num">{i < step ? '✓' : i + 1}</span>
            <span className="step-label">{s.label}</span>
          </button>
        ))}
        <div className="step-track">
          <div className="step-fill" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
        </div>
      </div>

      <div className="create-layout container">

        {/* Left — step content */}
        <div className="create-panel create-controls">
          <AnimatePresence mode="wait" custom={dir}>

            {/* STEP 0 — Flowers */}
            {step === 0 && (
              <motion.div key="flowers" custom={dir} variants={stepVariants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="step-content">
                <div className="panel-header">
                  <h2>Pick Your Flowers</h2>
                  <p className="tagline">Select the blooms that speak for you.</p>
                </div>
                <FlowerPicker onAddFlower={handleAddFlower} selectedFlowers={flowers} />
                {flowers.length > 0 && (
                  <div className="flower-chips">
                    {Object.entries(flowerCounts).map(([type, count]) => (
                      <span key={type} className="flower-chip">
                        {FLOWER_TYPES[type]?.name}
                        {count > 1 && <em> ×{count}</em>}
                        <button className="chip-remove" onClick={() => handleRemoveFlower(type)}>×</button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="step-actions">
                  <button className="btn btn-primary btn-lg" onClick={() => goTo(1)}
                    disabled={flowers.length < 1} style={{ width: '100%' }}>
                    Next — Choose Greenery →
                  </button>
                  <button className="btn btn-secondary" onClick={handleRandomize} style={{ width: '100%' }}>
                    ✨ Surprise Me
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 1 — Greenery */}
            {step === 1 && (
              <motion.div key="greenery" custom={dir} variants={stepVariants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="step-content">
                <div className="panel-header">
                  <h2>Choose Your Greenery</h2>
                  <p className="tagline">Pick a greenery style to wrap your bouquet.</p>
                </div>
                <GreeneryPicker selected={greenery} onSelect={setGreenery} />
                <div className="step-actions">
                  <button className="btn btn-primary btn-lg" onClick={() => goTo(2)} style={{ width: '100%' }}>
                    Next — Write Your Card →
                  </button>
                  <button className="btn btn-secondary" onClick={() => goTo(0)} style={{ width: '100%' }}>
                    ← Back to Flowers
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Message / Card */}
            {step === 2 && (
              <motion.div key="message" custom={dir} variants={stepVariants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="step-content">
                <div className="panel-header">
                  <h2>Write Your Card</h2>
                  <p className="tagline">Add a personal message to your bouquet.</p>
                </div>
                <div className="create-form">
                  <div className="input-group">
                    <label htmlFor="create-to">Recipient's Name</label>
                    <input id="create-to" type="text" className="input-field"
                      placeholder="Who is this for?" value={to}
                      onChange={(e) => setTo(e.target.value)} autoFocus/>
                  </div>
                  <div className="input-group">
                    <label htmlFor="create-message">Your Message</label>
                    <textarea id="create-message" className="input-field"
                      placeholder="Every petal carries a word…"
                      value={message} onChange={(e) => setMessage(e.target.value)}
                      rows={4} maxLength={200}/>
                    <span className="char-count">{message.length}/200</span>
                  </div>
                  <div className="input-group">
                    <label htmlFor="create-from">Your Name</label>
                    <input id="create-from" type="text" className="input-field"
                      placeholder="Your name" value={from}
                      onChange={(e) => setFrom(e.target.value)}/>
                  </div>
                  <div className="input-group">
                    <label>Occasion</label>
                    <div className="occasion-grid">
                      {OCCASIONS.map((occ) => (
                        <button key={occ.key}
                          className={`occasion-chip ${occasion === occ.key ? 'active' : ''}`}
                          onClick={() => setOccasion(occ.key)}>
                          {occ.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <label className="checkbox-wrap">
                    <input type="checkbox" checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}/>
                    <span>Share in the Garden (public)</span>
                  </label>
                </div>
                <div className="step-actions">
                  <button className="btn btn-primary btn-lg" onClick={() => goTo(3)} style={{ width: '100%' }}>
                    Next — Review & Send →
                  </button>
                  <button className="btn btn-secondary" onClick={() => goTo(1)} style={{ width: '100%' }}>
                    ← Back to Greenery
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — Send */}
            {step === 3 && (
              <motion.div key="send" custom={dir} variants={stepVariants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="step-content">
                <div className="panel-header">
                  <h2>Ready to Send</h2>
                  <p className="tagline">Your bouquet is composed. Send it with love.</p>
                </div>
                <div className="review-card">
                  <div className="review-row">
                    <span className="review-label">Flowers</span>
                    <span className="review-value">{flowers.length} selected</span>
                  </div>
                  {to && <div className="review-row">
                    <span className="review-label">To</span>
                    <span className="review-value">{to}</span>
                  </div>}
                  {from && <div className="review-row">
                    <span className="review-label">From</span>
                    <span className="review-value">{from}</span>
                  </div>}
                  {message && <div className="review-row">
                    <span className="review-label">Message</span>
                    <span className="review-value review-message">"{message}"</span>
                  </div>}
                  <div className="review-row">
                    <span className="review-label">Occasion</span>
                    <span className="review-value">{occasion.replace('-', ' ')}</span>
                  </div>
                </div>
                {saveError && <div className="save-error" role="alert">{saveError}</div>}
                <div className="step-actions">
                  <button className="btn btn-primary btn-lg" onClick={handleSend}
                    disabled={saving} style={{ width: '100%' }}>
                    {saving ? 'Sending…' : '✿ Send Bouquet'}
                  </button>
                  <button className="btn btn-secondary" onClick={() => goTo(2)} style={{ width: '100%' }}>
                    ← Edit Message
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right — live preview */}
        <div className="create-panel create-preview">
          {/* Card preview on message step */}
          {step === 2 ? (
            <div className="card-preview-layout">
              <div className="card-preview">
                <div className="card-corner tl"/>
                <div className="card-corner tr"/>
                <div className="card-corner bl"/>
                <div className="card-corner br"/>
                {to && <p className="card-to">To: <em>{to}</em></p>}
                <p className="card-body">{message || <span className="card-placeholder">Your message will appear here…</span>}</p>
                {from && <p className="card-from">With love, <em>{from}</em></p>}
              </div>
            </div>
          ) : (
            <>
              <div className="preview-label">
                <span>Your Bouquet</span>
                {flowers.length > 0 && (
                  <span className="preview-count">{flowers.length} flower{flowers.length !== 1 ? 's' : ''}</span>
                )}
              </div>
              <div className="preview-canvas">
                {flowers.length > 0 ? (
                  <BouquetCanvas flowers={flowers} greenery={greenery} />
                ) : (
                  <div className="preview-empty">
                    <svg width="60" height="72" viewBox="0 0 60 72" fill="none">
                      <circle cx="20" cy="22" r="10" stroke="#e8c8d0" strokeWidth="1.2" strokeDasharray="4 3" fill="none"/>
                      <circle cx="40" cy="16" r="9" stroke="#d8c8e8" strokeWidth="1.2" strokeDasharray="4 3" fill="none"/>
                      <circle cx="30" cy="10" r="7" stroke="#c8d8c8" strokeWidth="1.2" strokeDasharray="4 3" fill="none"/>
                      <line x1="30" y1="42" x2="30" y2="68" stroke="#c8d4c0" strokeWidth="1.5" strokeDasharray="3 3"/>
                    </svg>
                    <p>Pick flowers to begin</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

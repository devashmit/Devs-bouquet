import React, { useState } from 'react';
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

const STEPS = ['Flowers', 'Greenery', 'Message', 'Send'];

const stepVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 32 : -32 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -32 : 32 }),
};

export default function CreatePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [flowers, setFlowers] = useState([]);
  const [greenery, setGreenery] = useState('silver_dollar_eucalyptus');
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
    if (flowers.length >= 5) return; // max 5
    setFlowers(prev => [...prev, flower]);
  };

  const handleRemoveFlower = (type) => {
    const idx = [...flowers].map(f => f.type).lastIndexOf(type);
    if (idx !== -1) setFlowers(prev => prev.filter((_, i) => i !== idx));
  };

  const handleRandomize = () => {
    const keys = Object.keys(FLOWER_TYPES);
    const count = Math.floor(Math.random() * 3) + 3; // 3-5
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

      {/* Step progress bar */}
      <div className="create-progress">
        <div className="progress-steps">
          {STEPS.map((s, i) => (
            <div key={s} className={`progress-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <div className="progress-dot">
                {i < step ? '✓' : i + 1}
              </div>
              <span className="progress-label">{s}</span>
            </div>
          ))}
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
        </div>
      </div>

      {/* Step content — full width centered */}
      <div className="create-body">
        <AnimatePresence mode="wait" custom={dir}>

          {/* STEP 0 — Flowers */}
          {step === 0 && (
            <motion.div key="s0" custom={dir} variants={stepVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="step-page">
              <div className="step-heading">
                <h2>Pick Your Flowers</h2>
                <p>Select the blooms that speak for you (pick at least 1)</p>
              </div>

              <FlowerPicker onAddFlower={handleAddFlower} selectedFlowers={flowers} />

              {flowers.length > 0 && (
                <div className="selected-chips">
                  {Object.entries(flowerCounts).map(([type, count]) => (
                    <span key={type} className="flower-chip">
                      {FLOWER_TYPES[type]?.name}
                      {count > 1 && <em> ×{count}</em>}
                      <button className="chip-remove" onClick={() => handleRemoveFlower(type)}>×</button>
                    </span>
                  ))}
                </div>
              )}

              <div className="step-nav">
                <button className="btn btn-secondary" onClick={handleRandomize}>
                  ✨ Surprise Me
                </button>
                <button className="btn btn-primary btn-lg" onClick={() => goTo(1)}
                  disabled={flowers.length < 1}>
                  Next →
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1 — Greenery */}
          {step === 1 && (
            <motion.div key="s1" custom={dir} variants={stepVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="step-page">
              <div className="step-heading">
                <h2>Choose Your Greenery</h2>
                <p>Pick a greenery style to wrap your bouquet</p>
              </div>

              <GreeneryPicker selected={greenery} onSelect={setGreenery} />

              <div className="step-nav">
                <button className="btn btn-secondary" onClick={() => goTo(0)}>← Back</button>
                <button className="btn btn-primary btn-lg" onClick={() => goTo(2)}>Next →</button>
              </div>
            </motion.div>
          )}

          {/* STEP 2 — Message */}
          {step === 2 && (
            <motion.div key="s2" custom={dir} variants={stepVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="step-page step-message-layout">

              {/* Left — live card preview */}
              <div className="card-preview">
                <div className="card-corner tl"/><div className="card-corner tr"/>
                <div className="card-corner bl"/><div className="card-corner br"/>
                {to && <p className="card-to">To: <em>{to}</em></p>}
                <p className="card-body">{message || <span className="card-placeholder">Your message will appear here…</span>}</p>
                {from && <p className="card-from">With love, <em>{from}</em></p>}
              </div>

              {/* Right — form */}
              <div className="message-form">
                <div className="step-heading" style={{textAlign:'left'}}>
                  <h2>Write Your Card</h2>
                  <p>Add a personal message to your bouquet</p>
                </div>
                <div className="create-form">
                  <div className="input-group">
                    <label>Recipient's Name</label>
                    <input type="text" className="input-field" placeholder="Who is this for?"
                      value={to} onChange={e => setTo(e.target.value)} autoFocus/>
                  </div>
                  <div className="input-group">
                    <label>Your Message</label>
                    <textarea className="input-field" placeholder="Every petal carries a word…"
                      value={message} onChange={e => setMessage(e.target.value)}
                      rows={4} maxLength={200}/>
                    <span className="char-count">{message.length}/200</span>
                  </div>
                  <div className="input-group">
                    <label>Your Name</label>
                    <input type="text" className="input-field" placeholder="Your name"
                      value={from} onChange={e => setFrom(e.target.value)}/>
                  </div>
                  <div className="input-group">
                    <label>Occasion</label>
                    <div className="occasion-grid">
                      {OCCASIONS.map(occ => (
                        <button key={occ.key}
                          className={`occasion-chip ${occasion === occ.key ? 'active' : ''}`}
                          onClick={() => setOccasion(occ.key)}>
                          {occ.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <label className="checkbox-wrap">
                    <input type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)}/>
                    <span>Share in the Garden (public)</span>
                  </label>
                </div>
                <div className="step-nav" style={{marginTop:'1.5rem'}}>
                  <button className="btn btn-secondary" onClick={() => goTo(1)}>← Back</button>
                  <button className="btn btn-primary btn-lg" onClick={() => goTo(3)}>Next →</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3 — Send */}
          {step === 3 && (
            <motion.div key="s3" custom={dir} variants={stepVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="step-page step-send-layout">

              {/* Bouquet preview */}
              <div className="bouquet-final">
                <BouquetCanvas flowers={flowers} greenery={greenery} />
              </div>

              {/* Send form */}
              <div className="send-form">
                <div className="step-heading" style={{textAlign:'left'}}>
                  <h2>Ready to Send</h2>
                  <p>Your bouquet is composed. Send it with love.</p>
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
                </div>
                {saveError && <div className="save-error">{saveError}</div>}
                <div className="step-nav" style={{marginTop:'1.5rem'}}>
                  <button className="btn btn-secondary" onClick={() => goTo(2)}>← Back</button>
                  <button className="btn btn-primary btn-lg" onClick={handleSend} disabled={saving}>
                    {saving ? 'Sending…' : '✿ Send Bouquet'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

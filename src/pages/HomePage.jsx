import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingPetals from '../components/FloatingPetals';
import AIBouquetViewer from '../components/AIBouquetViewer';
import { pageVariants, fadeInUp, staggerContainer } from '../engine/animations';
import './HomePage.css';

const demoBouquet = [
  { type: 'classic_red_rose' },
  { type: 'romantic_pink_peony' },
  { type: 'vibrant_sunflower' },
];

export default function HomePage() {
  return (
    <motion.div
      className="home-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <FloatingPetals count={6} />

      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <motion.div
          className="hero-content container"
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={fadeInUp} className="hero-eyebrow">
            ✿ hand-drawn with heart
          </motion.p>
          <motion.h1 variants={fadeInUp} className="hero-title">
            Sketching feelings<br />into flowers.
          </motion.h1>
          <motion.p variants={fadeInUp} className="hero-subtitle tagline">
            Hand-drawn petals, carrying unspoken words.
          </motion.p>
          <motion.div variants={fadeInUp} className="hero-actions">
            <Link to="/create" className="btn btn-primary btn-lg" id="hero-cta-create">
              Draw a Bouquet
            </Link>
            <Link to="/garden" className="btn btn-secondary btn-lg" id="hero-cta-garden">
              Visit the Garden
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Bouquet Preview */}
        <motion.div
          className="hero-bouquet"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="hero-bouquet-wrapper">
            <AIBouquetViewer flowers={demoBouquet} />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section container" id="features">
        <motion.div
          className="features-grid"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {[
            { icon: '✏️', title: 'Hand-Drawn', desc: 'Every line has a wobble. Every petal is imperfect. Because real things are.' },
            { icon: '💌', title: 'Carry a Message', desc: 'Attach words that matter. Say what flowers alone cannot.' },
            { icon: '🔗', title: 'Share a Link', desc: 'One link. One moment. Beautifully revealed with animation.' },
            { icon: '💐', title: 'Send One Back', desc: 'Received a bouquet? Draw one in return. Keep the bloom going.' },
          ].map((f, i) => (
            <motion.div key={i} variants={fadeInUp} className="feature-card glass-card">
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="bottom-cta container text-center" id="bottom-cta">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Every bouquet begins<br />with a single line.</h2>
          <p className="tagline" style={{ margin: '1rem auto' }}>
            Where every bouquet is drawn, not sent.
          </p>
          <Link to="/create" className="btn btn-primary btn-lg" id="bottom-cta-create">
            Start Drawing ✿
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
}

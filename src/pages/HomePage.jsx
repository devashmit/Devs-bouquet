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
  { type: 'delicate_white_lily' },
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
      <FloatingPetals count={8} />

      {/* ── Hero ── */}
      <section className="hero-section" id="hero">

        {/* Left — Editorial content */}
        <motion.div
          className="hero-content"
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={fadeInUp} className="hero-eyebrow">
            Digital Floral Atelier
          </motion.p>

          <motion.h1 variants={fadeInUp} className="hero-title">
            Sketching<br />
            <em>feelings</em><br />
            into flowers.
          </motion.h1>

          <motion.p variants={fadeInUp} className="hero-subtitle">
            Compose a bouquet from hand-painted botanicals.
            Attach a message. Share a moment that blooms.
          </motion.p>

          <motion.div variants={fadeInUp} className="hero-actions">
            <Link to="/create" className="btn btn-primary btn-lg" id="hero-cta-create">
              Compose a Bouquet
            </Link>
            <div className="hero-divider" />
            <Link to="/garden" className="btn btn-secondary" id="hero-cta-garden">
              The Garden
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — Cinematic bouquet */}
        <div className="hero-bouquet">
          <motion.div
            className="hero-bouquet-wrapper"
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <AIBouquetViewer flowers={demoBouquet} />
          </motion.div>
          <motion.p
            className="hero-bouquet-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            A bouquet composed just for you
          </motion.p>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section container" id="features">
        <p className="features-eyebrow">The Atelier</p>
        <h2 className="features-title">Where every petal is intentional.</h2>

        <motion.div
          className="features-grid"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {[
            {
              icon: '🌸',
              title: 'Botanical Illustrations',
              desc: 'Hand-painted watercolor flowers — each one a small work of art.',
            },
            {
              icon: '💌',
              title: 'Carry a Message',
              desc: 'Attach words that matter. Say what flowers alone cannot.',
            },
            {
              icon: '🔗',
              title: 'Share a Link',
              desc: 'One link. One moment. Beautifully revealed with animation.',
            },
            {
              icon: '💐',
              title: 'Send One Back',
              desc: 'Received a bouquet? Draw one in return. Keep the bloom going.',
            },
          ].map((f, i) => (
            <motion.div key={i} variants={fadeInUp} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bottom-cta container text-center" id="bottom-cta">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2>Every bouquet begins<br />with a single flower.</h2>
          <p className="tagline">
            Drawn softly. Sent meaningfully.
          </p>
          <Link to="/create" className="btn btn-primary btn-lg" id="bottom-cta-create">
            Start Composing ✿
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
}

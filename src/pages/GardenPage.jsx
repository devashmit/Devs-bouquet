import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BouquetComposer from '../engine/BouquetComposer';
import EmptyState from '../components/EmptyState';
import { getPublicBouquets } from '../firebase/bouquets';
import { pageVariants, staggerContainer, fadeInUp } from '../engine/animations';
import './GardenPage.css';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'birthday', label: '🎂 Birthday' },
  { key: 'thank-you', label: '🙏 Thank You' },
  { key: 'love', label: '❤️ Love' },
  { key: 'sympathy', label: '🤍 Sympathy' },
  { key: 'congrats', label: '🎉 Congrats' },
  { key: 'just-because', label: '✿ Just Because' },
];

export default function GardenPage() {
  const [bouquets, setBouquets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function load() {
      const data = await getPublicBouquets(30);
      setBouquets(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = filter === 'all'
    ? bouquets
    : bouquets.filter(b => b.occasion === filter);

  return (
    <motion.div
      className="garden-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="garden-header container text-center">
        <h1>The Garden</h1>
        <p className="tagline">Bouquets shared with the world, blooming in the open.</p>
      </div>

      {/* Filters */}
      <div className="garden-filters container">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`filter-chip ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="container">
        {loading ? (
          <div className="loading-screen" style={{ minHeight: '40vh' }}>
            <div className="loading-petal"></div>
            <p className="tagline">Growing the garden...</p>
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            message="The garden is quiet. Be the first to plant a bouquet."
            actionLabel="Draw a Bouquet"
            onAction={() => window.location.href = '/create'}
          />
        ) : (
          <motion.div
            className="garden-grid"
            variants={staggerContainer(0.08)}
            initial="hidden"
            animate="visible"
          >
            {filtered.map((b) => (
              <motion.div key={b.id} variants={fadeInUp}>
                <Link to={`/view/${b.id}`} className="garden-card card" id={`garden-${b.id}`}>
                  <div className="garden-card-preview">
                    <BouquetComposer
                      flowers={b.flowers || []}
                      styleMode={b.styleMode || 'sketch'}
                      width={200}
                      height={250}
                      seed={b.seed || 1}
                      showRibbon={false}
                    />
                  </div>
                  <div className="garden-card-info">
                    {b.to && <p className="garden-card-to">For {b.to}</p>}
                    <div className="garden-card-meta">
                      <span className="badge badge-blush">{b.occasion?.replace('-', ' ') || 'just because'}</span>
                      {b.reaction && <span className="garden-reaction">{b.reaction}</span>}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

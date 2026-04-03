import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import AIBouquetViewer from '../components/AIBouquetViewer';
import EmptyState from '../components/EmptyState';
import { getUserBouquets } from '../firebase/bouquets';
import { pageVariants, staggerContainer, fadeInUp } from '../engine/animations';
import './DashboardPage.css';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bouquets, setBouquets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      const data = await getUserBouquets(user.uid);
      setBouquets(data);
      setLoading(false);
    }
    load();
  }, [user]);

  const totalSent = bouquets.length;
  const totalViewed = bouquets.filter(b => b.viewed).length;
  const totalReactions = bouquets.filter(b => b.reaction).length;

  return (
    <motion.div
      className="dashboard-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Your Garden</h1>
            <p className="tagline">Not just flowers — a moment, sketched for you.</p>
            <p className="subtext">Moments you've sent, still blooming.</p>
          </div>
          <Link to="/create" className="btn btn-primary" id="dash-create">
            ✿ Draw New
          </Link>
        </div>

        {/* Stats */}
        {!loading && bouquets.length > 0 && (
          <motion.div
            className="dashboard-stats"
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="stat-card glass-card">
              <span className="stat-number">{totalSent}</span>
              <span className="stat-label">Bouquets Sent</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="stat-card glass-card">
              <span className="stat-number">{totalViewed}</span>
              <span className="stat-label">Viewed</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="stat-card glass-card">
              <span className="stat-number">{totalReactions}</span>
              <span className="stat-label">Reactions</span>
            </motion.div>
          </motion.div>
        )}

        {/* Bouquet List */}
        {loading ? (
          <div className="loading-screen" style={{ minHeight: '40vh' }}>
            <div className="loading-petal"></div>
            <p className="tagline">Counting petals...</p>
          </div>
        ) : bouquets.length === 0 ? (
          <EmptyState
            message="You haven't drawn a moment yet."
            actionLabel="Draw Your First Bouquet"
            onAction={() => navigate('/create')}
          />
        ) : (
          <motion.div
            className="dashboard-list"
            variants={staggerContainer(0.06)}
            initial="hidden"
            animate="visible"
          >
            {bouquets.map((b) => (
              <motion.div key={b.id} variants={fadeInUp}>
                <Link to={`/view/${b.id}`} className="dashboard-item card" id={`dash-item-${b.id}`}>
                  <div className="dash-item-preview">
                    <AIBouquetViewer flowers={b.flowers || []} />
                  </div>
                  <div className="dash-item-info">
                    <p className="dash-item-to">
                      {b.to ? `For ${b.to}` : 'Unnamed bouquet'}
                    </p>
                    <div className="dash-item-meta">
                      <span className="badge badge-blush">
                        {b.occasion?.replace('-', ' ') || 'just because'}
                      </span>
                      <span className="badge badge-sage">
                        {b.flowers?.length || 0} flowers
                      </span>
                    </div>
                    {b.message && (
                      <p className="dash-item-msg">"{b.message.slice(0, 60)}{b.message.length > 60 ? '...' : ''}"</p>
                    )}
                  </div>
                  <div className="dash-item-status">
                    {b.viewed ? (
                      <span className="status-viewed" title="Viewed">✓ Viewed</span>
                    ) : (
                      <span className="status-pending" title="Not yet viewed">Pending</span>
                    )}
                    {b.reaction && <span className="dash-reaction">{b.reaction}</span>}
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { isFirebaseConfigured } from '../firebase/config';
import { updateDisplayName } from '../firebase/auth';
import { pageVariants, fadeInUp, staggerContainer } from '../engine/animations';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.displayName || '');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isFirebaseConfigured) {
        await updateDisplayName(name);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <motion.div
      className="profile-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="profile-card glass-card"
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeInUp} className="profile-header">
          <div className="profile-avatar">
            {user?.displayName?.[0]?.toUpperCase() || '✿'}
          </div>
          <h2>{user?.displayName || 'Sketch Artist'}</h2>
          <p className="subtext">{user?.email || 'Guest artist'}</p>
          {user?.isDemo && (
            <span className="badge badge-lavender">Demo Mode</span>
          )}
        </motion.div>

        <motion.div variants={fadeInUp} className="profile-form">
          <div className="input-group">
            <label htmlFor="profile-name">Display Name</label>
            <input
              id="profile-name"
              type="text"
              className="input-field"
              placeholder="Your name on bouquets"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving || !name.trim()}
            id="profile-save"
            style={{ width: '100%' }}
          >
            {saved ? '✓ Saved!' : saving ? 'Saving...' : 'Update Name'}
          </button>
        </motion.div>

        <motion.div variants={fadeInUp} className="profile-actions">
          <button
            className="btn btn-secondary"
            onClick={handleLogout}
            id="profile-logout"
            style={{ width: '100%' }}
          >
            Sign Out
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

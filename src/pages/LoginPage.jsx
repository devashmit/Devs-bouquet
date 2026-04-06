import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { isFirebaseConfigured } from '../firebase/config';
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from '../firebase/auth';
import { pageVariants } from '../engine/animations';
import './LoginPage.css';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = (stagger) => ({
  visible: {
    transition: { staggerChildren: stagger }
  }
});

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || '/create';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isFirebaseConfigured) {
      setError('Firebase is not configured. Use "Continue as Guest" to proceed.');
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    if (isSignUp && password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, name);
      } else {
        await signInWithEmail(email, password);
      }
      navigate(returnTo);
    } catch (err) {
      setError(err.message?.replace('Firebase: ', '') || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    if (!isFirebaseConfigured) {
      setError('Google sign-in requires Firebase to be configured.');
      return;
    }
    try {
      await signInWithGoogle();
      navigate(returnTo);
    } catch (err) {
      setError(err.message?.replace('Firebase: ', '') || 'Google sign-in failed');
    }
  };

  const handleDemoLogin = () => {
    loginAsDemo(name || 'Guest Artist');
    navigate(returnTo);
  };

  const switchMode = () => {
    setIsSignUp(v => !v);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <motion.div
      className="login-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="login-bg-petals" aria-hidden="true">
        <span className="bg-petal bp1">✿</span>
        <span className="bg-petal bp2">❀</span>
        <span className="bg-petal bp3">✾</span>
        <span className="bg-petal bp4">✿</span>
      </div>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div className="login-header" custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <div className="login-icon">✿</div>
          <h2>{isFirebaseConfigured ? (isSignUp ? 'Join the Garden' : 'Welcome Back') : 'Welcome Artist'}</h2>
          <p className="login-tagline">Every petal drawn with a reason.</p>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              className="login-error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span>⚠</span> {error}
            </motion.div>
          )}
        </AnimatePresence>

        {isFirebaseConfigured ? (
          <>
            <motion.div className="login-tabs" custom={1} variants={fadeUp} initial="hidden" animate="visible">
              <button
                className={`login-tab ${!isSignUp ? 'active' : ''}`}
                onClick={() => !isSignUp || switchMode()}
              >
                Sign In
              </button>
              <button
                className={`login-tab ${isSignUp ? 'active' : ''}`}
                onClick={() => isSignUp || switchMode()}
              >
                Sign Up
              </button>
            </motion.div>

            <motion.form
              className="login-form"
              onSubmit={handleSubmit}
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
            >
              <AnimatePresence>
                {isSignUp && (
                  <motion.div
                    className="input-group"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <label htmlFor="login-name">Your Name</label>
                    <input
                      id="login-name"
                      type="text"
                      className="input-field"
                      placeholder="The name on your petals..."
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="input-group">
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  className="input-field"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="login-password">Password</label>
                <div className="input-password-wrap">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    className="input-field"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(v => !v)}
                  >
                    {showPassword ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Opening garden...' : (isSignUp ? '✿ Create Account' : '✿ Sign In')}
              </button>
            </motion.form>

            <motion.div className="login-divider" custom={3} variants={fadeUp} initial="hidden" animate="visible">
              <span>or</span>
            </motion.div>

            <motion.div className="login-alternatives" custom={4} variants={fadeUp} initial="hidden" animate="visible">
              <button className="btn btn-google btn-full" onClick={handleGoogle}>
                Continue with Google
              </button>
              <button className="btn btn-ghost btn-full" onClick={handleDemoLogin} style={{ marginTop: '0.5rem' }}>
                ✿ Continue as Guest
              </button>
            </motion.div>
          </>
        ) : (
          <motion.div 
            className="guest-mode-entry"
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer(0.1)}
          >
            <div className="input-group" style={{ marginTop: '1.5rem' }}>
              <label htmlFor="guest-name">Your Artist Name</label>
              <input
                id="guest-name"
                type="text"
                className="input-field"
                placeholder="How shall we call you?"
                value={name}
                onChange={e => setName(e.target.value)}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleDemoLogin()}
              />
            </div>
            <button 
              className="btn btn-primary btn-full btn-lg" 
              onClick={handleDemoLogin}
              style={{ marginTop: '1.5rem' }}
            >
              ✿ Enter the Garden
            </button>
            <p className="login-note" style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--charcoal-faint)', fontSize: '0.8rem' }}>
              Firebase is not configured. Running in local demo mode.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

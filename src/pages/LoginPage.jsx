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
      setError('Authentication is not configured. Please use "Continue as Guest" below.');
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
      setError('Google sign-in is not configured. Please use "Continue as Guest" below.');
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
    loginAsDemo(name || 'Sketch Artist');
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
      {/* Decorative petals */}
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
        {/* Header */}
        <motion.div className="login-header" custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <div className="login-icon">✿</div>
          <h2>{isSignUp ? 'Join the Garden' : 'Welcome Back'}</h2>
          <p className="login-tagline">Every petal drawn with a reason.</p>
        </motion.div>

        {/* Tab switcher */}
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

        {/* Error */}
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

        {/* Form */}
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
                  autoComplete="name"
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
              required={isFirebaseConfigured}
              autoComplete="email"
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
                required={isFirebaseConfigured}
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
            id="login-submit"
          >
            {loading
              ? <span className="btn-loading"><span className="btn-spinner" />Opening garden...</span>
              : isSignUp ? '✿ Create Account' : '✿ Sign In'
            }
          </button>
        </motion.form>

        {/* Divider */}
        <motion.div className="login-divider" custom={3} variants={fadeUp} initial="hidden" animate="visible">
          <span>or</span>
        </motion.div>

        {/* Alternatives */}
        <motion.div className="login-alternatives" custom={4} variants={fadeUp} initial="hidden" animate="visible">
          <button className="btn btn-google btn-full" onClick={handleGoogle} id="login-google">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {!isFirebaseConfigured && (
            <button className="btn btn-ghost btn-full" onClick={handleDemoLogin} id="login-demo">
              ✿ Continue as Guest Artist
            </button>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

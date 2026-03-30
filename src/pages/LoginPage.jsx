import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { isFirebaseConfigured } from '../firebase/config';
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from '../firebase/auth';
import { pageVariants, fadeInUp, staggerContainer } from '../engine/animations';
import './LoginPage.css';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || '/create';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!isFirebaseConfigured) {
        loginAsDemo(name || 'Sketch Artist');
        navigate(returnTo);
        return;
      }

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
    try {
      if (!isFirebaseConfigured) {
        loginAsDemo('Google Artist');
        navigate(returnTo);
        return;
      }
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

  return (
    <motion.div
      className="login-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="login-card glass-card"
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeInUp} className="login-header">
          <span className="login-flower">✿</span>
          <h2>{isSignUp ? 'Join the Garden' : 'Welcome Back'}</h2>
          <p className="tagline">Every petal drawn with a reason.</p>
        </motion.div>

        {error && (
          <motion.div variants={fadeInUp} className="login-error">
            {error}
          </motion.div>
        )}

        <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="login-form">
          {isSignUp && (
            <div className="input-group">
              <label htmlFor="login-name">Your Name</label>
              <input
                id="login-name"
                type="text"
                className="input-field"
                placeholder="The name on your petals..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              className="input-field"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={isFirebaseConfigured}
            />
          </div>

          <div className="input-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={isFirebaseConfigured}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            id="login-submit"
            style={{ width: '100%' }}
          >
            {loading ? 'Opening garden...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </motion.form>

        <motion.div variants={fadeInUp} className="login-divider">
          <span>or</span>
        </motion.div>

        <motion.div variants={fadeInUp} className="login-alternatives">
          <button className="btn btn-google" onClick={handleGoogle} id="login-google" style={{ width: '100%' }}>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {!isFirebaseConfigured && (
            <button className="btn btn-soft" onClick={handleDemoLogin} id="login-demo" style={{ width: '100%' }}>
              ✿ Continue as Guest Artist
            </button>
          )}
        </motion.div>

        <motion.p variants={fadeInUp} className="login-toggle">
          {isSignUp ? 'Already have an account?' : "Don't have one yet?"}
          <button onClick={() => { setIsSignUp(!isSignUp); setError(''); }} className="login-toggle-btn">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

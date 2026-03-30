import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange, signOut } from '../firebase/auth';
import { isFirebaseConfigured } from '../firebase/config';

const AuthContext = createContext(null);

/**
 * AuthProvider — wraps application with auth state.
 * Provides user, loading, and auth action functions.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Demo user for when Firebase isn't configured
  const [demoUser, setDemoUser] = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthChange((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const currentUser = isFirebaseConfigured ? user : demoUser;

  const loginAsDemo = (name = 'Sketch Artist') => {
    setDemoUser({
      uid: 'demo-user-' + Date.now(),
      displayName: name,
      email: 'artist@devsbouquet.com',
      isDemo: true,
    });
  };

  const logout = async () => {
    if (isFirebaseConfigured) {
      await signOut();
    } else {
      setDemoUser(null);
    }
  };

  const value = {
    user: currentUser,
    loading,
    isAuthenticated: !!currentUser,
    isFirebaseConfigured,
    loginAsDemo,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth hook — access auth context
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;

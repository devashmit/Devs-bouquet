import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';

const googleProvider = isFirebaseConfigured ? new GoogleAuthProvider() : null;

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(email, password, displayName) {
  if (!isFirebaseConfigured) throw new Error('Firebase not configured');
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(cred.user, { displayName });
  }
  return cred.user;
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email, password) {
  if (!isFirebaseConfigured) throw new Error('Firebase not configured');
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

/**
 * Sign in with Google popup
 */
export async function signInWithGoogle() {
  if (!isFirebaseConfigured) throw new Error('Firebase not configured');
  const cred = await signInWithPopup(auth, googleProvider);
  return cred.user;
}

/**
 * Sign out
 */
export async function signOut() {
  if (!isFirebaseConfigured) return;
  await firebaseSignOut(auth);
}

/**
 * Listen to auth state changes
 */
export function onAuthChange(callback) {
  if (!isFirebaseConfigured) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

/**
 * Update user display name
 */
export async function updateDisplayName(name) {
  if (!isFirebaseConfigured || !auth.currentUser) return;
  await updateProfile(auth.currentUser, { displayName: name });
}

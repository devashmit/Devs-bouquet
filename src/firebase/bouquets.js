import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  limit,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

const COLLECTION = 'bouquets';

// ---- Demo mode storage (when Firebase is not configured) ----
let demoBouquets = [];

function generateId() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

/**
 * Create a bouquet and return its ID.
 */
export async function createBouquet(userId, data) {
  const bouquetData = {
    userId,
    to: data.to || '',
    from: data.from || '',
    message: data.message || '',
    occasion: data.occasion || 'just-because',
    flowers: data.flowers || [],
    styleMode: data.styleMode || 'sketch',
    isPublic: data.isPublic !== false,
    createdAt: isFirebaseConfigured ? serverTimestamp() : new Date().toISOString(),
    viewed: false,
    viewedAt: null,
    reaction: null,
    seed: data.seed || Math.floor(Math.random() * 100000),
  };

  if (!isFirebaseConfigured) {
    const id = generateId();
    demoBouquets.push({ ...bouquetData, id });
    return id;
  }

  const docRef = await addDoc(collection(db, COLLECTION), bouquetData);
  return docRef.id;
}

/**
 * Get a bouquet by ID (public — no auth required).
 */
export async function getBouquet(id) {
  if (!isFirebaseConfigured) {
    const found = demoBouquets.find(b => b.id === id);
    return found || null;
  }

  try {
    const docSnap = await getDoc(doc(db, COLLECTION, id));
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() };
  } catch (err) {
    console.error('Error fetching bouquet:', err);
    return null;
  }
}

/**
 * Get all bouquets for a user (dashboard).
 */
export async function getUserBouquets(userId) {
  if (!isFirebaseConfigured) {
    return demoBouquets
      .filter(b => b.userId === userId)
      .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  }

  try {
    const q = query(
      collection(db, COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Error fetching user bouquets:', err);
    return [];
  }
}

/**
 * Get public bouquets for the garden.
 */
export async function getPublicBouquets(maxCount = 20) {
  if (!isFirebaseConfigured) {
    return demoBouquets
      .filter(b => b.isPublic)
      .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
      .slice(0, maxCount);
  }

  try {
    const q = query(
      collection(db, COLLECTION),
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc'),
      limit(maxCount)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Error fetching public bouquets:', err);
    return [];
  }
}

/**
 * Mark a bouquet as viewed.
 */
export async function markBouquetViewed(id) {
  if (!isFirebaseConfigured) {
    const b = demoBouquets.find(b => b.id === id);
    if (b) {
      b.viewed = true;
      b.viewedAt = new Date().toISOString();
    }
    return;
  }

  try {
    await updateDoc(doc(db, COLLECTION, id), {
      viewed: true,
      viewedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error('Error marking viewed:', err);
  }
}

/**
 * Add emoji reaction to a bouquet (no auth required).
 */
export async function updateBouquetReaction(id, emoji) {
  if (!isFirebaseConfigured) {
    const b = demoBouquets.find(b => b.id === id);
    if (b) b.reaction = emoji;
    return;
  }

  try {
    await updateDoc(doc(db, COLLECTION, id), { reaction: emoji });
  } catch (err) {
    console.error('Error updating reaction:', err);
  }
}

/**
 * Get demo bouquets reference (for demo mode)
 */
export function getDemoBouquets() {
  return demoBouquets;
}

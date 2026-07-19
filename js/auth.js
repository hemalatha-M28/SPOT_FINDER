/* -------------------------------------------------------------
 * SPOT FINDER - Authentication & Data Management System
 * Firebase Firestore-backed storage for all data types:
 *   • users (admin / partner / user profiles)
 *   • areas (locations, spots, restaurants)
 *   • reviews
 *   • favorites
 * ------------------------------------------------------------- */

const SpotFinderAuth = (() => {

  // ------------------------------------------------------------------
  // CONSTANTS
  // ------------------------------------------------------------------
  const MAX_ADMINS = 5;
  const SESSION_KEY = 'sf_session';

  // ------------------------------------------------------------------
  // UTILITY: SESSION (localStorage, lightweight)
  // ------------------------------------------------------------------
  const getSession = () => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  };

  const setSession = (user) => {
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(user)); } catch {}
  };

  const clearSession = () => localStorage.removeItem(SESSION_KEY);

  const isLoggedIn = () => !!getSession();

  const currentUser = () => getSession();

  const isAdmin = () => {
    const s = getSession();
    return s && s.role === 'admin';
  };

  const isPartner = () => {
    const s = getSession();
    return s && s.role === 'partner';
  };

  const logout = () => {
    const session = getSession();
    clearSession();
    if (session && session.role === 'user' && window.sfAuth) {
      window.sfAuth.signOut().catch(() => {});
    }
  };

  // ------------------------------------------------------------------
  // UTILITY: SLUG GENERATOR
  // ------------------------------------------------------------------
  const slugify = (str) =>
    str.toLowerCase().trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  // ------------------------------------------------------------------
  // HELPERS: shorthand Firestore refs
  // ------------------------------------------------------------------
  const db = () => window.sfDb;
  const usersCol = () => db().collection('users');
  const areasCol = () => db().collection('areas');
  const reviewsCol = () => db().collection('reviews');
  const favoritesCol = () => db().collection('favorites');

  // ------------------------------------------------------------------
  // IN-MEMORY CACHE (kept in sync with Firestore)
  // ------------------------------------------------------------------
  // After loadAllData() is called, window.COIMBATORE_DATA.areas is
  // authoritative in memory. All mutations write-through to Firestore.

  // ------------------------------------------------------------------
  // DATA INITIALISATION
  // ------------------------------------------------------------------
  /**
   * Called once on app startup.
   * 1. Seeds Firestore with base spot data if the areas collection is empty.
   * 2. Seeds the default admin account if none exists.
   * 3. Loads all areas into window.COIMBATORE_DATA.areas.
   */
  const loadAllData = async () => {
    if (!window.sfDb) return;

    try {
      // ---- Seed areas from static data.js if Firestore has none ----
      const areasSnap = await areasCol().orderBy('_order').get().catch(() => null);
      let areasFromDb = [];

      if (areasSnap && !areasSnap.empty) {
        areasFromDb = areasSnap.docs.map(d => ({ ...d.data(), _firestoreId: d.id }));

        // Always sync static display fields (bannerImage, tagline, description) from data.js
        // so that developer changes to these fields are reflected without wiping Firestore data.
        if (window.COIMBATORE_DATA && window.COIMBATORE_DATA.areas) {
          const syncBatch = db().batch();
          window.COIMBATORE_DATA.areas.forEach(area => {
            const ref = areasCol().doc(area.id);
            syncBatch.update(ref, {
              bannerImage: area.bannerImage,
              tagline: area.tagline,
              description: area.description
            });
          });
          await syncBatch.commit().catch(() => {});

          // Reflect the updated static fields in the in-memory model too
          areasFromDb = areasFromDb.map(dbArea => {
            const staticArea = window.COIMBATORE_DATA.areas.find(a => a.id === dbArea.id);
            if (staticArea) {
              return {
                ...dbArea,
                bannerImage: staticArea.bannerImage,
                tagline: staticArea.tagline,
                description: staticArea.description
              };
            }
            return dbArea;
          });
        }
      } else {
        // First run – push static data to Firestore
        if (window.COIMBATORE_DATA && window.COIMBATORE_DATA.areas) {
          const batch = db().batch();
          window.COIMBATORE_DATA.areas.forEach((area, idx) => {
            const ref = areasCol().doc(area.id);
            batch.set(ref, { ...area, _order: idx });
          });
          await batch.commit();
          areasFromDb = window.COIMBATORE_DATA.areas.map((a, idx) => ({ ...a, _order: idx }));
        }
      }

      // Hydrate in-memory model
      if (window.COIMBATORE_DATA) {
        window.COIMBATORE_DATA.areas = areasFromDb;
      }

      // ---- Seed default admin if none exists ----
      const adminSnap = await usersCol()
        .where('role', '==', 'admin')
        .limit(1)
        .get().catch(() => null);

      if (adminSnap && adminSnap.empty) {
        await usersCol().add({
          name: 'Admin',
          username: 'admin',
          password: 'admin123',
          role: 'admin',
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }

    } catch (e) {
      console.warn('[SpotFinder] loadAllData error:', e);
    }
  };

  // ------------------------------------------------------------------
  // USER ACCOUNTS (Firebase Auth + Firestore profile)
  // ------------------------------------------------------------------
  const registerUser = async (name, username, password) => {
    if (!name || !username || !password) return { success: false, message: 'All fields are required.' };
    if (password.length < 6) return { success: false, message: 'Password must be at least 6 characters.' };
    if (!window.sfAuth || !window.sfDb) return { success: false, message: 'Service unavailable. Please refresh.' };

    const email = `${username.toLowerCase()}@spotfinder.app`;
    try {
      const cred = await window.sfAuth.createUserWithEmailAndPassword(email, password);
      await usersCol().doc(cred.user.uid).set({
        name,
        username: username.toLowerCase(),
        role: 'user',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true };
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        return { success: false, message: 'Username is already taken.' };
      }
      if (e.code === 'auth/weak-password') {
        return { success: false, message: 'Password must be at least 6 characters.' };
      }
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  const loginUser = async (username, password) => {
    if (!window.sfAuth || !window.sfDb) return { success: false, message: 'Service unavailable. Please refresh.' };

    const email = `${username.toLowerCase()}@spotfinder.app`;
    try {
      const cred = await window.sfAuth.signInWithEmailAndPassword(email, password);
      const doc = await usersCol().doc(cred.user.uid).get();
      if (doc.exists) {
        const profile = doc.data();
        setSession({ name: profile.name, username: profile.username, role: 'user' });
      }
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Invalid username or password.' };
    }
  };

  // ---- GOOGLE SIGN-IN / SIGN-UP ----
  const loginWithGoogle = async () => {
    if (!window.sfAuth) return { success: false, message: 'Service unavailable. Please refresh.' };

    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');

      const result = await window.sfAuth.signInWithPopup(provider);
      const user = result.user;

      // Check if a Firestore profile already exists for this Google user
      const docRef = usersCol().doc(user.uid);
      const doc = await docRef.get();

      if (!doc.exists) {
        // First Google login — auto-create a profile
        const baseUsername = (user.email || user.displayName || 'user')
          .split('@')[0]
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '');
        const username = (baseUsername || 'user') + '_' + user.uid.slice(0, 5);

        await docRef.set({
          name: user.displayName || 'Google User',
          username,
          role: 'user',
          photoURL: user.photoURL || null,
          email: user.email || null,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        const newDoc = await docRef.get();
        setSession({ ...newDoc.data() });
      } else {
        // Existing user — restore session from Firestore profile
        setSession({ ...doc.data() });
      }

      return { success: true };
    } catch (e) {
      if (e.code === 'auth/popup-closed-by-user' || e.code === 'auth/cancelled-popup-request') {
        return { success: false, message: '' }; // User dismissed — show no error
      }
      console.error('[SpotFinder] Google sign-in error:', e);
      return { success: false, message: 'Google sign-in failed. Please try again.' };
    }
  };

  // ------------------------------------------------------------------
  // ADMIN ACCOUNTS (stored in Firestore users collection, role:'admin')
  // ------------------------------------------------------------------
  const getAdmins = async () => {
    try {
      const snap = await usersCol().where('role', '==', 'admin').get();
      return snap.docs.map(d => ({ ...d.data(), _id: d.id }));
    } catch {
      return [];
    }
  };

  // Sync version used by renderAdminAccounts which needs the list immediately.
  // We cache the last-loaded admins in memory for that purpose.
  let _cachedAdmins = [];
  const getAdminsSync = () => _cachedAdmins;

  const refreshAdminsCache = async () => {
    _cachedAdmins = await getAdmins();
  };

  const loginAdmin = async (username, password) => {
    try {
      const snap = await usersCol()
        .where('role', '==', 'admin')
        .where('username', '==', username.toLowerCase())
        .get();
      if (snap.empty) return { success: false, message: 'Invalid admin credentials.' };
      const admin = snap.docs[0].data();
      if (admin.password !== password) return { success: false, message: 'Invalid admin credentials.' };
      setSession({ name: admin.name, username: admin.username, role: 'admin' });
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const addAdmin = async (name, username, password) => {
    if (!name || !username || !password) return { success: false, message: 'All fields are required.' };
    try {
      const snap = await usersCol().where('role', '==', 'admin').get();
      if (snap.size >= MAX_ADMINS) return { success: false, message: `Maximum ${MAX_ADMINS} admin accounts allowed.` };
      const exists = snap.docs.some(d => d.data().username === username.toLowerCase());
      if (exists) return { success: false, message: 'Username already exists.' };
      await usersCol().add({
        name,
        username: username.toLowerCase(),
        password,
        role: 'admin',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      await refreshAdminsCache();
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Failed to add admin. Please try again.' };
    }
  };

  const removeAdmin = async (username) => {
    try {
      const snap = await usersCol().where('role', '==', 'admin').get();
      if (snap.size <= 1) return { success: false, message: 'Cannot remove the last admin account.' };
      const doc = snap.docs.find(d => d.data().username === username.toLowerCase());
      if (!doc) return { success: false, message: 'Admin not found.' };
      await usersCol().doc(doc.id).delete();
      await refreshAdminsCache();
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Failed to remove admin.' };
    }
  };

  // ------------------------------------------------------------------
  // PARTNER ACCOUNTS (stored in Firestore users collection, role:'partner')
  // ------------------------------------------------------------------
  const registerPartner = async (name, businessName, username, password) => {
    if (!name || !businessName || !username || !password) return { success: false, message: 'All fields are required.' };
    if (password.length < 4) return { success: false, message: 'Password must be at least 4 characters.' };
    try {
      const snap = await usersCol()
        .where('role', '==', 'partner')
        .where('username', '==', username.toLowerCase())
        .get();
      if (!snap.empty) return { success: false, message: 'Username is already taken.' };
      await usersCol().add({
        name,
        businessName,
        username: username.toLowerCase(),
        password,
        role: 'partner',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  const loginPartner = async (username, password) => {
    try {
      const snap = await usersCol()
        .where('role', '==', 'partner')
        .where('username', '==', username.toLowerCase())
        .get();
      if (snap.empty) return { success: false, message: 'Invalid partner credentials.' };
      const partner = snap.docs[0].data();
      if (partner.password !== password) return { success: false, message: 'Invalid partner credentials.' };
      setSession({ name: partner.name, businessName: partner.businessName, username: partner.username, role: 'partner' });
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  // ------------------------------------------------------------------
  // AREAS & LISTINGS (Firestore `areas` collection)
  // Each document = one area with embedded spots[] and restaurants[]
  // ------------------------------------------------------------------
  const getAreas = () => {
    return window.COIMBATORE_DATA ? window.COIMBATORE_DATA.areas : [];
  };

  const addArea = async (area) => {
    if (!window.COIMBATORE_DATA) return;
    const order = window.COIMBATORE_DATA.areas.length;
    await areasCol().doc(area.id).set({ ...area, _order: order });
    window.COIMBATORE_DATA.areas.push(area);
  };

  const addListing = async (areaId, category, item, ownerUsername = null) => {
    if (!window.COIMBATORE_DATA) return;
    const area = window.COIMBATORE_DATA.areas.find(a => a.id === areaId);
    if (!area) return;

    if (ownerUsername) item._owner = ownerUsername;

    if (category === 'spots') {
      area.spots.push(item);
    } else {
      area.restaurants.push(item);
    }

    // Persist the full updated area document to Firestore
    await areasCol().doc(areaId).set({ ...area }, { merge: false });
  };

  const deleteListing = async (areaId, category, itemId) => {
    if (!window.COIMBATORE_DATA) return;
    const area = window.COIMBATORE_DATA.areas.find(a => a.id === areaId);
    if (!area) return;

    if (category === 'spots') {
      area.spots = area.spots.filter(s => s.id !== itemId);
    } else {
      area.restaurants = area.restaurants.filter(r => r.id !== itemId);
    }

    await areasCol().doc(areaId).set({ ...area }, { merge: false });
  };

  const getMyListings = (ownerUsername) => {
    const results = [];
    if (!window.COIMBATORE_DATA) return results;
    window.COIMBATORE_DATA.areas.forEach(area => {
      area.spots.forEach(spot => {
        if (spot._owner === ownerUsername) {
          results.push({ item: spot, areaId: area.id, areaName: area.name, category: 'spots' });
        }
      });
      area.restaurants.forEach(rest => {
        if (rest._owner === ownerUsername) {
          results.push({ item: rest, areaId: area.id, areaName: area.name, category: 'restaurants' });
        }
      });
    });
    return results;
  };

  // ------------------------------------------------------------------
  // REVIEWS (Firestore `reviews` collection)
  // ------------------------------------------------------------------
  let _cachedReviews = []; // loaded on startup / invalidated on write

  const loadReviews = async () => {
    try {
      const snap = await reviewsCol().orderBy('date', 'desc').get();
      _cachedReviews = snap.docs.map(d => ({ ...d.data(), id: d.id }));
    } catch {
      _cachedReviews = [];
    }
  };

  const getReviews = (areaId, category, itemId) => {
    return _cachedReviews
      .filter(r => r.areaId === areaId && r.category === category && r.itemId === itemId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const addReview = async (areaId, category, itemId, rating, text) => {
    const session = getSession();
    if (!session) return { success: false, message: 'You must be logged in to post a review.' };
    if (!rating || rating < 1 || rating > 5) return { success: false, message: 'Please select a star rating.' };
    if (!text || text.trim().length < 5) return { success: false, message: 'Review text must be at least 5 characters.' };

    const review = {
      areaId,
      category,
      itemId,
      rating: Number(rating),
      text: text.trim(),
      name: session.name,
      username: session.username,
      date: new Date().toISOString()
    };

    try {
      const ref = await reviewsCol().add(review);
      _cachedReviews.unshift({ ...review, id: ref.id });
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Failed to post review. Please try again.' };
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await reviewsCol().doc(reviewId).delete();
      _cachedReviews = _cachedReviews.filter(r => r.id !== reviewId);
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Failed to delete review.' };
    }
  };

  const getAverageRating = (areaId, category, itemId) => {
    const reviews = getReviews(areaId, category, itemId);
    if (reviews.length === 0) return null;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      average: (sum / reviews.length).toFixed(1),
      count: reviews.length
    };
  };

  // ------------------------------------------------------------------
  // FAVORITES (Firestore `favorites` collection)
  // Document ID = username, field `items` = array of {areaId, category, itemId}
  // ------------------------------------------------------------------
  let _cachedFavs = {}; // { username: [{areaId, category, itemId}, ...] }

  const loadFavorites = async () => {
    try {
      const snap = await favoritesCol().get();
      _cachedFavs = {};
      snap.docs.forEach(d => {
        _cachedFavs[d.id] = d.data().items || [];
      });
    } catch {
      _cachedFavs = {};
    }
  };

  const getFavorites = () => {
    const session = getSession();
    if (!session) return [];
    return _cachedFavs[session.username] || [];
  };

  const isFavorite = (areaId, category, itemId) => {
    const favs = getFavorites();
    return favs.some(f => f.areaId === areaId && f.category === category && f.itemId === itemId);
  };

  const getLikeCount = (areaId, category, itemId) => {
    let count = 0;
    Object.values(_cachedFavs).forEach(items => {
      if (Array.isArray(items)) {
        const found = items.some(f => f.areaId === areaId && f.category === category && f.itemId === itemId);
        if (found) count++;
      }
    });
    return count;
  };

  const toggleFavorite = async (areaId, category, itemId) => {
    const session = getSession();
    if (!session) return { success: false, message: 'Login required.' };

    const username = session.username;
    if (!_cachedFavs[username]) _cachedFavs[username] = [];

    const idx = _cachedFavs[username].findIndex(
      f => f.areaId === areaId && f.category === category && f.itemId === itemId
    );

    let added;
    if (idx === -1) {
      _cachedFavs[username].push({ areaId, category, itemId });
      added = true;
    } else {
      _cachedFavs[username].splice(idx, 1);
      added = false;
    }

    try {
      await favoritesCol().doc(username).set({ items: _cachedFavs[username] });
      return { success: true, added };
    } catch (e) {
      return { success: true, added }; // optimistic – cached version is still updated
    }
  };

  // ------------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------------
  const init = () => {
    // Firebase Auth state listener – restores user session on page refresh
    if (window.sfAuth) {
      window.sfAuth.onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          const currentSession = getSession();
          if (!currentSession || currentSession.role !== 'user') {
            try {
              const doc = await usersCol().doc(firebaseUser.uid).get();
              if (doc.exists) {
                setSession(doc.data());
                if (window.location.hash === '#/login' || !window.location.hash || window.location.hash === '#') {
                  window.location.hash = '#/';
                } else if (window.router) {
                  window.router.handleRoute();
                }
              }
            } catch (e) {
              console.warn('[SpotFinder] Could not restore Firebase session:', e);
            }
          }
        } else {
          const currentSession = getSession();
          if (currentSession && currentSession.role === 'user') {
            clearSession();
            if (window.router) window.router.handleRoute();
          }
        }
      });
    }
  };

  init();

  // ------------------------------------------------------------------
  // PUBLIC API
  // ------------------------------------------------------------------
  return {
    MAX_ADMINS,
    slugify,
    isLoggedIn,
    currentUser,
    isAdmin,
    isPartner,
    logout,
    // Init
    loadAllData,
    loadReviews,
    loadFavorites,
    refreshAdminsCache,
    getAdminsSync,
    // Users
    registerUser,
    loginUser,
    loginWithGoogle,
    // Admins
    getAdmins,
    loginAdmin,
    addAdmin,
    removeAdmin,
    // Partners
    registerPartner,
    loginPartner,
    // Data
    getAreas,
    addArea,
    addListing,
    deleteListing,
    getMyListings,
    // Reviews
    getReviews,
    addReview,
    deleteReview,
    getAverageRating,
    // Favorites
    getFavorites,
    isFavorite,
    toggleFavorite,
    getLikeCount
  };
})();

// Global registration
window.SpotFinderAuth = SpotFinderAuth;

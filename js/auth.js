/* -------------------------------------------------------------
 * SPOT FINDER - Authentication & Data Management System
 * Handles users, admins, partners, favorites, reviews, and data
 * ------------------------------------------------------------- */

const SpotFinderAuth = (() => {

  // ------------------------------------------------------------------
  // CONSTANTS
  // ------------------------------------------------------------------
  const MAX_ADMINS = 5;
  const STORAGE_KEYS = {
    USERS: 'sf_users',
    ADMINS: 'sf_admins',
    PARTNERS: 'sf_partners',
    SESSION: 'sf_session',
    REVIEWS: 'sf_reviews',
    FAVORITES: 'sf_favorites',
    CUSTOM_DATA: 'sf_custom_data'
  };

  // ------------------------------------------------------------------
  // UTILITY: LOCAL STORAGE
  // ------------------------------------------------------------------
  const load = (key, fallback = null) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  };

  const save = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota */ }
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
  // SESSION MANAGEMENT
  // ------------------------------------------------------------------
  const getSession = () => load(STORAGE_KEYS.SESSION, null);

  const setSession = (user) => save(STORAGE_KEYS.SESSION, user);

  const clearSession = () => localStorage.removeItem(STORAGE_KEYS.SESSION);

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
    clearSession(); // Clear localStorage session immediately (sync)
    if (session && session.role === 'user' && window.sfAuth) {
      window.sfAuth.signOut().catch(() => {}); // Firebase sign-out (fire & forget)
    }
  };

  // ------------------------------------------------------------------
  // USER ACCOUNTS
  // ------------------------------------------------------------------
  const getUsers = () => load(STORAGE_KEYS.USERS, []);
  const saveUsers = (users) => save(STORAGE_KEYS.USERS, users);

  // ---- FIREBASE-BACKED USER REGISTRATION ----
  const registerUser = async (name, username, password) => {
    if (!name || !username || !password) return { success: false, message: 'All fields are required.' };
    if (password.length < 6) return { success: false, message: 'Password must be at least 6 characters.' };
    if (!window.sfAuth || !window.sfDb) return { success: false, message: 'Service unavailable. Please refresh.' };

    const email = `${username.toLowerCase()}@spotfinder.app`;
    try {
      const cred = await window.sfAuth.createUserWithEmailAndPassword(email, password);
      // Save full profile to Firestore
      await window.sfDb.collection('users').doc(cred.user.uid).set({
        name,
        username: username.toLowerCase(),
        role: 'user'
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

  // ---- FIREBASE-BACKED USER LOGIN ----
  const loginUser = async (username, password) => {
    if (!window.sfAuth || !window.sfDb) return { success: false, message: 'Service unavailable. Please refresh.' };

    const email = `${username.toLowerCase()}@spotfinder.app`;
    try {
      const cred = await window.sfAuth.signInWithEmailAndPassword(email, password);
      // Fetch profile from Firestore and cache in localStorage session
      const doc = await window.sfDb.collection('users').doc(cred.user.uid).get();
      if (doc.exists) {
        const profile = doc.data();
        setSession({ name: profile.name, username: profile.username, role: 'user' });
      }
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Invalid username or password.' };
    }
  };

  // ------------------------------------------------------------------
  // ADMIN ACCOUNTS
  // ------------------------------------------------------------------
  const getAdmins = () => {
    const stored = load(STORAGE_KEYS.ADMINS, null);
    if (stored && stored.length > 0) return stored;
    // Seed a default admin if none exist
    const defaults = [{ name: 'Admin', username: 'admin', password: 'admin123', role: 'admin' }];
    save(STORAGE_KEYS.ADMINS, defaults);
    return defaults;
  };

  const saveAdmins = (admins) => save(STORAGE_KEYS.ADMINS, admins);

  const loginAdmin = (username, password) => {
    const admins = getAdmins();
    const admin = admins.find(a => a.username === username.toLowerCase() && a.password === password);
    if (!admin) return { success: false, message: 'Invalid admin credentials.' };
    setSession({ name: admin.name, username: admin.username, role: 'admin' });
    return { success: true };
  };

  const addAdmin = (name, username, password) => {
    const admins = getAdmins();
    if (admins.length >= MAX_ADMINS) return { success: false, message: `Maximum ${MAX_ADMINS} admin accounts allowed.` };
    if (!name || !username || !password) return { success: false, message: 'All fields are required.' };
    if (admins.some(a => a.username.toLowerCase() === username.toLowerCase())) {
      return { success: false, message: 'Username already exists.' };
    }
    admins.push({ name, username: username.toLowerCase(), password, role: 'admin' });
    saveAdmins(admins);
    return { success: true };
  };

  const removeAdmin = (username) => {
    const admins = getAdmins();
    if (admins.length <= 1) return { success: false, message: 'Cannot remove the last admin account.' };
    const updated = admins.filter(a => a.username !== username.toLowerCase());
    if (updated.length === admins.length) return { success: false, message: 'Admin not found.' };
    saveAdmins(updated);
    return { success: true };
  };

  // ------------------------------------------------------------------
  // PARTNER ACCOUNTS
  // ------------------------------------------------------------------
  const getPartners = () => load(STORAGE_KEYS.PARTNERS, []);
  const savePartners = (partners) => save(STORAGE_KEYS.PARTNERS, partners);

  const registerPartner = (name, businessName, username, password) => {
    if (!name || !businessName || !username || !password) return { success: false, message: 'All fields are required.' };
    if (password.length < 4) return { success: false, message: 'Password must be at least 4 characters.' };

    const partners = getPartners();
    if (partners.some(p => p.username.toLowerCase() === username.toLowerCase())) {
      return { success: false, message: 'Username is already taken.' };
    }

    partners.push({ name, businessName, username: username.toLowerCase(), password, role: 'partner' });
    savePartners(partners);
    return { success: true };
  };

  const loginPartner = (username, password) => {
    const partners = getPartners();
    const partner = partners.find(p => p.username === username.toLowerCase() && p.password === password);
    if (!partner) return { success: false, message: 'Invalid partner credentials.' };
    setSession({ name: partner.name, businessName: partner.businessName, username: partner.username, role: 'partner' });
    return { success: true };
  };

  // ------------------------------------------------------------------
  // DATA MANAGEMENT (Areas, Spots, Restaurants)
  // ------------------------------------------------------------------
  const getCustomData = () => load(STORAGE_KEYS.CUSTOM_DATA, null);
  const saveCustomData = (data) => save(STORAGE_KEYS.CUSTOM_DATA, data);

  // Returns merged base data + custom-added data
  const getAreas = () => {
    const customData = getCustomData();
    if (customData) {
      return customData.areas;
    }
    return window.COIMBATORE_DATA ? window.COIMBATORE_DATA.areas : [];
  };

  // Sync in-memory COIMBATORE_DATA with localStorage custom data
  const syncDataToMemory = () => {
    const customData = getCustomData();
    if (customData && window.COIMBATORE_DATA) {
      window.COIMBATORE_DATA.areas = customData.areas;
    }
  };

  const addArea = (area) => {
    if (!window.COIMBATORE_DATA) return;
    window.COIMBATORE_DATA.areas.push(area);
    saveCustomData({ areas: window.COIMBATORE_DATA.areas });
  };

  const addListing = (areaId, category, item, ownerUsername = null) => {
    if (!window.COIMBATORE_DATA) return;
    const area = window.COIMBATORE_DATA.areas.find(a => a.id === areaId);
    if (!area) return;

    if (ownerUsername) item._owner = ownerUsername;

    if (category === 'spots') {
      area.spots.push(item);
    } else {
      area.restaurants.push(item);
    }

    saveCustomData({ areas: window.COIMBATORE_DATA.areas });
  };

  const deleteListing = (areaId, category, itemId) => {
    if (!window.COIMBATORE_DATA) return;
    const area = window.COIMBATORE_DATA.areas.find(a => a.id === areaId);
    if (!area) return;

    if (category === 'spots') {
      area.spots = area.spots.filter(s => s.id !== itemId);
    } else {
      area.restaurants = area.restaurants.filter(r => r.id !== itemId);
    }

    saveCustomData({ areas: window.COIMBATORE_DATA.areas });
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
  // REVIEWS
  // ------------------------------------------------------------------
  const getReviews = (areaId, category, itemId) => {
    const all = load(STORAGE_KEYS.REVIEWS, []);
    return all.filter(r => r.areaId === areaId && r.category === category && r.itemId === itemId)
              .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const addReview = (areaId, category, itemId, rating, text) => {
    const session = getSession();
    if (!session) return { success: false, message: 'You must be logged in to post a review.' };
    if (!rating || rating < 1 || rating > 5) return { success: false, message: 'Please select a star rating.' };
    if (!text || text.trim().length < 5) return { success: false, message: 'Review text must be at least 5 characters.' };

    const all = load(STORAGE_KEYS.REVIEWS, []);

    const review = {
      id: `review-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      areaId,
      category,
      itemId,
      rating: Number(rating),
      text: text.trim(),
      name: session.name,
      username: session.username,
      date: new Date().toISOString()
    };

    all.push(review);
    save(STORAGE_KEYS.REVIEWS, all);
    return { success: true };
  };

  const deleteReview = (reviewId) => {
    const all = load(STORAGE_KEYS.REVIEWS, []);
    const updated = all.filter(r => r.id !== reviewId);
    save(STORAGE_KEYS.REVIEWS, updated);
    return { success: true };
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
  // FAVORITES
  // ------------------------------------------------------------------
  const getFavorites = () => {
    const session = getSession();
    if (!session) return [];
    const all = load(STORAGE_KEYS.FAVORITES, {});
    return all[session.username] || [];
  };

  const isFavorite = (areaId, category, itemId) => {
    const favs = getFavorites();
    return favs.some(f => f.areaId === areaId && f.category === category && f.itemId === itemId);
  };

  const toggleFavorite = (areaId, category, itemId) => {
    const session = getSession();
    if (!session) return { success: false, message: 'Login required.' };

    const all = load(STORAGE_KEYS.FAVORITES, {});
    if (!all[session.username]) all[session.username] = [];

    const idx = all[session.username].findIndex(
      f => f.areaId === areaId && f.category === category && f.itemId === itemId
    );

    let added;
    if (idx === -1) {
      all[session.username].push({ areaId, category, itemId });
      added = true;
    } else {
      all[session.username].splice(idx, 1);
      added = false;
    }

    save(STORAGE_KEYS.FAVORITES, all);
    return { success: true, added };
  };

  // ------------------------------------------------------------------
  // INIT: Restore custom data on page load
  // ------------------------------------------------------------------
  const init = () => {
    syncDataToMemory();

    // ---- FIREBASE AUTH STATE LISTENER ----
    // Restores session automatically after a page refresh if Firebase still has the user logged in
    if (window.sfAuth) {
      window.sfAuth.onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          const currentSession = getSession();
          // Only restore if there's no active user session in localStorage
          if (!currentSession || currentSession.role !== 'user') {
            try {
              const doc = await window.sfDb.collection('users').doc(firebaseUser.uid).get();
              if (doc.exists) {
                setSession(doc.data());
                // Redirect away from login page or re-run the router
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
          // Firebase signed out — also clear localStorage user session
          const currentSession = getSession();
          if (currentSession && currentSession.role === 'user') {
            clearSession();
            if (window.router) window.router.handleRoute();
          }
        }
      });
    }
  };

  // Run init immediately
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
    // Users
    registerUser,
    loginUser,
    // Admins
    getAdmins,
    loginAdmin,
    addAdmin,
    removeAdmin,
    // Partners
    registerPartner,
    loginPartner,
    // Data
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
    toggleFavorite
  };
})();

// Global registration
window.SpotFinderAuth = SpotFinderAuth;

/* -------------------------------------------------------------
 * SPOT FINDER - Auth & Data Persistence Layer
 * Handles Admin login (max 5 accounts) + User login/registration
 * and merges admin-added Places/Hotels into COIMBATORE_DATA.
 *
 * NOTE: This is a front-end-only project (no server/database).
 * Credentials and custom data are stored in the browser's
 * localStorage. This is fine for a college project / demo but
 * is NOT secure for a real production login system, since
 * anyone can view the source or browser storage.
 * ------------------------------------------------------------- */

const SpotFinderAuth = {

  MAX_ADMINS: 5,

  KEYS: {
    ADMINS: 'sf_admins',
    USERS: 'sf_users',
    SESSION: 'sf_session',
    CUSTOM_AREAS: 'sf_custom_areas',
    CUSTOM_LISTINGS: 'sf_custom_listings',
    INTRO_SEEN: 'sf_intro_seen'
  },

  // -----------------------------------------------------------
  // INITIAL SEEDING
  // -----------------------------------------------------------
  init() {
    if (!localStorage.getItem(this.KEYS.ADMINS)) {
      const defaultAdmin = [{
        name: 'Super Admin',
        username: 'admin',
        password: 'admin123'
      }];
      localStorage.setItem(this.KEYS.ADMINS, JSON.stringify(defaultAdmin));
    }
    if (!localStorage.getItem(this.KEYS.USERS)) {
      localStorage.setItem(this.KEYS.USERS, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.KEYS.CUSTOM_AREAS)) {
      localStorage.setItem(this.KEYS.CUSTOM_AREAS, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.KEYS.CUSTOM_LISTINGS)) {
      localStorage.setItem(this.KEYS.CUSTOM_LISTINGS, JSON.stringify([]));
    }
    this.mergeCustomDataIntoGlobal();
  },

  // -----------------------------------------------------------
  // SESSION
  // -----------------------------------------------------------
  getSession() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.SESSION));
    } catch (e) {
      return null;
    }
  },

  isLoggedIn() {
    return !!this.getSession();
  },

  isAdmin() {
    const s = this.getSession();
    return !!s && s.role === 'admin';
  },

  currentUser() {
    return this.getSession();
  },

  logout() {
    localStorage.removeItem(this.KEYS.SESSION);
  },

  // -----------------------------------------------------------
  // ADMIN LOGIN / MANAGEMENT (capped at MAX_ADMINS)
  // -----------------------------------------------------------
  getAdmins() {
    return JSON.parse(localStorage.getItem(this.KEYS.ADMINS)) || [];
  },

  saveAdmins(list) {
    localStorage.setItem(this.KEYS.ADMINS, JSON.stringify(list));
  },

  loginAdmin(username, password) {
    const admins = this.getAdmins();
    const match = admins.find(a => a.username.toLowerCase() === username.toLowerCase() && a.password === password);
    if (!match) return { success: false, message: 'Invalid admin username or password.' };

    localStorage.setItem(this.KEYS.SESSION, JSON.stringify({
      role: 'admin',
      username: match.username,
      name: match.name
    }));
    return { success: true };
  },

  addAdmin(name, username, password) {
    const admins = this.getAdmins();
    if (admins.length >= this.MAX_ADMINS) {
      return { success: false, message: `Admin limit reached. Only ${this.MAX_ADMINS} admin accounts are allowed.` };
    }
    if (admins.some(a => a.username.toLowerCase() === username.toLowerCase())) {
      return { success: false, message: 'That admin username is already taken.' };
    }
    if (!name || !username || !password) {
      return { success: false, message: 'All fields are required.' };
    }
    admins.push({ name, username, password });
    this.saveAdmins(admins);
    return { success: true };
  },

  removeAdmin(username) {
    let admins = this.getAdmins();
    if (admins.length <= 1) {
      return { success: false, message: 'At least one admin account must remain.' };
    }
    admins = admins.filter(a => a.username.toLowerCase() !== username.toLowerCase());
    this.saveAdmins(admins);
    return { success: true };
  },

  // -----------------------------------------------------------
  // USER LOGIN / REGISTRATION
  // -----------------------------------------------------------
  getUsers() {
    return JSON.parse(localStorage.getItem(this.KEYS.USERS)) || [];
  },

  saveUsers(list) {
    localStorage.setItem(this.KEYS.USERS, JSON.stringify(list));
  },

  registerUser(name, username, password) {
    const users = this.getUsers();
    if (!name || !username || !password) {
      return { success: false, message: 'All fields are required.' };
    }
    if (password.length < 4) {
      return { success: false, message: 'Password must be at least 4 characters.' };
    }
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      return { success: false, message: 'That username is already taken.' };
    }
    users.push({ name, username, password });
    this.saveUsers(users);
    return { success: true };
  },

  loginUser(username, password) {
    const users = this.getUsers();
    const match = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
    if (!match) return { success: false, message: 'Invalid username or password.' };

    localStorage.setItem(this.KEYS.SESSION, JSON.stringify({
      role: 'user',
      username: match.username,
      name: match.name
    }));
    return { success: true };
  },

  // -----------------------------------------------------------
  // CUSTOM PLACES / HOTELS (added by Admins)
  // -----------------------------------------------------------
  getCustomAreas() {
    return JSON.parse(localStorage.getItem(this.KEYS.CUSTOM_AREAS)) || [];
  },

  getCustomListings() {
    return JSON.parse(localStorage.getItem(this.KEYS.CUSTOM_LISTINGS)) || [];
  },

  addArea(area) {
    const areas = this.getCustomAreas();
    areas.push(area);
    localStorage.setItem(this.KEYS.CUSTOM_AREAS, JSON.stringify(areas));
    this.mergeCustomDataIntoGlobal();
  },

  // category: 'spots' | 'restaurants'
  addListing(areaId, category, item) {
    const listings = this.getCustomListings();
    listings.push({ areaId, category, item });
    localStorage.setItem(this.KEYS.CUSTOM_LISTINGS, JSON.stringify(listings));
    this.mergeCustomDataIntoGlobal();
  },

  deleteListing(areaId, category, itemId) {
    let listings = this.getCustomListings();
    listings = listings.filter(l => !(l.areaId === areaId && l.category === category && l.item.id === itemId));
    localStorage.setItem(this.KEYS.CUSTOM_LISTINGS, JSON.stringify(listings));
    this.mergeCustomDataIntoGlobal();
  },

  // Merges custom areas + listings from localStorage into the
  // live window.COIMBATORE_DATA object used across the app.
  mergeCustomDataIntoGlobal() {
    if (!window.COIMBATORE_DATA) return;

    const customAreas = this.getCustomAreas();
    customAreas.forEach(area => {
      if (!window.COIMBATORE_DATA.areas.some(a => a.id === area.id)) {
        window.COIMBATORE_DATA.areas.push({ ...area, spots: area.spots || [], restaurants: area.restaurants || [] });
      }
    });

    const customListings = this.getCustomListings();
    customListings.forEach(({ areaId, category, item }) => {
      const area = window.COIMBATORE_DATA.areas.find(a => a.id === areaId);
      if (!area) return;
      const bucket = category === 'spots' ? area.spots : area.restaurants;
      if (!bucket.some(existing => existing.id === item.id)) {
        bucket.push(item);
      }
    });
  },

  slugify(text) {
    return text.toString().toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
};

window.SpotFinderAuth = SpotFinderAuth;
SpotFinderAuth.init();

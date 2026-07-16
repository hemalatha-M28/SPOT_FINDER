/* -------------------------------------------------------------
 * SPOT FINDER - Router System
 * Manages view rendering and GSAP transition effects
 * ------------------------------------------------------------- */

class SpotFinderRouter {
  constructor() {
    this.appView = document.getElementById('app-view');
    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    // Initial page load routing
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      this.handleRoute();
    } else {
      window.addEventListener('DOMContentLoaded', () => this.handleRoute());
    }
  }

  async handleRoute() {
    let hash = window.location.hash || '#/';

    // -----------------------------------------------------------
    // AUTH GUARD
    // Everything except #/login requires a logged-in session.
    // Admin-only pages require an admin session.
    // -----------------------------------------------------------
    const isLoggedIn = window.SpotFinderAuth && window.SpotFinderAuth.isLoggedIn();
    const isAdmin = window.SpotFinderAuth && window.SpotFinderAuth.isAdmin();
    const isPartner = window.SpotFinderAuth && window.SpotFinderAuth.isPartner();

    if (hash.startsWith('#/admin') && !isAdmin) {
      window.location.hash = isLoggedIn ? '#/' : '#/login';
      return;
    }
    if (hash.startsWith('#/partner') && !isPartner) {
      window.location.hash = isLoggedIn ? '#/' : '#/login';
      return;
    }
    if (!isLoggedIn && hash !== '#/login') {
      window.location.hash = '#/login';
      return;
    }
    if (isLoggedIn && hash === '#/login') {
      window.location.hash = '#/';
      return;
    }

    // Animate view out
    await this.animateOut();

    // Reset scroll position
    window.scrollTo({ top: 0, behavior: 'instant' });

    // -----------------------------------------------------------
    // LOAD ALL DATA FROM FIRESTORE before rendering
    // -----------------------------------------------------------
    if (hash !== '#/login' && window.SpotFinderAuth) {
      try {
        await window.SpotFinderAuth.loadAllData();
        await window.SpotFinderAuth.loadReviews();
        await window.SpotFinderAuth.loadFavorites();
        await window.SpotFinderAuth.refreshAdminsCache();
      } catch (e) {
        console.warn('[SpotFinder] Data load error:', e);
      }
    }

    // Routing conditions
    if (hash === '#/login') {
      this.renderLogin();
    } else if (hash === '#/admin') {
      await this.renderAdminDashboard();
    } else if (hash === '#/admin/manage') {
      this.renderAdminManage();
    } else if (hash === '#/admin/accounts') {
      await this.renderAdminAccounts();
    } else if (hash === '#/partner') {
      this.renderPartnerDashboard();
    } else if (hash === '#/favorites') {
      this.renderFavorites();
    } else if (hash === '#/' || hash === '#home') {
      this.renderHome();
      this.initHeroSlider();
    } else if (hash.startsWith('#/area/') && hash.includes('/list/')) {
      // Route: #/area/:areaId/list/:category
      const parts = hash.split('/');
      const areaId = parts[2];
      const category = parts[4];
      this.renderPlacesList(areaId, category);
    } else if (hash.startsWith('#/area/') && hash.includes('/details/')) {
      // Route: #/area/:areaId/details/:category/:itemId
      const parts = hash.split('/');
      const areaId = parts[2];
      const category = parts[4];
      const itemId = parts[5];
      this.renderPlaceDetails(areaId, category, itemId);
    } else if (hash.startsWith('#/area/')) {
      // Route: #/area/:areaId
      const areaId = hash.split('#/area/')[1];
      this.renderCategoryChoice(areaId);
    } else {
      // Fallback to Home
      this.renderHome();
    }

    // Update active nav links
    this.updateActiveNav(hash);
    this.updateAuthNav();

    // Animate view in
    await this.animateIn();

    // Trigger animations bootstrapper if existing
    if (window.SpotFinderAnimations) {
      window.SpotFinderAnimations.initScrollAnimations();
    }
    
    // Dispatch route changed event
    window.dispatchEvent(new CustomEvent('routechanged'));
  }

  animateOut() {
    return new Promise(resolve => {
      gsap.to(this.appView, {
        opacity: 0,
        y: 15,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: resolve
      });
    });
  }

  animateIn() {
    return new Promise(resolve => {
      gsap.to(this.appView, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out',
        onComplete: resolve
      });
    });
  }

  updateActiveNav(hash) {
    const navHome = document.getElementById('nav-home');
    const navExplore = document.getElementById('nav-explore');
    
    if (!navHome || !navExplore) return;

    if (hash === '#/' || hash === '#home') {
      navHome.classList.add('active');
      navExplore.classList.remove('active');
    } else {
      navHome.classList.remove('active');
      // For any subpages, highlight Explore
      navExplore.classList.add('active');
    }
  }

  // Shows/hides nav auth controls (Login/Logout/Admin link) based on session
  updateAuthNav() {
    const authSlot = document.getElementById('nav-auth-slot');
    if (!authSlot) return;

    const auth = window.SpotFinderAuth;
    if (!auth || !auth.isLoggedIn()) {
      authSlot.innerHTML = '';
      return;
    }

    const user = auth.currentUser();
    const adminLink = auth.isAdmin()
      ? `<a href="#/admin" class="nav-link nav-admin-link"><i class="fa-solid fa-user-shield"></i> Admin</a>`
      : '';
    const partnerLink = auth.isPartner()
      ? `<a href="#/partner" class="nav-link nav-admin-link"><i class="fa-solid fa-handshake"></i> Partner Panel</a>`
      : '';
    const favoritesLink = `<a href="#/favorites" class="nav-link"><i class="fa-solid fa-heart"></i> Favorites</a>`;

    authSlot.innerHTML = `
      ${favoritesLink}
      ${adminLink}
      ${partnerLink}
      <span class="nav-user-chip"><i class="fa-solid fa-circle-user"></i> ${user.name}</span>
      <button class="nav-logout-btn" id="nav-logout-btn" title="Log out"><i class="fa-solid fa-right-from-bracket"></i></button>
    `;

    const logoutBtn = document.getElementById('nav-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        auth.logout();
        window.location.hash = '#/login';
      });
    }
  }

  // -----------------------------------------------------------
  // PAGE 0: LOGIN PAGE (Admin + User)
  // -----------------------------------------------------------
  renderLogin() {
    this.appView.innerHTML = `
      <div class="auth-wrapper">
        <div class="auth-card">
          <div class="auth-brand">
            <div class="logo-symbol"><i class="fa-solid fa-compass"></i></div>
            <div class="logo-text">Spot <span>Finder</span></div>
          </div>
          <p class="auth-tagline">Sign in to explore Coimbatore's finest spots &amp; dining</p>

          <div class="auth-tabs">
            <button class="auth-tab active" data-tab="user">User Login</button>
            <button class="auth-tab" data-tab="partner">Partner Login</button>
            <button class="auth-tab" data-tab="admin">Admin Login</button>
          </div>

          <!-- USER LOGIN -->
          <div class="auth-panel active" id="panel-user-login">
            <form id="user-login-form" class="auth-form">
              <input type="text" id="user-login-username" placeholder="Username" required autocomplete="username">
              <input type="password" id="user-login-password" placeholder="Password" required autocomplete="current-password">
              <div class="auth-error" id="user-login-error"></div>
              <button type="submit" class="action-btn-primary auth-submit-btn">Log In</button>
            </form>
            <div class="auth-divider"><span>or</span></div>
            <button class="google-signin-btn" id="google-signin-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              Continue with Google
            </button>
            <p class="auth-switch">New here? <a href="#" id="show-register">Create a user account</a></p>
          </div>

          <!-- USER REGISTER -->
          <div class="auth-panel" id="panel-user-register">
            <form id="user-register-form" class="auth-form">
              <input type="text" id="reg-name" placeholder="Full Name" required>
              <input type="text" id="reg-username" placeholder="Choose a username" required>
              <input type="password" id="reg-password" placeholder="Choose a password" required minlength="6">
              <div class="auth-error" id="user-register-error"></div>
              <div class="auth-success" id="user-register-success"></div>
              <button type="submit" class="action-btn-primary auth-submit-btn">Create Account</button>
            </form>
            <div class="auth-divider"><span>or</span></div>
            <button class="google-signin-btn" id="google-register-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              Sign up with Google
            </button>
            <p class="auth-switch">Already registered? <a href="#" id="show-login">Back to login</a></p>
          </div>

          <!-- PARTNER LOGIN -->
          <div class="auth-panel" id="panel-partner-login">
            <form id="partner-login-form" class="auth-form">
              <input type="text" id="partner-login-username" placeholder="Partner Username" required autocomplete="username">
              <input type="password" id="partner-login-password" placeholder="Password" required autocomplete="current-password">
              <div class="auth-error" id="partner-login-error"></div>
              <button type="submit" class="action-btn-primary auth-submit-btn">Partner Log In</button>
            </form>
            <p class="auth-switch">New business? <a href="#" id="show-partner-register">Register as a Partner</a></p>
          </div>

          <!-- PARTNER REGISTER -->
          <div class="auth-panel" id="panel-partner-register">
            <form id="partner-register-form" class="auth-form">
              <input type="text" id="partner-reg-name" placeholder="Your Full Name" required>
              <input type="text" id="partner-reg-business" placeholder="Business / Hotel Name" required>
              <input type="text" id="partner-reg-username" placeholder="Choose a username" required>
              <input type="password" id="partner-reg-password" placeholder="Choose a password" required minlength="4">
              <div class="auth-error" id="partner-register-error"></div>
              <div class="auth-success" id="partner-register-success"></div>
              <button type="submit" class="action-btn-primary auth-submit-btn">Register Business</button>
            </form>
            <p class="auth-switch">Already a partner? <a href="#" id="show-partner-login">Back to login</a></p>
          </div>

          <!-- ADMIN LOGIN -->
          <div class="auth-panel" id="panel-admin-login">
            <form id="admin-login-form" class="auth-form">
              <input type="text" id="admin-login-username" placeholder="Admin Username" required autocomplete="username">
              <input type="password" id="admin-login-password" placeholder="Admin Password" required autocomplete="current-password">
              <div class="auth-error" id="admin-login-error"></div>
              <button type="submit" class="action-btn-primary auth-submit-btn">Admin Log In</button>
            </form>
            <p class="auth-hint"><i class="fa-solid fa-lock"></i> Access is limited to ${window.SpotFinderAuth.MAX_ADMINS} authorized admin accounts.</p>
          </div>
        </div>
      </div>
    `;

    this.bindLoginEvents();
  }

  bindLoginEvents() {
    const tabs = document.querySelectorAll('.auth-tab');
    const panels = {
      user: document.getElementById('panel-user-login'),
      partner: document.getElementById('panel-partner-login'),
      admin: document.getElementById('panel-admin-login')
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        Object.values(panels).forEach(p => p.classList.remove('active'));
        document.getElementById('panel-user-register').classList.remove('active');
        document.getElementById('panel-partner-register').classList.remove('active');
        panels[tab.dataset.tab].classList.add('active');
      });
    });

    document.getElementById('show-partner-register').addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('panel-partner-login').classList.remove('active');
      document.getElementById('panel-partner-register').classList.add('active');
    });

    document.getElementById('show-partner-login').addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('panel-partner-register').classList.remove('active');
      document.getElementById('panel-partner-login').classList.add('active');
    });

    document.getElementById('partner-login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('partner-login-username').value.trim();
      const password = document.getElementById('partner-login-password').value;
      const errorBox = document.getElementById('partner-login-error');
      const btn = e.target.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing in...';
      const result = await window.SpotFinderAuth.loginPartner(username, password);
      btn.disabled = false;
      btn.innerHTML = 'Partner Log In';
      if (result.success) {
        errorBox.textContent = '';
        window.location.hash = '#/partner';
      } else {
        errorBox.textContent = result.message;
      }
    });

    document.getElementById('partner-register-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('partner-reg-name').value.trim();
      const businessName = document.getElementById('partner-reg-business').value.trim();
      const username = document.getElementById('partner-reg-username').value.trim();
      const password = document.getElementById('partner-reg-password').value;
      const errorBox = document.getElementById('partner-register-error');
      const successBox = document.getElementById('partner-register-success');
      const btn = e.target.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Registering...';
      const result = await window.SpotFinderAuth.registerPartner(name, businessName, username, password);
      btn.disabled = false;
      btn.innerHTML = 'Register Business';
      if (result.success) {
        errorBox.textContent = '';
        successBox.textContent = 'Business registered! You can log in now.';
        setTimeout(() => {
          document.getElementById('panel-partner-register').classList.remove('active');
          document.getElementById('panel-partner-login').classList.add('active');
        }, 900);
      } else {
        successBox.textContent = '';
        errorBox.textContent = result.message;
      }
    });

    document.getElementById('show-register').addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('panel-user-login').classList.remove('active');
      document.getElementById('panel-user-register').classList.add('active');
    });

    document.getElementById('show-login').addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('panel-user-register').classList.remove('active');
      document.getElementById('panel-user-login').classList.add('active');
    });

    document.getElementById('user-login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('user-login-username').value.trim();
      const password = document.getElementById('user-login-password').value;
      const errorBox = document.getElementById('user-login-error');
      const btn = e.target.querySelector('button[type="submit"]');

      // Show loading state
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing in...';

      const result = await window.SpotFinderAuth.loginUser(username, password);

      btn.disabled = false;
      btn.innerHTML = 'Log In';

      if (result.success) {
        errorBox.textContent = '';
        window.location.hash = '#/';
      } else {
        errorBox.textContent = result.message;
      }
    });

    document.getElementById('user-register-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value.trim();
      const username = document.getElementById('reg-username').value.trim();
      const password = document.getElementById('reg-password').value;
      const errorBox = document.getElementById('user-register-error');
      const successBox = document.getElementById('user-register-success');
      const btn = e.target.querySelector('button[type="submit"]');

      // Show loading state
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating account...';

      const result = await window.SpotFinderAuth.registerUser(name, username, password);

      btn.disabled = false;
      btn.innerHTML = 'Create Account';

      if (result.success) {
        errorBox.textContent = '';
        successBox.textContent = 'Account created! You can log in now.';
        setTimeout(() => {
          document.getElementById('panel-user-register').classList.remove('active');
          document.getElementById('panel-user-login').classList.add('active');
        }, 900);
      } else {
        successBox.textContent = '';
        errorBox.textContent = result.message;
      }
    });

    document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('admin-login-username').value.trim();
      const password = document.getElementById('admin-login-password').value;
      const errorBox = document.getElementById('admin-login-error');
      const btn = e.target.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing in...';
      const result = await window.SpotFinderAuth.loginAdmin(username, password);
      btn.disabled = false;
      btn.innerHTML = 'Admin Log In';
      if (result.success) {
        errorBox.textContent = '';
        window.location.hash = '#/admin';
      } else {
        errorBox.textContent = result.message;
      }
    });

    // ---- GOOGLE SIGN-IN HANDLERS ----
    const G_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`;

    const handleGoogleAuth = async (errorElementId) => {
      const result = await window.SpotFinderAuth.loginWithGoogle();
      if (result.success) {
        window.location.hash = '#/';
      } else if (result.message) {
        const errorBox = document.getElementById(errorElementId);
        if (errorBox) errorBox.textContent = result.message;
      }
    };

    const googleSignInBtn = document.getElementById('google-signin-btn');
    if (googleSignInBtn) {
      googleSignInBtn.addEventListener('click', async () => {
        googleSignInBtn.disabled = true;
        googleSignInBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Connecting...';
        await handleGoogleAuth('user-login-error');
        googleSignInBtn.disabled = false;
        googleSignInBtn.innerHTML = G_ICON + ' Continue with Google';
      });
    }

    const googleRegisterBtn = document.getElementById('google-register-btn');
    if (googleRegisterBtn) {
      googleRegisterBtn.addEventListener('click', async () => {
        googleRegisterBtn.disabled = true;
        googleRegisterBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Connecting...';
        await handleGoogleAuth('user-register-error');
        googleRegisterBtn.disabled = false;
        googleRegisterBtn.innerHTML = G_ICON + ' Sign up with Google';
      });
    }
  }


  // -----------------------------------------------------------
  // ADMIN: DASHBOARD
  // -----------------------------------------------------------
  async renderAdminDashboard() {
    const areas = window.COIMBATORE_DATA.areas;
    const totalSpots = areas.reduce((sum, a) => sum + a.spots.length, 0);
    const totalRestaurants = areas.reduce((sum, a) => sum + a.restaurants.length, 0);
    const admins = window.SpotFinderAuth.getAdminsSync();
    const user = window.SpotFinderAuth.currentUser();

    this.appView.innerHTML = `
      <div class="admin-wrapper">
        <div class="admin-header">
          <div>
            <span class="section-subtitle">Welcome, ${user.name}</span>
            <h2 class="section-title" style="text-align:left;">Admin Dashboard</h2>
          </div>
          <a href="#/" class="action-btn-outline"><i class="fa-solid fa-house"></i> View Site</a>
        </div>

        <div class="admin-stats-grid">
          <div class="admin-stat-card">
            <i class="fa-solid fa-map-location-dot"></i>
            <span class="admin-stat-num">${areas.length}</span>
            <span class="admin-stat-label">Areas / Places</span>
          </div>
          <div class="admin-stat-card">
            <i class="fa-solid fa-mountain-sun"></i>
            <span class="admin-stat-num">${totalSpots}</span>
            <span class="admin-stat-label">Tourist Spots</span>
          </div>
          <div class="admin-stat-card">
            <i class="fa-solid fa-utensils"></i>
            <span class="admin-stat-num">${totalRestaurants}</span>
            <span class="admin-stat-label">Restaurants / Hotels</span>
          </div>
          <div class="admin-stat-card">
            <i class="fa-solid fa-user-shield"></i>
            <span class="admin-stat-num">${admins.length} / ${window.SpotFinderAuth.MAX_ADMINS}</span>
            <span class="admin-stat-label">Admin Accounts</span>
          </div>
        </div>

        <div class="admin-actions-grid">
          <a href="#/admin/manage" class="admin-action-card">
            <i class="fa-solid fa-plus"></i>
            <h3>Manage Places &amp; Hotels</h3>
            <p>Add a new place, or add tourist spots and hotels/restaurants to an existing place.</p>
          </a>
          <a href="#/admin/accounts" class="admin-action-card">
            <i class="fa-solid fa-user-shield"></i>
            <h3>Manage Admin Accounts</h3>
            <p>View, add, or remove admin accounts (maximum ${window.SpotFinderAuth.MAX_ADMINS}).</p>
          </a>
        </div>
      </div>
    `;
  }

  // -----------------------------------------------------------
  // ADMIN: MANAGE PLACES & HOTELS
  // -----------------------------------------------------------
  renderAdminManage() {
    const areas = window.COIMBATORE_DATA.areas;

    this.appView.innerHTML = `
      <div class="admin-wrapper">
        <div class="admin-header">
          <div>
            <span class="section-subtitle"><a href="#/admin" style="color:var(--color-secondary); font-weight:700;">Admin</a> &gt; Manage</span>
            <h2 class="section-title" style="text-align:left;">Places &amp; Hotels</h2>
          </div>
        </div>

        <div class="admin-panel-grid">
          <!-- FORM -->
          <div class="admin-form-card">
            <h3><i class="fa-solid fa-square-plus"></i> Add New Listing</h3>
            <form id="admin-listing-form" class="auth-form">
              <label class="admin-label">Place</label>
              <select id="listing-area-select" class="admin-select">
                <option value="">+ Add a New Place</option>
                ${areas.map(a => `<option value="${a.id}">${a.name}</option>`).join('')}
              </select>

              <!-- New Place fields (shown when "+ Add a New Place" selected) -->
              <div id="new-place-fields" class="admin-subfields">
                <div class="form-grid-2">
                  <input type="text" id="new-place-name" placeholder="Place / Area Name (e.g. Peelamedu)">
                  <input type="text" id="new-place-tagline" placeholder="Tagline (e.g. The Tech Hub of Kovai)">
                </div>
                <textarea id="new-place-desc" placeholder="Short description of this area" rows="2"></textarea>
                <div class="form-grid-2">
                  <div class="file-upload-wrapper">
                    <label class="admin-label">Banner Image Upload</label>
                    <input type="file" id="new-place-image-file" accept="image/*">
                  </div>
                  <div class="file-upload-wrapper">
                    <label class="admin-label">or Image URL</label>
                    <input type="text" id="new-place-image-url" placeholder="Paste banner image URL">
                  </div>
                </div>
              </div>

              <div class="form-grid-2">
                <div>
                  <label class="admin-label">Listing Type</label>
                  <select id="listing-category-select" class="admin-select">
                    <option value="spots">Tourist Spot</option>
                    <option value="restaurants">Restaurant / Hotel</option>
                  </select>
                </div>
                <div>
                  <label class="admin-label">Business / Spot Name</label>
                  <input type="text" id="listing-name" placeholder="Name" required style="margin-top: 4px;">
                </div>
              </div>

              <!-- Spot-only fields -->
              <div id="spot-fields" class="admin-subfields">
                <textarea id="spot-desc" placeholder="Description" rows="2"></textarea>
                <div class="form-grid-2">
                  <input type="text" id="spot-location" placeholder="Location / Address">
                  <input type="text" id="spot-entryfee" placeholder="Entry Fee (e.g. Free, ₹20)">
                </div>
                
                <div class="form-grid-2">
                  <div>
                    <label class="admin-label">Operational Days</label>
                    <select id="spot-days-select" class="admin-select">
                      <option value="Everyday">Everyday</option>
                      <option value="Weekdays (Mon-Fri)">Weekdays (Mon-Fri)</option>
                      <option value="Weekends (Sat-Sun)">Weekends (Sat-Sun)</option>
                      <option value="Mon - Sat">Mon - Sat</option>
                      <option value="custom">Custom Days Selection...</option>
                    </select>
                  </div>
                  <div>
                    <label class="admin-label">Specific Date (Optional)</label>
                    <input type="date" id="spot-date" class="admin-input-date-time">
                  </div>
                </div>

                <div id="spot-custom-days-wrapper" style="display:none; gap:0.4rem; justify-content:space-between; margin-bottom:1rem; margin-top: 0.5rem; flex-wrap: wrap; width: 100%;">
                  ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => `
                    <label class="day-checkbox-label">
                      <input type="checkbox" name="spot-custom-days" value="${day}">
                      <span>${day}</span>
                    </label>
                  `).join('')}
                </div>

                <div class="form-grid-2">
                  <div>
                    <label class="admin-label">Timings (Clock Picker - Start & End)</label>
                    <div style="display:flex; gap:0.5rem; align-items:center; width:100%;">
                      <input type="time" id="spot-time-start" class="admin-input-date-time" style="flex:1;">
                      <span style="color:var(--text-muted);">to</span>
                      <input type="time" id="spot-time-end" class="admin-input-date-time" style="flex:1;">
                    </div>
                  </div>
                  <div>
                    <label class="admin-label">Best Time to Visit</label>
                    <input type="text" id="spot-besttime" placeholder="Best Time to Visit (e.g. Evenings)" style="margin-top: 4px;">
                  </div>
                </div>
              </div>

              <!-- Restaurant-only fields -->
              <div id="restaurant-fields" class="admin-subfields" style="display:none;">
                <div class="form-grid-2">
                  <input type="text" id="rest-cuisine" placeholder="Cuisine (e.g. South Indian)">
                  <input type="text" id="rest-price" placeholder="Price Scale (e.g. ₹₹ Moderate)">
                </div>
                <div class="form-grid-2">
                  <input type="text" id="rest-location" placeholder="Address">
                  <input type="text" id="rest-contact" placeholder="Contact Number">
                </div>

                <div class="form-grid-2">
                  <div>
                    <label class="admin-label">Operational Days</label>
                    <select id="rest-days-select" class="admin-select">
                      <option value="Everyday">Everyday</option>
                      <option value="Weekdays (Mon-Fri)">Weekdays (Mon-Fri)</option>
                      <option value="Weekends (Sat-Sun)">Weekends (Sat-Sun)</option>
                      <option value="Mon - Sat">Mon - Sat</option>
                      <option value="custom">Custom Days Selection...</option>
                    </select>
                  </div>
                  <div>
                    <label class="admin-label">Specific Date (Optional)</label>
                    <input type="date" id="rest-date" class="admin-input-date-time">
                  </div>
                </div>

                <div id="rest-custom-days-wrapper" style="display:none; gap:0.4rem; justify-content:space-between; margin-bottom:1rem; margin-top: 0.5rem; flex-wrap: wrap; width: 100%;">
                  ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => `
                    <label class="day-checkbox-label">
                      <input type="checkbox" name="rest-custom-days" value="${day}">
                      <span>${day}</span>
                    </label>
                  `).join('')}
                </div>

                <label class="admin-label">Opening Hours (Clock Picker - Start & End)</label>
                <div style="display:flex; gap:0.5rem; align-items:center; width:100%;">
                  <input type="time" id="rest-time-start" class="admin-input-date-time" style="flex:1;">
                  <span style="color:var(--text-muted);">to</span>
                  <input type="time" id="rest-time-end" class="admin-input-date-time" style="flex:1;">
                </div>
              </div>

              <input type="text" id="listing-mapurl" placeholder="Google Maps URL (optional)">

              <div class="form-grid-2">
                <div class="file-upload-wrapper">
                  <label class="admin-label">Photo Upload</label>
                  <input type="file" id="listing-image-file" accept="image/*">
                </div>
                <div class="file-upload-wrapper">
                  <label class="admin-label">or Image URL</label>
                  <input type="text" id="listing-image-url" placeholder="...or paste an image URL" style="margin-top: 4px;">
                </div>
              </div>

              <div class="auth-error" id="admin-listing-error"></div>
              <div class="auth-success" id="admin-listing-success"></div>
              <button type="submit" class="action-btn-primary auth-submit-btn">Save Listing</button>
            </form>
          </div>

          <!-- EXISTING LISTINGS -->
          <div class="admin-list-card">
            <h3><i class="fa-solid fa-list"></i> Existing Listings</h3>
            <div class="admin-existing-list" id="admin-existing-list">
              ${areas.map(area => `
                <div class="admin-area-group">
                  <h4>${area.name}</h4>
                  ${[...area.spots.map(s => ({...s, category:'spots', areaId:area.id})), ...area.restaurants.map(r => ({...r, category:'restaurants', areaId:area.id}))].map(item => `
                    <div class="admin-existing-item">
                      <img src="${item.image}" alt="${item.name}">
                      <div class="admin-existing-info">
                        <strong>${item.name}</strong>
                        <span>${item.category === 'spots' ? 'Tourist Spot' : 'Restaurant/Hotel'}</span>
                      </div>
                      <button class="admin-delete-btn" data-area="${item.areaId}" data-category="${item.category}" data-id="${item.id}" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  `).join('') || '<p class="admin-empty-note">No listings yet.</p>'}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindAdminManageEvents();
  }

  bindAdminManageEvents() {
    const areaSelect = document.getElementById('listing-area-select');
    const newPlaceFields = document.getElementById('new-place-fields');
    const categorySelect = document.getElementById('listing-category-select');
    const spotFields = document.getElementById('spot-fields');
    const restaurantFields = document.getElementById('restaurant-fields');

    const toggleNewPlaceFields = () => {
      newPlaceFields.style.display = areaSelect.value === '' ? 'flex' : 'none';
    };
    toggleNewPlaceFields();
    areaSelect.addEventListener('change', toggleNewPlaceFields);

    const toggleCategoryFields = () => {
      const isSpot = categorySelect.value === 'spots';
      spotFields.style.display = isSpot ? 'flex' : 'none';
      restaurantFields.style.display = isSpot ? 'none' : 'flex';
    };
    toggleCategoryFields();
    categorySelect.addEventListener('change', toggleCategoryFields);

    // Toggle custom days input grids
    const spotDaysSelect = document.getElementById('spot-days-select');
    const spotCustomDaysWrapper = document.getElementById('spot-custom-days-wrapper');
    if (spotDaysSelect && spotCustomDaysWrapper) {
      spotDaysSelect.addEventListener('change', () => {
        spotCustomDaysWrapper.style.display = spotDaysSelect.value === 'custom' ? 'flex' : 'none';
      });
    }

    const restDaysSelect = document.getElementById('rest-days-select');
    const restCustomDaysWrapper = document.getElementById('rest-custom-days-wrapper');
    if (restDaysSelect && restCustomDaysWrapper) {
      restDaysSelect.addEventListener('change', () => {
        restCustomDaysWrapper.style.display = restDaysSelect.value === 'custom' ? 'flex' : 'none';
      });
    }

    // Helper: read a file input as a data URL (Promise)
    const readFileAsDataUrl = (fileInput) => {
      return new Promise((resolve) => {
        const file = fileInput.files[0];
        if (!file) return resolve(null);
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      });
    };

    document.getElementById('admin-listing-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const errorBox = document.getElementById('admin-listing-error');
      const successBox = document.getElementById('admin-listing-success');
      errorBox.textContent = '';
      successBox.textContent = '';

      const btn = e.target.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

      let areaId = areaSelect.value;

      // Create new place if needed
      if (!areaId) {
        const placeName = document.getElementById('new-place-name').value.trim();
        if (!placeName) {
          errorBox.textContent = 'Please enter a name for the new place.';
          btn.disabled = false; btn.innerHTML = 'Save Listing';
          return;
        }
        const placeTagline = document.getElementById('new-place-tagline').value.trim() || 'Discover this area';
        const placeDesc = document.getElementById('new-place-desc').value.trim() || 'A wonderful area of Coimbatore worth exploring.';
        let bannerImage = await readFileAsDataUrl(document.getElementById('new-place-image-file'));
        if (!bannerImage) bannerImage = document.getElementById('new-place-image-url').value.trim();
        if (!bannerImage) bannerImage = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800';

        areaId = window.SpotFinderAuth.slugify(placeName) || `place-${Date.now()}`;
        if (window.COIMBATORE_DATA.areas.some(a => a.id === areaId)) {
          areaId = `${areaId}-${Date.now()}`;
        }

        await window.SpotFinderAuth.addArea({
          id: areaId,
          name: placeName,
          tagline: placeTagline,
          bannerImage,
          description: placeDesc,
          spots: [],
          restaurants: []
        });
      }

      const category = categorySelect.value;
      const name = document.getElementById('listing-name').value.trim();
      if (!name) {
        errorBox.textContent = 'Please enter a name for the listing.';
        btn.disabled = false; btn.innerHTML = 'Save Listing';
        return;
      }

      let image = await readFileAsDataUrl(document.getElementById('listing-image-file'));
      if (!image) image = document.getElementById('listing-image-url').value.trim();
      if (!image) image = 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=800';

      const mapUrl = document.getElementById('listing-mapurl').value.trim() || `https://maps.google.com/?q=${encodeURIComponent(name + ' Coimbatore')}`;
      const itemId = `${window.SpotFinderAuth.slugify(name)}-${Date.now()}`;

      const formatTimeAMPM = (timeStr) => {
        if (!timeStr) return '';
        const [hours, minutes] = timeStr.split(':');
        let h = parseInt(hours, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        h = h ? h : 12;
        const m = minutes.padStart(2, '0');
        return `${h.toString().padStart(2, '0')}:${m} ${ampm}`;
      };

      const formatTiming = (daysVal, customDaysName, dateVal, startVal, endVal, fallback) => {
        let daysStr = '';
        if (daysVal === 'custom') {
          const checkedDays = Array.from(document.querySelectorAll(`input[name="${customDaysName}"]:checked`)).map(cb => cb.value);
          daysStr = checkedDays.length > 0 ? checkedDays.join(', ') : 'Everyday';
        } else {
          daysStr = daysVal || 'Everyday';
        }

        let timePart = '';
        if (startVal && endVal) {
          timePart = `${formatTimeAMPM(startVal)} - ${formatTimeAMPM(endVal)}`;
        } else {
          timePart = fallback;
        }

        let finalStr = `${daysStr}: ${timePart}`;
        if (dateVal) {
          finalStr += ` (On ${dateVal})`;
        }
        return finalStr;
      };

      let item;
      if (category === 'spots') {
        const daysVal = document.getElementById('spot-days-select').value;
        const dateVal = document.getElementById('spot-date').value;
        const startVal = document.getElementById('spot-time-start').value;
        const endVal = document.getElementById('spot-time-end').value;
        const formattedTimings = formatTiming(daysVal, 'spot-custom-days', dateVal, startVal, endVal, '9:00 AM - 6:00 PM');

        item = {
          id: itemId,
          name,
          description: document.getElementById('spot-desc').value.trim() || 'A great spot to explore in Coimbatore.',
          location: document.getElementById('spot-location').value.trim() || 'Coimbatore',
          entryFee: document.getElementById('spot-entryfee').value.trim() || 'Free',
          timings: formattedTimings,
          bestTime: document.getElementById('spot-besttime').value.trim() || 'Anytime',
          mapUrl,
          image
        };
      } else {
        const daysVal = document.getElementById('rest-days-select').value;
        const dateVal = document.getElementById('rest-date').value;
        const startVal = document.getElementById('rest-time-start').value;
        const endVal = document.getElementById('rest-time-end').value;
        const formattedHours = formatTiming(daysVal, 'rest-custom-days', dateVal, startVal, endVal, '9:00 AM - 10:00 PM');

        item = {
          id: itemId,
          name,
          rating: '',
          reviews: '0',
          cuisine: document.getElementById('rest-cuisine').value.trim() || 'Multi-Cuisine',
          price: document.getElementById('rest-price').value.trim() || '₹₹ (Moderate)',
          location: document.getElementById('rest-location').value.trim() || 'Coimbatore',
          hours: formattedHours,
          contact: document.getElementById('rest-contact').value.trim() || 'N/A',
          mapUrl,
          image
        };
      }

      await window.SpotFinderAuth.addListing(areaId, category, item);
      successBox.textContent = `"${name}" added successfully!`;
      btn.disabled = false; btn.innerHTML = 'Save Listing';
      setTimeout(() => this.renderAdminManage(), 700);
    });

    document.querySelectorAll('.admin-delete-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Delete this listing?')) return;
        await window.SpotFinderAuth.deleteListing(btn.dataset.area, btn.dataset.category, btn.dataset.id);
        this.renderAdminManage();
      });
    });
  }

  // -----------------------------------------------------------
  // ADMIN: MANAGE ADMIN ACCOUNTS (max 5)
  // -----------------------------------------------------------
  async renderAdminAccounts() {
    const admins = window.SpotFinderAuth.getAdminsSync();
    const current = window.SpotFinderAuth.currentUser();
    const atLimit = admins.length >= window.SpotFinderAuth.MAX_ADMINS;

    this.appView.innerHTML = `
      <div class="admin-wrapper">
        <div class="admin-header">
          <div>
            <span class="section-subtitle"><a href="#/admin" style="color:var(--color-secondary); font-weight:700;">Admin</a> &gt; Accounts</span>
            <h2 class="section-title" style="text-align:left;">Admin Accounts (${admins.length}/${window.SpotFinderAuth.MAX_ADMINS})</h2>
          </div>
        </div>

        <div class="admin-panel-grid">
          <div class="admin-form-card">
            <h3><i class="fa-solid fa-user-plus"></i> Add Admin</h3>
            ${atLimit ? `<p class="admin-empty-note">Admin limit reached (${window.SpotFinderAuth.MAX_ADMINS} max). Remove an account to add a new one.</p>` : `
            <form id="add-admin-form" class="auth-form">
              <input type="text" id="new-admin-name" placeholder="Full Name" required>
              <input type="text" id="new-admin-username" placeholder="Username" required>
              <input type="password" id="new-admin-password" placeholder="Password" required minlength="4">
              <div class="auth-error" id="add-admin-error"></div>
              <div class="auth-success" id="add-admin-success"></div>
              <button type="submit" class="action-btn-primary auth-submit-btn">Add Admin</button>
            </form>
            `}
          </div>

          <div class="admin-list-card">
            <h3><i class="fa-solid fa-user-shield"></i> Current Admins</h3>
            <div class="admin-existing-list">
              ${admins.map(a => `
                <div class="admin-existing-item">
                  <div class="admin-existing-info">
                    <strong>${a.name}</strong>
                    <span>@${a.username} ${a.username === current.username ? '(you)' : ''}</span>
                  </div>
                  ${admins.length > 1 ? `<button class="admin-delete-btn" data-username="${a.username}" title="Remove"><i class="fa-solid fa-trash"></i></button>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    const form = document.getElementById('add-admin-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('new-admin-name').value.trim();
        const username = document.getElementById('new-admin-username').value.trim();
        const password = document.getElementById('new-admin-password').value;
        const addBtn = e.target.querySelector('button[type="submit"]');
        addBtn.disabled = true;
        addBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Adding...';
        const result = await window.SpotFinderAuth.addAdmin(name, username, password);
        addBtn.disabled = false;
        addBtn.innerHTML = 'Add Admin';
        const errorBox = document.getElementById('add-admin-error');
        const successBox = document.getElementById('add-admin-success');
        if (result.success) {
          errorBox.textContent = '';
          successBox.textContent = 'Admin added!';
          setTimeout(() => this.renderAdminAccounts(), 600);
        } else {
          successBox.textContent = '';
          errorBox.textContent = result.message;
        }
      });
    }

    document.querySelectorAll('.admin-delete-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (btn.dataset.username === current.username) {
          if (!confirm('This is your own account. Remove it anyway? You will be logged out.')) return;
        } else if (!confirm(`Remove admin "${btn.dataset.username}"?`)) {
          return;
        }
        const result = await window.SpotFinderAuth.removeAdmin(btn.dataset.username);
        if (result.success && btn.dataset.username === current.username) {
          window.SpotFinderAuth.logout();
          window.location.hash = '#/login';
        } else {
          await this.renderAdminAccounts();
        }
      });
    });
  }

  // -----------------------------------------------------------
  // PARTNER: DASHBOARD (add & manage their own listings only)
  // -----------------------------------------------------------
  renderPartnerDashboard() {
    const areas = window.COIMBATORE_DATA.areas;
    const partner = window.SpotFinderAuth.currentUser();
    const myListings = window.SpotFinderAuth.getMyListings(partner.username);

    this.appView.innerHTML = `
      <div class="admin-wrapper">
        <div class="admin-header">
          <div>
            <span class="section-subtitle">Welcome, ${partner.name} · ${partner.businessName}</span>
            <h2 class="section-title" style="text-align:left;">Partner Dashboard</h2>
          </div>
          <a href="#/" class="action-btn-outline"><i class="fa-solid fa-house"></i> View Site</a>
        </div>

        <div class="admin-panel-grid">
          <!-- FORM -->
          <div class="admin-form-card">
            <h3><i class="fa-solid fa-square-plus"></i> List Your Business</h3>
            <form id="partner-listing-form" class="auth-form">
              <label class="admin-label">Place / Area</label>
              <select id="partner-area-select" class="admin-select" required>
                <option value="">Select a place...</option>
                ${areas.map(a => `<option value="${a.id}">${a.name}</option>`).join('')}
              </select>

              <label class="admin-label">Listing Type</label>
              <select id="partner-category-select" class="admin-select">
                <option value="restaurants">Restaurant / Hotel</option>
                <option value="spots">Tourist Spot</option>
              </select>

              <input type="text" id="partner-listing-name" placeholder="Business Name" required>

              <div id="partner-spot-fields" class="admin-subfields" style="display:none;">
                <textarea id="partner-spot-desc" placeholder="Description" rows="2"></textarea>
                <div class="form-grid-2">
                  <input type="text" id="partner-spot-location" placeholder="Location / Address">
                  <input type="text" id="partner-spot-entryfee" placeholder="Entry Fee (e.g. Free, ₹20)">
                </div>
                
                <div class="form-grid-2">
                  <div>
                    <label class="admin-label">Operational Days</label>
                    <select id="partner-spot-days-select" class="admin-select">
                      <option value="Everyday">Everyday</option>
                      <option value="Weekdays (Mon-Fri)">Weekdays (Mon-Fri)</option>
                      <option value="Weekends (Sat-Sun)">Weekends (Sat-Sun)</option>
                      <option value="Mon - Sat">Mon - Sat</option>
                      <option value="custom">Custom Days Selection...</option>
                    </select>
                  </div>
                  <div>
                    <label class="admin-label">Specific Date (Optional)</label>
                    <input type="date" id="partner-spot-date" class="admin-input-date-time">
                  </div>
                </div>

                <div id="partner-spot-custom-days-wrapper" style="display:none; gap:0.4rem; justify-content:space-between; margin-bottom:1rem; margin-top: 0.5rem; flex-wrap: wrap; width: 100%;">
                  ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => `
                    <label class="day-checkbox-label">
                      <input type="checkbox" name="partner-spot-custom-days" value="${day}">
                      <span>${day}</span>
                    </label>
                  `).join('')}
                </div>

                <div class="form-grid-2">
                  <div>
                    <label class="admin-label">Timings (Clock Picker - Start & End)</label>
                    <div style="display:flex; gap:0.5rem; align-items:center; width:100%;">
                      <input type="time" id="partner-spot-time-start" class="admin-input-date-time" style="flex:1;">
                      <span style="color:var(--text-muted);">to</span>
                      <input type="time" id="partner-spot-time-end" class="admin-input-date-time" style="flex:1;">
                    </div>
                  </div>
                  <div>
                    <label class="admin-label">Best Time to Visit</label>
                    <input type="text" id="partner-spot-besttime" placeholder="Best Time to Visit" style="margin-top: 4px;">
                  </div>
                </div>
              </div>

              <div id="partner-restaurant-fields" class="admin-subfields">
                <div class="form-grid-2">
                  <input type="text" id="partner-rest-cuisine" placeholder="Cuisine (e.g. South Indian)">
                  <input type="text" id="partner-rest-price" placeholder="Price Scale (e.g. ₹₹ Moderate)">
                </div>
                <div class="form-grid-2">
                  <input type="text" id="partner-rest-location" placeholder="Address">
                  <input type="text" id="partner-rest-contact" placeholder="Contact Number">
                </div>

                <div class="form-grid-2">
                  <div>
                    <label class="admin-label">Operational Days</label>
                    <select id="partner-rest-days-select" class="admin-select">
                      <option value="Everyday">Everyday</option>
                      <option value="Weekdays (Mon-Fri)">Weekdays (Mon-Fri)</option>
                      <option value="Weekends (Sat-Sun)">Weekends (Sat-Sun)</option>
                      <option value="Mon - Sat">Mon - Sat</option>
                      <option value="custom">Custom Days Selection...</option>
                    </select>
                  </div>
                  <div>
                    <label class="admin-label">Specific Date (Optional)</label>
                    <input type="date" id="partner-rest-date" class="admin-input-date-time">
                  </div>
                </div>

                <div id="partner-rest-custom-days-wrapper" style="display:none; gap:0.4rem; justify-content:space-between; margin-bottom:1rem; margin-top: 0.5rem; flex-wrap: wrap; width: 100%;">
                  ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => `
                    <label class="day-checkbox-label">
                      <input type="checkbox" name="partner-rest-custom-days" value="${day}">
                      <span>${day}</span>
                    </label>
                  `).join('')}
                </div>

                <label class="admin-label">Opening Hours (Clock Picker - Start & End)</label>
                <div style="display:flex; gap:0.5rem; align-items:center; width:100%;">
                  <input type="time" id="partner-rest-time-start" class="admin-input-date-time" style="flex:1;">
                  <span style="color:var(--text-muted);">to</span>
                  <input type="time" id="partner-rest-time-end" class="admin-input-date-time" style="flex:1;">
                </div>
              </div>

              <input type="text" id="partner-listing-mapurl" placeholder="Google Maps URL (optional)">

              <div class="form-grid-2">
                <div class="file-upload-wrapper">
                  <label class="admin-label">Photo Upload</label>
                  <input type="file" id="partner-listing-image-file" accept="image/*">
                </div>
                <div class="file-upload-wrapper">
                  <label class="admin-label">or Image URL</label>
                  <input type="text" id="partner-listing-image-url" placeholder="...or paste an image URL" style="margin-top: 4px;">
                </div>
              </div>

              <div class="auth-error" id="partner-listing-error"></div>
              <div class="auth-success" id="partner-listing-success"></div>
              <button type="submit" class="action-btn-primary auth-submit-btn">Submit Listing</button>
            </form>
          </div>

          <!-- MY LISTINGS -->
          <div class="admin-list-card">
            <h3><i class="fa-solid fa-list"></i> My Listings</h3>
            <div class="admin-existing-list">
              ${myListings.length === 0 ? '<p class="admin-empty-note">You haven\'t added any listings yet.</p>' : myListings.map(l => `
                <div class="admin-existing-item">
                  <img src="${l.item.image}" alt="${l.item.name}">
                  <div class="admin-existing-info">
                    <strong>${l.item.name}</strong>
                    <span>${l.areaName} · ${l.category === 'spots' ? 'Tourist Spot' : 'Restaurant/Hotel'}</span>
                  </div>
                  <button class="admin-delete-btn" data-area="${l.areaId}" data-category="${l.category}" data-id="${l.item.id}" title="Delete">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindPartnerEvents(partner.username);
  }

  bindPartnerEvents(ownerUsername) {
    const categorySelect = document.getElementById('partner-category-select');
    const spotFields = document.getElementById('partner-spot-fields');
    const restaurantFields = document.getElementById('partner-restaurant-fields');

    const toggleCategoryFields = () => {
      const isSpot = categorySelect.value === 'spots';
      spotFields.style.display = isSpot ? 'flex' : 'none';
      restaurantFields.style.display = isSpot ? 'none' : 'flex';
    };
    toggleCategoryFields();
    categorySelect.addEventListener('change', toggleCategoryFields);

    const partnerSpotDaysSelect = document.getElementById('partner-spot-days-select');
    const partnerSpotCustomDaysWrapper = document.getElementById('partner-spot-custom-days-wrapper');
    if (partnerSpotDaysSelect && partnerSpotCustomDaysWrapper) {
      partnerSpotDaysSelect.addEventListener('change', () => {
        partnerSpotCustomDaysWrapper.style.display = partnerSpotDaysSelect.value === 'custom' ? 'flex' : 'none';
      });
    }

    const partnerRestDaysSelect = document.getElementById('partner-rest-days-select');
    const partnerRestCustomDaysWrapper = document.getElementById('partner-rest-custom-days-wrapper');
    if (partnerRestDaysSelect && partnerRestCustomDaysWrapper) {
      partnerRestDaysSelect.addEventListener('change', () => {
        partnerRestCustomDaysWrapper.style.display = partnerRestDaysSelect.value === 'custom' ? 'flex' : 'none';
      });
    }

    const readFileAsDataUrl = (fileInput) => {
      return new Promise((resolve) => {
        const file = fileInput.files[0];
        if (!file) return resolve(null);
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      });
    };

    document.getElementById('partner-listing-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const errorBox = document.getElementById('partner-listing-error');
      const successBox = document.getElementById('partner-listing-success');
      errorBox.textContent = '';
      successBox.textContent = '';

      const btn = e.target.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

      const areaId = document.getElementById('partner-area-select').value;
      if (!areaId) {
        errorBox.textContent = 'Please select a place for your listing.';
        btn.disabled = false; btn.innerHTML = 'Submit Listing';
        return;
      }

      const category = categorySelect.value;
      const name = document.getElementById('partner-listing-name').value.trim();
      if (!name) {
        errorBox.textContent = 'Please enter your business name.';
        btn.disabled = false; btn.innerHTML = 'Submit Listing';
        return;
      }

      let image = await readFileAsDataUrl(document.getElementById('partner-listing-image-file'));
      if (!image) image = document.getElementById('partner-listing-image-url').value.trim();
      if (!image) image = 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=800';

      const mapUrl = document.getElementById('partner-listing-mapurl').value.trim() || `https://maps.google.com/?q=${encodeURIComponent(name + ' Coimbatore')}`;
      const itemId = `${window.SpotFinderAuth.slugify(name)}-${Date.now()}`;

      const formatTimeAMPM = (timeStr) => {
        if (!timeStr) return '';
        const [hours, minutes] = timeStr.split(':');
        let h = parseInt(hours, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        h = h ? h : 12;
        const m = minutes.padStart(2, '0');
        return `${h.toString().padStart(2, '0')}:${m} ${ampm}`;
      };

      const formatTiming = (daysVal, customDaysName, dateVal, startVal, endVal, fallback) => {
        let daysStr = '';
        if (daysVal === 'custom') {
          const checkedDays = Array.from(document.querySelectorAll(`input[name="${customDaysName}"]:checked`)).map(cb => cb.value);
          daysStr = checkedDays.length > 0 ? checkedDays.join(', ') : 'Everyday';
        } else {
          daysStr = daysVal || 'Everyday';
        }

        let timePart = '';
        if (startVal && endVal) {
          timePart = `${formatTimeAMPM(startVal)} - ${formatTimeAMPM(endVal)}`;
        } else {
          timePart = fallback;
        }

        let finalStr = `${daysStr}: ${timePart}`;
        if (dateVal) {
          finalStr += ` (On ${dateVal})`;
        }
        return finalStr;
      };

      let item;
      if (category === 'spots') {
        const daysVal = document.getElementById('partner-spot-days-select').value;
        const dateVal = document.getElementById('partner-spot-date').value;
        const startVal = document.getElementById('partner-spot-time-start').value;
        const endVal = document.getElementById('partner-spot-time-end').value;
        const formattedTimings = formatTiming(daysVal, 'partner-spot-custom-days', dateVal, startVal, endVal, '9:00 AM - 6:00 PM');

        item = {
          id: itemId,
          name,
          description: document.getElementById('partner-spot-desc').value.trim() || 'A great spot to explore in Coimbatore.',
          location: document.getElementById('partner-spot-location').value.trim() || 'Coimbatore',
          entryFee: document.getElementById('partner-spot-entryfee').value.trim() || 'Free',
          timings: formattedTimings,
          bestTime: document.getElementById('partner-spot-besttime').value.trim() || 'Anytime',
          mapUrl,
          image
        };
      } else {
        const daysVal = document.getElementById('partner-rest-days-select').value;
        const dateVal = document.getElementById('partner-rest-date').value;
        const startVal = document.getElementById('partner-rest-time-start').value;
        const endVal = document.getElementById('partner-rest-time-end').value;
        const formattedHours = formatTiming(daysVal, 'partner-rest-custom-days', dateVal, startVal, endVal, '9:00 AM - 10:00 PM');

        item = {
          id: itemId,
          name,
          rating: '',
          reviews: '0',
          cuisine: document.getElementById('partner-rest-cuisine').value.trim() || 'Multi-Cuisine',
          price: document.getElementById('partner-rest-price').value.trim() || '₹₹ (Moderate)',
          location: document.getElementById('partner-rest-location').value.trim() || 'Coimbatore',
          hours: formattedHours,
          contact: document.getElementById('partner-rest-contact').value.trim() || 'N/A',
          mapUrl,
          image
        };
      }

      await window.SpotFinderAuth.addListing(areaId, category, item, ownerUsername);
      successBox.textContent = `"${name}" submitted successfully!`;
      btn.disabled = false; btn.innerHTML = 'Submit Listing';
      setTimeout(() => this.renderPartnerDashboard(), 700);
    });

    document.querySelectorAll('.admin-delete-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Delete this listing?')) return;
        await window.SpotFinderAuth.deleteListing(btn.dataset.area, btn.dataset.category, btn.dataset.id);
        this.renderPartnerDashboard();
      });
    });
  }

  // -----------------------------------------------------------
  // PAGE 1: HOME PAGE
  // -----------------------------------------------------------
  renderHome() {
    this.appView.innerHTML = `
      <!-- Full-Screen Premium Hero Section with Slideshow -->
      <section class="hero" id="hero-slider-section">
        <div class="hero-slides">
          <div class="hero-slide active" style="background-image: url('images/luxury_hero_bg.jpg');"></div>
          <div class="hero-slide" style="background-image: url('images/Racecourse.jpeg');"></div>
          <div class="hero-slide" style="background-image: url('images/RSpuram.jpeg');"></div>
          <div class="hero-slide" style="background-image: url('images/Ukkadam.jpeg');"></div>
        </div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="hero-badge">
            <i class="fa-solid fa-compass"></i> Discover Coimbatore
          </div>
          <h1 class="hero-title">
            Find Your Next <span class="gradient-text">Unforgettable Spot</span>
          </h1>
          <p class="hero-subtitle">
            Explore architectural temples, scenic wetlands, academic corridors, and gourmet street dining spots.
          </p>

          <!-- Fuzzy Search Bar -->
          <div class="search-container">
            <div class="search-box">
              <div class="search-input-wrapper">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" class="search-input" id="search-input" placeholder="Search areas, spots, or cuisines..." autocomplete="off">
              </div>
              <button class="search-btn" onclick="document.getElementById('explore-areas-section').scrollIntoView({ behavior: 'smooth' })">
                <span>Explore Areas</span>
                <i class="fa-solid fa-arrow-down"></i>
              </button>
            </div>
            <!-- Dropdown suggestions -->
            <div class="search-suggestions" id="search-suggestions"></div>
          </div>
        </div>

        <!-- Slider Pagination Dots -->
        <div class="hero-slider-dots">
          <span class="dot active" data-index="0"></span>
          <span class="dot" data-index="1"></span>
          <span class="dot" data-index="2"></span>
          <span class="dot" data-index="3"></span>
        </div>

        <div class="scroll-indicator" onclick="document.getElementById('explore-areas-section').scrollIntoView({ behavior: 'smooth' })">
          <span>Scroll to Explore</span>
          <div class="scroll-mouse">
            <div class="scroll-wheel"></div>
          </div>
        </div>
      </section>

      <!-- Area Cards List Grid Section -->
      <section id="explore-areas-section" style="padding-top: 5rem;">
        <div class="section-header">
          <span class="section-subtitle">Visual Map Guide</span>
          <h2 class="section-title">Coimbatore Areas</h2>
        </div>
        <div class="explore-grid">
          ${window.COIMBATORE_DATA.areas.map(area => `
            <div class="area-card" onclick="window.location.hash='#/area/${area.id}'">
              <div class="area-card-bg" style="background-image: url('${area.bannerImage}');"></div>
              <div class="area-card-overlay"></div>
              <div class="area-card-content">
                <span class="area-card-tagline">${area.tagline}</span>
                <h3 class="area-card-title">${area.name}</h3>
                <p class="area-card-desc">${area.description}</p>
                <div class="area-card-meta">
                  <span><i class="fa-solid fa-mountain-sun"></i> Attractions</span>
                  <span><i class="fa-solid fa-utensils"></i> Restaurants</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;

    // Re-bind autocomplete input
    if (window.SpotFinderApp) {
      window.SpotFinderApp.initSearch();
    }
  }

  initHeroSlider() {
    const sliderSection = document.getElementById('hero-slider-section');
    if (!sliderSection) return;

    const slides = sliderSection.querySelectorAll('.hero-slide');
    const dots = sliderSection.querySelectorAll('.hero-slider-dots .dot');
    let currentSlide = 0;
    let slideInterval = null;

    function showSlide(index) {
      if (slides.length === 0) return;
      
      // Remove active class from current slide & dot
      slides[currentSlide].classList.remove('active');
      if (dots[currentSlide]) {
        dots[currentSlide].classList.remove('active');
      }

      // Update current index with wrap-around
      currentSlide = (index + slides.length) % slides.length;

      // Add active class to new slide & dot
      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
      }
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function startAutoplay() {
      stopAutoplay();
      slideInterval = setInterval(nextSlide, 10000); // 10s rotation
    }

    function stopAutoplay() {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }
    }

    // Attach click event handlers to dot controls
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        startAutoplay(); // Reset autoplay timer on manual interaction
      });
    });

    // Start rotation
    startAutoplay();

    // Prevent memory leaks: stop the interval on route change
    const cleanupSlider = () => {
      stopAutoplay();
      window.removeEventListener('routechanged', cleanupSlider);
    };
    window.addEventListener('routechanged', cleanupSlider);
  }

  // -----------------------------------------------------------
  // PAGE 2: CHOOSE CATEGORY PAGE
  // -----------------------------------------------------------
  renderCategoryChoice(areaId) {
    const area = window.COIMBATORE_DATA.areas.find(a => a.id === areaId);
    if (!area) {
      this.renderHome();
      return;
    }

    this.appView.innerHTML = `
      <!-- Area Banner -->
      <div class="cinematic-banner">
        <div class="banner-backdrop" style="background-image: url('${area.bannerImage}');"></div>
        <div class="banner-content">
          <span class="banner-tagline">${area.tagline}</span>
          <h1 class="banner-title">${area.name}</h1>
        </div>
      </div>

      <!-- Area Description -->
      <div class="area-description-box">
        <p>${area.description}</p>
      </div>

      <!-- Two Large Category Choice Cards -->
      <div class="category-choice-grid">
        <div class="choice-card" onclick="window.location.hash='#/area/${area.id}/list/spots'">
          <div class="choice-card-bg" style="background-image: url('images/Tourist.jpeg');"></div>
          <div class="choice-card-overlay"></div>
          <div class="choice-card-content">
            <div class="choice-icon">📍</div>
            <h3 class="choice-title">Tourist Spots</h3>
            <p class="choice-subtitle">Discover heritage temples, parks, scenic views, and local attractions</p>
          </div>
        </div>
        <div class="choice-card" onclick="window.location.hash='#/area/${area.id}/list/restaurants'">
          <div class="choice-card-bg" style="background-image: url('images/Restaurant.jpeg');"></div>
          <div class="choice-card-overlay"></div>
          <div class="choice-card-content">
            <div class="choice-icon">🍽</div>
            <h3 class="choice-title">Restaurants</h3>
            <p class="choice-subtitle">Savor delicious traditional vegetarian meals, biryani, and cafes</p>
          </div>
        </div>
      </div>
    `;
  }

  // -----------------------------------------------------------
  // PAGE 3: LIST OF PLACES PAGE
  // -----------------------------------------------------------
  renderPlacesList(areaId, category) {
    const area = window.COIMBATORE_DATA.areas.find(a => a.id === areaId);
    if (!area) {
      this.renderHome();
      return;
    }

    const isSpots = category === 'spots';
    const items = isSpots ? area.spots : area.restaurants;
    const categoryTitle = isSpots ? "Tourist Spots" : "Premium Dining";
    const categorySubtitle = isSpots ? "🏞 Attractions" : "🍽 Restaurants";

    this.appView.innerHTML = `
      <div class="list-wrapper">
        <!-- Breadcrumb & Header -->
        <div class="section-header" style="margin-top: 8rem; margin-bottom: 3rem; text-align: left;">
          <span class="section-subtitle"><a href="#/area/${area.id}" style="color: var(--color-secondary); font-weight: 700;">${area.name}</a> &gt; ${categorySubtitle}</span>
          <h2 class="section-title">${categoryTitle} in ${area.name}</h2>
        </div>

        <div class="list-grid">
          ${items.map(item => {
            const avg = window.SpotFinderAuth.getAverageRating(area.id, category, item.id);
            const isFav = window.SpotFinderAuth.isFavorite(area.id, category, item.id);
            const showRating = avg ? avg.average : (item.rating || '');
            const showReviewsCount = avg ? avg.count : parseInt((item.reviews || '0').toString().replace(/,/g, ''), 10);
            
            const ratingMarkup = (showReviewsCount > 0)
              ? `<span class="list-card-rating"><i class="fa-solid fa-star"></i> ${showRating} (${showReviewsCount.toLocaleString()} review${showReviewsCount === 1 ? '' : 's'})</span>`
              : `<span class="list-card-rating"><i class="fa-solid fa-star-half-stroke"></i> No reviews yet</span>`;

            return `
            <div class="list-card">
              <div class="list-card-img" style="background-image: url('${item.image}');">
                <span class="list-card-badge">${isSpots ? 'Sightseeing' : 'Gastronomy'}</span>
                <div class="fav-container">
                  <button class="fav-btn ${isFav ? 'active' : ''}" data-area="${area.id}" data-category="${category}" data-id="${item.id}" title="Save to favorites">
                    <i class="fa-solid fa-heart"></i>
                  </button>
                  <span class="fav-count">${window.SpotFinderAuth.getLikeCount(area.id, category, item.id)} likes</span>
                </div>
              </div>
              <div class="list-card-body">
                <h3 class="list-card-title">${item.name}</h3>
                ${ratingMarkup}
                <p class="list-card-desc">${item.description || "Experience the best of Coimbatore culinary offerings or historical landscapes at this verified location."}</p>
                <button class="list-card-btn" onclick="window.location.hash='#/area/${area.id}/details/${category}/${item.id}'">
                  View Details
                </button>
              </div>
            </div>
          `;}).join('')}
        </div>

        <div style="margin-top: 4rem; text-align: center;">
          <button class="action-btn-outline" onclick="window.location.hash='#/area/${area.id}'">
            <i class="fa-solid fa-arrow-left" style="margin-right: 0.5rem;"></i> Back to Categories
          </button>
        </div>
      </div>
    `;

    this.bindFavoriteButtons();
  }

  bindFavoriteButtons() {
    document.querySelectorAll('.fav-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const result = await window.SpotFinderAuth.toggleFavorite(btn.dataset.area, btn.dataset.category, btn.dataset.id);
        if (!result.success) {
          window.location.hash = '#/login';
          return;
        }
        btn.classList.toggle('active', result.added);
        
        // Find if there is a liked counter in the DOM structure (either as sibling or inside a parent container)
        const parent = btn.parentElement;
        const countSpan = parent ? parent.querySelector('.fav-count, .details-fav-count') : null;
        if (countSpan) {
          const currentCount = window.SpotFinderAuth.getLikeCount(btn.dataset.area, btn.dataset.category, btn.dataset.id);
          countSpan.textContent = `${currentCount} like${currentCount === 1 ? '' : 's'}`;
        }
      });
    });
  }

  // -----------------------------------------------------------
  // PAGE 4: DETAILS PAGE
  // -----------------------------------------------------------
  renderPlaceDetails(areaId, category, itemId) {
    const area = window.COIMBATORE_DATA.areas.find(a => a.id === areaId);
    if (!area) {
      this.renderHome();
      return;
    }

    const isSpot = category === 'spots';
    let data = null;

    if (isSpot) {
      data = area.spots.find(s => s.id === itemId);
    } else {
      data = area.restaurants.find(r => r.id === itemId);
    }

    if (!data) {
      this.renderPlacesList(areaId, category);
      return;
    }

    if (isSpot) {
      const avg = window.SpotFinderAuth.getAverageRating(area.id, 'spots', data.id);
      const ratingString = avg 
        ? `${avg.average} (${avg.count} review${avg.count === 1 ? '' : 's'})` 
        : `No reviews yet`;

      this.appView.innerHTML = `
        <div class="details-container">
          <div class="details-card">
            <div class="details-visual-side" style="background-image: url('${data.image}');">
              <div class="details-visual-overlay"></div>
            </div>
            <div class="details-content-side">
              <span class="details-meta-badge">Attraction in ${area.name}</span>
              <h1 class="details-title">${data.name}</h1>
              <p class="details-desc">${data.description}</p>
              
              <div class="details-specs">
                <div class="spec-item">
                  <i class="fa-solid fa-star" style="color: var(--color-secondary);"></i>
                  <strong>Rating:</strong> <span>${ratingString}</span>
                </div>
                <div class="spec-item">
                  <i class="fa-solid fa-location-dot"></i>
                  <strong>Address:</strong> <span>${data.location}</span>
                </div>
                <div class="spec-item">
                  <i class="fa-solid fa-ticket"></i>
                  <strong>Entry Fee:</strong> <span>${data.entryFee}</span>
                </div>
                <div class="spec-item">
                  <i class="fa-solid fa-clock"></i>
                  <strong>Timings:</strong> <span>${data.timings}</span>
                </div>
                <div class="spec-item">
                  <i class="fa-solid fa-calendar-day"></i>
                  <strong>Best Time to Visit:</strong> <span>${data.bestTime}</span>
                </div>
              </div>

              <div class="details-actions">
                <button class="action-btn-primary" onclick="window.SpotFinderApp.viewMap('${data.mapUrl}')">
                  <i class="fa-solid fa-location-arrow"></i> Google Maps Directions
                </button>
                <div class="details-fav-wrapper">
                  <button class="fav-btn details-fav-btn ${window.SpotFinderAuth.isFavorite(area.id, 'spots', data.id) ? 'active' : ''}" data-area="${area.id}" data-category="spots" data-id="${data.id}" title="Save to favorites">
                    <i class="fa-solid fa-heart"></i>
                  </button>
                  <span class="details-fav-count">${window.SpotFinderAuth.getLikeCount(area.id, 'spots', data.id)} likes</span>
                </div>
                <button class="action-btn-outline" onclick="window.location.hash='#/area/${area.id}/list/spots'">
                  Back to List
                </button>
              </div>
            </div>
          </div>
          ${this.renderReviewsSection(area.id, 'spots', data.id)}
        </div>
      `;
      this.bindFavoriteButtons();
      this.bindReviewEvents(area.id, 'spots', data.id);
    } else {
      const avg = window.SpotFinderAuth.getAverageRating(area.id, 'restaurants', data.id);
      const showRating = avg ? avg.average : (data.rating || '');
      const showReviewsCount = avg ? avg.count : parseInt((data.reviews || '0').toString().replace(/,/g, ''), 10);
      const ratingString = (showReviewsCount > 0)
        ? `${showRating} (${showReviewsCount.toLocaleString()} Trust Reviews)`
        : `No reviews yet`;

      this.appView.innerHTML = `
        <div class="details-container">
          <div class="details-card">
            <div class="details-visual-side" style="background-image: url('${data.image}');">
              <div class="details-visual-overlay"></div>
            </div>
            <div class="details-content-side">
              <span class="details-meta-badge">Premium Dining in ${area.name}</span>
              <h1 class="details-title">${data.name}</h1>
              <p class="details-desc">Enjoy high-quality food, local traditional spices, clean ingredients, and signature beverages inside Coimbatore's highly recommended dining hotspot.</p>
              
              <div class="details-specs">
                <div class="spec-item">
                  <i class="fa-solid fa-star" style="color: var(--color-secondary);"></i>
                  <strong>Rating:</strong> <span>${ratingString}</span>
                </div>
                <div class="spec-item">
                  <i class="fa-solid fa-bowl-food"></i>
                  <strong>Cuisine Style:</strong> <span>${data.cuisine}</span>
                </div>
                <div class="spec-item">
                  <i class="fa-solid fa-coins"></i>
                  <strong>Price Scale:</strong> <span>${data.price}</span>
                </div>
                <div class="spec-item">
                  <i class="fa-solid fa-clock"></i>
                  <strong>Opening Hours:</strong> <span>${data.hours}</span>
                </div>
                <div class="spec-item">
                  <i class="fa-solid fa-phone"></i>
                  <strong>Contact Info:</strong> <span>${data.contact}</span>
                </div>
                <div class="spec-item">
                  <i class="fa-solid fa-map-pin"></i>
                  <strong>Address:</strong> <span>${data.location}</span>
                </div>
              </div>

              <div class="details-actions">
                <button class="action-btn-primary" onclick="window.SpotFinderApp.viewMap('${data.mapUrl}')">
                  <i class="fa-solid fa-location-arrow"></i> Google Maps Directions
                </button>
                <div class="details-fav-wrapper">
                  <button class="fav-btn details-fav-btn ${window.SpotFinderAuth.isFavorite(area.id, 'restaurants', data.id) ? 'active' : ''}" data-area="${area.id}" data-category="restaurants" data-id="${data.id}" title="Save to favorites">
                    <i class="fa-solid fa-heart"></i>
                  </button>
                  <span class="details-fav-count">${window.SpotFinderAuth.getLikeCount(area.id, 'restaurants', data.id)} likes</span>
                </div>
                <button class="action-btn-outline" onclick="window.location.hash='#/area/${area.id}/list/restaurants'">
                  Back to List
                </button>
              </div>
            </div>
          </div>
          ${this.renderReviewsSection(area.id, 'restaurants', data.id)}
        </div>
      `;
      this.bindFavoriteButtons();
      this.bindReviewEvents(area.id, 'restaurants', data.id);
    }
  }

  // -----------------------------------------------------------
  // REVIEWS: shared section markup + events (used on details pages)
  // -----------------------------------------------------------
  renderReviewsSection(areaId, category, itemId) {
    const reviews = window.SpotFinderAuth.getReviews(areaId, category, itemId);
    const avg = window.SpotFinderAuth.getAverageRating(areaId, category, itemId);
    const session = window.SpotFinderAuth.currentUser();
    const starsMarkup = (n) => Array.from({ length: 5 }, (_, i) => `<i class="fa-solid fa-star${i < n ? '' : '-o'}"></i>`).join('');

    return `
      <div class="reviews-card">
        <div class="reviews-header">
          <h3><i class="fa-solid fa-comment-dots"></i> Reviews ${avg ? `<span class="reviews-avg">${avg.average} <i class="fa-solid fa-star"></i> · ${avg.count} review${avg.count === 1 ? '' : 's'}</span>` : ''}</h3>
        </div>

        <form id="review-form" class="auth-form review-form">
          <div class="star-picker" id="star-picker">
            ${[1,2,3,4,5].map(n => `<i class="fa-regular fa-star star-pick" data-value="${n}"></i>`).join('')}
            <input type="hidden" id="review-rating" value="0">
          </div>
          <textarea id="review-text" placeholder="Share your experience..." rows="3"></textarea>
          <div class="auth-error" id="review-error"></div>
          <div class="auth-success" id="review-success"></div>
          <button type="submit" class="action-btn-outline">Post Review</button>
        </form>

        <div class="review-list">
          ${reviews.length === 0 ? '<p class="admin-empty-note">No reviews yet. Be the first to share your experience!</p>' : reviews.map(r => `
            <div class="review-item">
              <div class="review-item-head">
                <span class="review-item-name"><i class="fa-solid fa-circle-user"></i> ${r.name}</span>
                <span class="review-item-stars">${starsMarkup(r.rating)}</span>
              </div>
              <p class="review-item-text">${r.text}</p>
              <div class="review-item-foot">
                <span>${new Date(r.date).toLocaleDateString()}</span>
                ${session && (session.username === r.username || window.SpotFinderAuth.isAdmin()) ? `<button class="review-delete-btn" data-review-id="${r.id}">Delete</button>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  bindReviewEvents(areaId, category, itemId) {
    const stars = document.querySelectorAll('.star-pick');
    const ratingInput = document.getElementById('review-rating');

    stars.forEach(star => {
      star.addEventListener('click', () => {
        const value = Number(star.dataset.value);
        ratingInput.value = value;
        stars.forEach(s => {
          s.classList.toggle('fa-solid', Number(s.dataset.value) <= value);
          s.classList.toggle('fa-regular', Number(s.dataset.value) > value);
        });
      });
    });

    const form = document.getElementById('review-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const errorBox = document.getElementById('review-error');
        const successBox = document.getElementById('review-success');
        const rating = Number(ratingInput.value);
        const text = document.getElementById('review-text').value;
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Posting...';
        const result = await window.SpotFinderAuth.addReview(areaId, category, itemId, rating, text);
        btn.disabled = false;
        btn.innerHTML = 'Post Review';
        if (result.success) {
          errorBox.textContent = '';
          successBox.textContent = 'Review posted!';
          setTimeout(() => this.renderPlaceDetails(areaId, category, itemId), 500);
        } else {
          successBox.textContent = '';
          errorBox.textContent = result.message;
        }
      });
    }

    document.querySelectorAll('.review-delete-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Delete this review?')) return;
        await window.SpotFinderAuth.deleteReview(btn.dataset.reviewId);
        this.renderPlaceDetails(areaId, category, itemId);
      });
    });
  }

  // -----------------------------------------------------------
  // PAGE: MY FAVORITES
  // -----------------------------------------------------------
  renderFavorites() {
    const favs = window.SpotFinderAuth.getFavorites();
    const items = favs.map(f => {
      const area = window.COIMBATORE_DATA.areas.find(a => a.id === f.areaId);
      if (!area) return null;
      const item = (f.category === 'spots' ? area.spots : area.restaurants).find(i => i.id === f.itemId);
      if (!item) return null;
      return { ...item, areaId: area.id, areaName: area.name, category: f.category };
    }).filter(Boolean);

    this.appView.innerHTML = `
      <div class="list-wrapper">
        <div class="section-header" style="margin-top: 8rem; margin-bottom: 3rem; text-align: left;">
          <span class="section-subtitle"><i class="fa-solid fa-heart"></i> Saved by you</span>
          <h2 class="section-title">My Favorites</h2>
        </div>

        ${items.length === 0 ? `
          <p class="admin-empty-note">You haven't saved any favorites yet. Tap the heart icon on any spot or restaurant to save it here.</p>
        ` : `
        <div class="list-grid">
          ${items.map(item => `
            <div class="list-card">
              <div class="list-card-img" style="background-image: url('${item.image}');">
                <span class="list-card-badge">${item.category === 'spots' ? 'Sightseeing' : 'Gastronomy'}</span>
                <div class="fav-container">
                  <button class="fav-btn active" data-area="${item.areaId}" data-category="${item.category}" data-id="${item.id}" title="Remove from favorites">
                    <i class="fa-solid fa-heart"></i>
                  </button>
                  <span class="fav-count">${window.SpotFinderAuth.getLikeCount(item.areaId, item.category, item.id)} likes</span>
                </div>
              </div>
              <div class="list-card-body">
                <h3 class="list-card-title">${item.name}</h3>
                <span class="list-card-rating"><i class="fa-solid fa-location-dot"></i> ${item.areaName}</span>
                <p class="list-card-desc">${item.description || 'Saved from ' + item.areaName + '.'}</p>
                <button class="list-card-btn" onclick="window.location.hash='#/area/${item.areaId}/details/${item.category}/${item.id}'">
                  View Details
                </button>
              </div>
            </div>
          `).join('')}
        </div>
        `}
      </div>
    `;

    this.bindFavoriteButtons();
    // Re-render this page live when a favorite is removed from within it
    document.querySelectorAll('.fav-btn').forEach(btn => {
      btn.addEventListener('click', () => setTimeout(() => this.renderFavorites(), 150));
    });
  }
}

// Global Registration
window.SpotFinderRouter = SpotFinderRouter;

/* -------------------------------------------------------------
 * SPOT FINDER - Main App Controller
 * Manages state, theme toggles, and search routing
 * ------------------------------------------------------------- */

class SpotFinderApp {
  constructor() {
    this.currentTheme = localStorage.getItem('sf_theme') || 'light';

    this.initTheme();
    this.initSearch();
    this.initRouter();
    this.initGlobalEvents();
  }

  // -----------------------------------------------------------
  // THEME PERSISTENCE
  // -----------------------------------------------------------
  initTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.innerHTML = this.currentTheme === 'dark' 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
    }
  }



  // -----------------------------------------------------------
  // ROUTER INITIALIZATION
  // -----------------------------------------------------------
  initRouter() {
    window.router = new SpotFinderRouter();
  }

  // -----------------------------------------------------------
  // SEARCH SUGGESTIONS & AUTOCOMPLETE DIRECT LINKS
  // -----------------------------------------------------------
  initSearch() {
    const searchInput = document.getElementById('search-input');
    const suggestionsBox = document.getElementById('search-suggestions');

    if (!searchInput || !suggestionsBox) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      suggestionsBox.innerHTML = '';
      
      if (!query) {
        suggestionsBox.classList.remove('active');
        return;
      }

      const matches = [];

      window.COIMBATORE_DATA.areas.forEach(area => {
        // Match Area
        if (area.name.toLowerCase().includes(query)) {
          matches.push({
            name: area.name,
            type: 'Area',
            link: `#/area/${area.id}`,
            desc: area.tagline
          });
        }

        // Match Spots
        area.spots.forEach(spot => {
          if (spot.name.toLowerCase().includes(query) || spot.description.toLowerCase().includes(query)) {
            matches.push({
              name: spot.name,
              type: 'Tourist Spot',
              link: `#/area/${area.id}/details/spots/${spot.id}`,
              desc: `Attraction in ${area.name}`
            });
          }
        });

        // Match Restaurants
        area.restaurants.forEach(rest => {
          if (rest.name.toLowerCase().includes(query) || rest.cuisine.toLowerCase().includes(query)) {
            matches.push({
              name: rest.name,
              type: 'Restaurant',
              link: `#/area/${area.id}/details/restaurants/${rest.id}`,
              desc: `${rest.cuisine} in ${area.name}`
            });
          }
        });
      });

      const topMatches = matches.slice(0, 6);

      if (topMatches.length === 0) {
        suggestionsBox.innerHTML = `
          <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
            No travel spots match your search.
          </div>
        `;
      } else {
        topMatches.forEach(match => {
          const item = document.createElement('div');
          item.className = 'suggestion-item';
          item.innerHTML = `
            <div class="suggestion-info">
              <span class="suggestion-name">${match.name}</span>
              <span class="suggestion-area">${match.desc}</span>
            </div>
            <span class="suggestion-type">${match.type}</span>
          `;
          item.addEventListener('click', () => {
            window.location.hash = match.link;
            searchInput.value = '';
            suggestionsBox.classList.remove('active');
          });
          suggestionsBox.appendChild(item);
        });
      }

      suggestionsBox.classList.add('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
        suggestionsBox.classList.remove('active');
      }
    });
  }

  // -----------------------------------------------------------
  // INTERACTIVE MAP LAUNCH
  // -----------------------------------------------------------
  viewMap(url) {
    window.open(url, '_blank');
  }

  // -----------------------------------------------------------
  // WINDOW SCROLL & GLOBAL EVENT BINDINGS
  // -----------------------------------------------------------
  initGlobalEvents() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          backToTopBtn.style.display = 'flex';
          gsap.to(backToTopBtn, { opacity: 1, scale: 1, duration: 0.3 });
        } else {
          gsap.to(backToTopBtn, { 
            opacity: 0, 
            scale: 0.8, 
            duration: 0.3,
            onComplete: () => { backToTopBtn.style.display = 'none'; }
          });
        }
      });
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Nav sticky bar trigger
    const header = document.querySelector('header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('sticky');
        } else {
          header.classList.remove('sticky');
        }
      });
    }

    // Responsive Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isActive = navMenu.classList.contains('active');
        menuToggle.innerHTML = isActive ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
      });

      // Close menu when clicking links
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
      });
    }
  }
}

// Global Registration
window.SpotFinderApp = null;
window.addEventListener('DOMContentLoaded', () => {
  window.SpotFinderApp = new SpotFinderApp();
});


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
    const hash = window.location.hash || '#/';
    
    // Animate view out
    await this.animateOut();

    // Reset scroll position
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Routing conditions
    if (hash === '#/' || hash === '#home') {
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
          ${items.map(item => `
            <div class="list-card">
              <div class="list-card-img" style="background-image: url('${item.image}');">
                <span class="list-card-badge">${isSpots ? 'Sightseeing' : 'Gastronomy'}</span>
              </div>
              <div class="list-card-body">
                <h3 class="list-card-title">${item.name}</h3>
                <p class="list-card-desc">${item.description || "Experience the best of Coimbatore culinary offerings or historical landscapes at this verified location."}</p>
                <button class="list-card-btn" onclick="window.location.hash='#/area/${area.id}/details/${category}/${item.id}'">
                  View Details
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="margin-top: 4rem; text-align: center;">
          <button class="action-btn-outline" onclick="window.location.hash='#/area/${area.id}'">
            <i class="fa-solid fa-arrow-left" style="margin-right: 0.5rem;"></i> Back to Categories
          </button>
        </div>
      </div>
    `;
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
                <button class="action-btn-outline" onclick="window.location.hash='#/area/${area.id}/list/spots'">
                  Back to List
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
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
                  <strong>Rating:</strong> <span>${data.rating} (${data.reviews} Trust Reviews)</span>
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
                <button class="action-btn-outline" onclick="window.location.hash='#/area/${area.id}/list/restaurants'">
                  Back to List
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }
}

// Global Registration
window.SpotFinderRouter = SpotFinderRouter;

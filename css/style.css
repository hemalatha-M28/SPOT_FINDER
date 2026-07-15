/* -------------------------------------------------------------
 * SPOT FINDER - Clean Premium Stylesheet
 * Hierarchical travel guide with gold, royal blue, and emerald accents
 * ------------------------------------------------------------- */

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Outfit:wght@300;400;500;600;700;800&display=swap');

:root {
  /* Golden Harvest Theme (Light Mode) — Orange & Butter Yellow */
  --bg-main: #FFFBF0;          /* Buttercream */
  --bg-primary: #FFFFFF;       /* White */
  --bg-secondary: #FFF3D6;     /* Soft Butter Yellow */
  --bg-tertiary: #FFE8B8;      /* Warm Amber Sand */

  --color-primary: #B5450F;    /* Deep Burnt Orange */
  --color-primary-rgb: 181, 69, 15;
  --color-secondary: #FFB100;  /* Butter/Amber Yellow */
  --color-secondary-rgb: 255, 177, 0;
  --color-secondary-hover: #E69500;
  --color-accent: #FF7A29;     /* Vivid Tangerine */
  --color-accent-rgb: 255, 122, 41;

  --text-primary: #4A2A0C;     /* Deep Brown-Orange Text */
  --text-secondary: #6E4A22;   /* Medium Warm Brown */
  --text-muted: #9C7B4F;       /* Muted Warm Tan */

  --glass-bg: rgba(255, 255, 255, 0.96);
  --glass-border: rgba(181, 69, 15, 0.14);
  --glass-border-hover: rgba(255, 177, 0, 0.5);
  --glass-shadow: rgba(181, 69, 15, 0.08);

  --font-display: 'Playfair Display', serif;
  --font-sans: 'Outfit', sans-serif;

  --transition-smooth: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-quick: all 0.25s ease;

  --card-radius: 20px;
}

/* Dark Mode Override */
[data-theme="dark"] {
  --bg-main: #241505;          /* Deep Roasted Umber */
  --bg-primary: #2E1B08;       /* Espresso-Orange Surface */
  --bg-secondary: #3A2410;     /* Muted Deep Amber */
  --bg-tertiary: #452C14;      /* Amber Border Accent */

  --color-primary: #FFE9B3;    /* Warm Butter Text Accent */
  --color-primary-rgb: 255, 233, 179;
  --color-secondary: #FFC107;  /* Bright Butter Yellow */
  --color-secondary-rgb: 255, 193, 7;
  --color-secondary-hover: #FFD54F;
  --color-accent: #FF9142;     /* Bright Tangerine */

  --text-primary: #FFF3D1;     /* Warm Cream Text */
  --text-secondary: #E8C99A;   /* Light Amber-Tan Text */
  --text-muted: #B8996B;       /* Muted Amber-Tan Text */

  --glass-bg: rgba(46, 27, 8, 0.96);
  --glass-border: rgba(255, 193, 7, 0.22);
  --glass-border-hover: rgba(255, 193, 7, 0.45);
  --glass-shadow: rgba(0, 0, 0, 0.3);
}

/* -------------------------------------------------------------
 * RESET & CORE DECORATION
 * ------------------------------------------------------------- */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
  overflow-x: hidden;
}

body {
  background-color: var(--bg-main);
  color: var(--text-primary);
  font-family: var(--font-sans);
  line-height: 1.6;
  transition: background-color 0.4s ease, color 0.4s ease;
  overflow-x: hidden;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  cursor: pointer;
}

/* Scrollbars */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--bg-main);
}
::-webkit-scrollbar-thumb {
  background: var(--color-secondary);
  border-radius: 4px;
}

/* -------------------------------------------------------------
 * STICKY TRANSPARENT NAVIGATION
 * ------------------------------------------------------------- */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1.5rem 4%;
  transition: var(--transition-smooth);
  background: var(--bg-primary);
}

header.sticky {
  background: var(--bg-primary);
  padding: 1rem 4%;
  box-shadow: 0 4px 20px var(--glass-shadow);
  border-bottom: 1px solid var(--glass-border);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.15rem;
  color: var(--text-primary);
  text-transform: uppercase;
}

.logo-symbol {
  width: 32px;
  height: 32px;
  border: 2px solid var(--color-secondary);
  border-radius: 6px;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: var(--transition-smooth);
}

.logo:hover .logo-symbol {
  transform: rotate(225deg);
  background-color: var(--color-secondary);
}

.logo-symbol i {
  transform: rotate(-45deg);
  font-size: 0.9rem;
  color: var(--color-secondary);
}

.logo:hover .logo-symbol i {
  color: var(--bg-main);
}

.logo-text span {
  color: var(--color-secondary);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  list-style: none;
}

.nav-link {
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  position: relative;
  padding: 0.5rem 0;
  color: var(--text-secondary);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 1px;
  background-color: var(--color-secondary);
  transition: var(--transition-smooth);
}

.nav-link:hover, .nav-link.active {
  color: var(--text-primary);
}

.nav-link:hover::after, .nav-link.active::after {
  width: 100%;
}







.menu-toggle {
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-primary);
}

@media (max-width: 992px) {
  .menu-toggle {
    display: block;
  }
  
  .nav-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: var(--bg-primary);
    border-left: 1px solid var(--glass-border);
    flex-direction: column;
    justify-content: center;
    gap: 3rem;
    transition: var(--transition-smooth);
    z-index: 999;
  }
  
  .nav-menu.active {
    right: 0;
  }
}

/* -------------------------------------------------------------
 * PAGE 1: HOME PAGE HERO & BANNER
 * ------------------------------------------------------------- */
.hero {
  position: relative;
  height: 95vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-slides {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: scale(1.08);
  transition: opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1), transform 10.5s ease-out;
  z-index: 1;
}

.hero-slide.active {
  opacity: 1;
  transform: scale(1);
  z-index: 2;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 30, 35, 0.45); /* Subtle dark overlay for text contrast and full image visibility */
  z-index: 3;
}

.hero-content {
  position: relative;
  width: 90%;
  max-width: 900px;
  text-align: center;
  z-index: 5;
  color: #ffffff;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(42, 157, 143, 0.18);
  border: 1px solid rgba(42, 157, 143, 0.45);
  color: #2A9D8F;
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12rem;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  animation: badgePulse 2s infinite alternate;
}

@keyframes badgePulse {
  0% {
    box-shadow: 0 0 0 0 rgba(42, 157, 143, 0.35);
    transform: scale(1);
  }
  100% {
    box-shadow: 0 0 0 8px rgba(42, 157, 143, 0);
    transform: scale(1.02);
  }
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5.5vw, 5.25rem);
  font-weight: 900;
  letter-spacing: 0.15rem;
  line-height: 1.15;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(15, 76, 92, 0.3);
}

.gradient-text {
  background: linear-gradient(135deg, #2A9D8F, #1F7A8C, #EAE2B7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.hero-subtitle {
  font-size: clamp(1rem, 1.8vw, 1.35rem);
  color: rgba(255, 255, 255, 0.95);
  max-width: 650px;
  margin: 0 auto 2.5rem auto;
  text-shadow: none;
  font-weight: 400;
}

/* Slideshow pagination indicator dots */
.hero-slider-dots {
  position: absolute;
  bottom: 3.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
  z-index: 10;
}

.hero-slider-dots .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-slider-dots .dot:hover {
  background: rgba(255, 255, 255, 0.75);
  transform: scale(1.2);
}

.hero-slider-dots .dot.active {
  background: var(--color-secondary);
  width: 28px;
  border-radius: 6px;
  transform: scale(1.1);
}

/* Search bar on Home page */
.search-container {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.search-box {
  display: flex;
  background: var(--bg-primary);
  border: 1px solid var(--glass-border);
  border-radius: 50px;
  padding: 0.4rem 0.4rem 0.4rem 2rem;
  box-shadow: 0 10px 30px var(--glass-shadow);
  transition: var(--transition-smooth);
}

.search-box:focus-within {
  border-color: var(--color-secondary);
  box-shadow: 0 10px 30px rgba(30, 127, 106, 0.15);
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 1rem;
}

.search-input-wrapper i {
  color: var(--color-secondary);
  font-size: 1.1rem;
}

.search-input {
  background: none;
  border: none;
  outline: none;
  color: #ffffff;
  font-family: var(--font-sans);
  font-size: 1rem;
  width: 100%;
}

.search-input::placeholder {
  color: var(--text-muted);
}

[data-theme="light"] .search-input {
  color: var(--text-primary);
}

.search-btn {
  background: linear-gradient(135deg, var(--color-secondary), var(--color-secondary-hover));
  color: #ffffff;
  border: none;
  outline: none;
  padding: 0.9rem 2.2rem;
  border-radius: 30px;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: var(--transition-smooth);
}

.search-btn:hover {
  transform: scale(1.03);
}

/* Search suggestions dropdown list */
.search-suggestions {
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: var(--bg-primary);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  max-height: 280px;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  display: none;
  z-index: 99;
  text-align: left;
}

.search-suggestions.active {
  display: block;
}

.suggestion-item {
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: var(--transition-quick);
}

.suggestion-item:hover {
  background: rgba(212, 175, 55, 0.08);
}

.suggestion-info {
  display: flex;
  flex-direction: column;
}

.suggestion-name {
  font-weight: 600;
  color: var(--text-primary);
}

.suggestion-area {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.suggestion-type {
  font-size: 0.75rem;
  color: var(--color-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-weight: 600;
}

/* Scroll indicator on home screen */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.75rem;
  letter-spacing: 0.15rem;
  text-transform: uppercase;
}

.scroll-mouse {
  width: 24px;
  height: 38px;
  border: 2px solid var(--text-muted);
  border-radius: 12px;
  position: relative;
}

.scroll-wheel {
  width: 4px;
  height: 8px;
  background-color: var(--color-secondary);
  border-radius: 2px;
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  animation: scrollWheelAnim 1.6s ease-in-out infinite;
}

@keyframes scrollWheelAnim {
  0% { top: 6px; opacity: 1; }
  100% { top: 20px; opacity: 0; }
}

/* -------------------------------------------------------------
 * SECTIONS & HEADERS
 * ------------------------------------------------------------- */
section {
  padding: 6rem 4%;
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-subtitle {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.25rem;
  color: var(--color-secondary);
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  display: inline-block;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}

/* -------------------------------------------------------------
 * EXPLORE COIMBATORE AREA CARDS (PAGE 1)
 * ------------------------------------------------------------- */
.explore-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

.area-card {
  position: relative;
  height: 360px;
  border-radius: var(--card-radius);
  overflow: hidden;
  border: 1px solid var(--glass-border);
  box-shadow: 0 10px 30px var(--glass-shadow);
  cursor: pointer;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s, box-shadow 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2.2rem 2rem;
}

.area-card:hover {
  transform: translateY(-8px);
  border-color: var(--color-secondary);
  box-shadow: 0 15px 45px rgba(212, 175, 55, 0.2);
}

.area-card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.area-card:hover .area-card-bg {
  transform: scale(1.06);
}

.area-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    rgba(15, 76, 92, 0.1) 0%,
    rgba(15, 76, 92, 0.45) 50%,
    rgba(10, 30, 35, 0.8) 100%
  );
  transition: var(--transition-smooth);
}

[data-theme="light"] .area-card-overlay {
  background: linear-gradient(
    to bottom,
    rgba(15, 76, 92, 0.1) 0%,
    rgba(15, 76, 92, 0.45) 50%,
    rgba(10, 30, 35, 0.8) 100%
  );
}

.area-card-content {
  position: relative;
  z-index: 3;
}

.area-card-tagline {
  font-size: 0.8rem;
  color: #2A9D8F; /* Emerald Green tag */
  text-transform: uppercase;
  letter-spacing: 0.15rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  display: block;
}

.area-card-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  letter-spacing: 0.05rem;
  margin-bottom: 0.75rem;
  color: #ffffff;
  text-transform: uppercase;
}

[data-theme="light"] .area-card-title {
  color: #ffffff;
}

.area-card-desc {
  font-size: 0.9rem;
  color: #EAE2B7; /* Warm Sand description text for contrast */
  margin-bottom: 0;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.4s ease, margin-bottom 0.4s ease;
}

.area-card:hover .area-card-desc {
  opacity: 1;
  max-height: 80px;
  margin-bottom: 1.25rem;
}

.area-card-meta {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 0.85rem;
  font-size: 0.8rem;
  color: #D1E0E3;
}

[data-theme="light"] .area-card-meta {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  color: #D1E0E3;
}

.area-card-meta span i {
  color: #2A9D8F;
  margin-right: 0.4rem;
}

/* -------------------------------------------------------------
 * PAGE 2: CHOOSE CATEGORY
 * ------------------------------------------------------------- */
.cinematic-banner {
  height: 50vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 4rem 4%;
}

.cinematic-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(2, 5, 18, 0.2) 0%,
    rgba(2, 5, 18, 0.5) 60%,
    var(--bg-main) 100%
  );
  z-index: 2;
}

[data-theme="light"] .cinematic-banner::before {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.5) 60%,
    var(--bg-main) 100%
  );
}

.banner-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.banner-content {
  position: relative;
  z-index: 3;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.banner-tagline {
  font-size: 1rem;
  color: var(--color-secondary);
  text-transform: uppercase;
  letter-spacing: 0.25rem;
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
}

.banner-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: #ffffff;
}

[data-theme="light"] .banner-title {
  color: var(--text-primary);
}

.area-description-box {
  max-width: 800px;
  margin: 3rem auto 4rem auto;
  text-align: center;
  padding: 0 1rem;
}

.area-description-box p {
  font-size: 1.15rem;
  color: var(--text-secondary);
  line-height: 1.8;
}

/* Category Choice Cards Grid */
.category-choice-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 900px;
  margin: 0 auto 5rem auto;
}



.choice-card:hover {
  transform: translateY(-8px);
  border-color: var(--color-secondary);
  box-shadow: 0 15px 40px rgba(212, 175, 55, 0.25);
}

.choice-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.5s ease;
}

.choice-card:hover .choice-icon {
  transform: scale(1.15);
}

.choice-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.choice-subtitle {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .category-choice-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1.5rem;
  }
}

/* -------------------------------------------------------------
 * PAGE 3: LIST OF PLACES
 * ------------------------------------------------------------- */
.list-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 4% 5rem 4%;
}

.list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
}

.list-card {
  background: var(--bg-primary);
  border: 1px solid var(--glass-border);
  border-radius: var(--card-radius);
  overflow: hidden;
  box-shadow: 0 8px 25px var(--glass-shadow);
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
}

.list-card:hover {
  transform: translateY(-8px);
  border-color: var(--color-secondary);
  box-shadow: 0 15px 35px rgba(212, 175, 55, 0.18);
}

.list-card-img {
  height: 220px;
  background-size: cover;
  background-position: center;
  position: relative;
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
}

.list-card-badge {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  background: rgba(2, 5, 18, 0.85);
  border: 1px solid var(--color-secondary);
  color: var(--color-secondary);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  z-index: 5;
}

.list-card-body {
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.list-card-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.list-card-desc {
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.6;
  margin-bottom: 1.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.list-card-btn {
  margin-top: auto;
  width: 100%;
  background: linear-gradient(135deg, var(--color-secondary), var(--color-secondary-hover));
  color: #020512;
  border: none;
  outline: none;
  padding: 0.9rem;
  border-radius: 30px;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  text-align: center;
  display: block;
  transition: var(--transition-smooth);
}

.list-card:hover .list-card-btn {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

/* -------------------------------------------------------------
 * PAGE 4: DETAILS VIEW
 * ------------------------------------------------------------- */
.details-container {
  max-width: 1100px;
  margin: 10rem auto 6rem auto;
  padding: 0 4%;
}

.details-card {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  background: var(--bg-primary);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 15px 45px var(--glass-shadow);
}

.details-visual-side {
  position: relative;
  background-size: cover;
  background-position: center;
  min-height: 450px;
}

.details-visual-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(
    to right,
    transparent 50%,
    var(--bg-primary) 100%
  );
}

/* Split layout on mobile checks */
@media (max-width: 900px) {
  .details-card {
    grid-template-columns: 1fr;
  }
  .details-visual-side {
    min-height: 300px;
  }
  .details-visual-overlay {
    background: linear-gradient(
      to bottom,
      transparent 50%,
      var(--bg-primary) 100%
    );
  }
  .details-container {
    margin-top: 8rem;
  }
}

.details-content-side {
  padding: 3.5rem 3rem;
  display: flex;
  flex-direction: column;
}

.details-meta-badge {
  align-self: flex-start;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid var(--color-secondary);
  color: var(--color-secondary);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
}

.details-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3vw, 2.6rem);
  line-height: 1.2;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.details-desc {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 2.25rem;
}

.details-specs {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.75rem 0;
  margin-bottom: 2.25rem;
}

[data-theme="light"] .details-specs {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.spec-item {
  display: flex;
  align-items: flex-start;
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.spec-item i {
  color: var(--color-secondary);
  width: 28px;
  font-size: 1.05rem;
  margin-top: 0.2rem;
}

.spec-item strong {
  color: var(--text-primary);
  margin-right: 0.5rem;
  white-space: nowrap;
}

.details-actions {
  display: flex;
  gap: 1rem;
}

.action-btn-primary {
  flex-grow: 1;
  background: linear-gradient(135deg, var(--color-secondary), var(--color-secondary-hover));
  color: #020512;
  border: none;
  font-family: var(--font-sans);
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  transition: var(--transition-smooth);
}

.action-btn-primary:hover {
  transform: translateY(-2px) scale(1.015);
  box-shadow: 0 8px 24px rgba(var(--color-secondary-rgb), 0.4);
}

.action-btn-outline {
  background: none;
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
  padding: 1rem 1.5rem;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 600;
  transition: var(--transition-smooth);
}

.action-btn-outline:hover {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
  background: rgba(212, 175, 55, 0.05);
}

/* -------------------------------------------------------------
 * FOOTER STYLING
 * ------------------------------------------------------------- */
footer {
  background: #00020a;
  border-top: 1px solid var(--glass-border);
  padding: 5rem 4% 3rem 4%;
  color: var(--text-secondary);
}

[data-theme="light"] footer {
  background: #f1f5f9;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4rem;
  margin-bottom: 3.5rem;
}

.footer-about .logo {
  margin-bottom: 1.25rem;
}

.footer-about p {
  font-size: 0.92rem;
  line-height: 1.7;
  max-width: 450px;
  margin-bottom: 1.75rem;
}

.footer-socials {
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 38px;
  height: 38px;
  border: 1px solid var(--glass-border);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: var(--transition-smooth);
}

.social-icon:hover {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
  transform: translateY(-2px);
}

.footer-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  margin-bottom: 1.25rem;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.footer-links a {
  font-size: 0.88rem;
  transition: var(--transition-quick);
}

.footer-links a:hover {
  color: var(--color-secondary);
  padding-left: 4px;
}

.footer-bottom {
  max-width: 1400px;
  margin: 0 auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.82rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}

/* -------------------------------------------------------------
 * FLOATING BUTTONS
 * ------------------------------------------------------------- */
.floating-actions {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
}

.fab-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--bg-primary);
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px var(--glass-shadow);
  transition: var(--transition-smooth);
}

.fab-btn:hover {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
  transform: translateY(-4px);
}

/* Choice Card Styling Refinement */
.choice-card {
  position: relative;
  height: 250px;
  border-radius: var(--card-radius);
  overflow: hidden;
  border: 1px solid var(--glass-border);
  cursor: pointer;
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--glass-bg);
  box-shadow: 0 10px 30px var(--glass-shadow);
  padding: 2rem;
  text-align: center;
}

.choice-card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.choice-card:hover .choice-card-bg {
  transform: scale(1.08);
}

.choice-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    rgba(44, 62, 80, 0.2) 0%,
    rgba(44, 62, 80, 0.55) 50%,
    rgba(44, 62, 80, 0.85) 100%
  );
  transition: var(--transition-smooth);
}

.choice-card:hover .choice-card-overlay {
  background: linear-gradient(
    to bottom,
    rgba(44, 62, 80, 0.3) 0%,
    rgba(44, 62, 80, 0.65) 40%,
    rgba(44, 62, 80, 0.95) 100%
  );
}

.choice-card-content {
  position: relative;
  z-index: 3;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.choice-card .choice-title {
  color: #FFFFFF !important;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.choice-card .choice-subtitle {
  color: #E2E8F0 !important;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
}

/* -------------------------------------------------------------
 * NAV AUTH SLOT (Login/Logout/Admin link)
 * ------------------------------------------------------------- */
.nav-auth-slot {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 1.5rem;
}

.nav-admin-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(var(--color-secondary-rgb), 0.12);
  padding: 0.5rem 1rem;
  border-radius: 30px;
}

.nav-user-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.nav-user-chip i {
  color: var(--color-secondary);
  font-size: 1.1rem;
}

.nav-logout-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--glass-border);
  background: transparent;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-quick);
}

.nav-logout-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

@media (max-width: 992px) {
  .nav-auth-slot {
    margin-left: 0;
    flex-direction: column;
    gap: 1.25rem;
  }
}

/* -------------------------------------------------------------
 * INTRO SPLASH (logo entrance, plays once on load)
 * ------------------------------------------------------------- */
.intro-splash {
  position: fixed;
  inset: 0;
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 40%, #4a2a0c 0%, #241505 70%);
  cursor: pointer;
  transition: opacity 0.7s ease, visibility 0.7s ease;
  overflow: hidden;
}

.intro-splash.intro-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.intro-bg-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 177, 0, 0.28) 0%, transparent 70%);
  border-radius: 50%;
  animation: introPulse 3s ease-in-out infinite;
}

@keyframes introPulse {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.25); opacity: 1; }
}

.intro-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.intro-logo-symbol {
  position: relative;
  width: 84px;
  height: 84px;
  margin: 0 auto 1.5rem auto;
  border: 3px solid #FFB100;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(45deg);
}

.intro-logo-symbol::before {
  content: '';
  position: absolute;
  inset: -14px;
  border-radius: 26px;
  border: 1px dashed rgba(255, 177, 0, 0.4);
  animation: introRingSpin 6s linear infinite;
}

@keyframes introRingSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.intro-logo-symbol i {
  transform: rotate(-45deg);
  font-size: 2rem;
  color: #FFB100;
}

.intro-logo-text {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  color: #FFF3D1;
}

.intro-logo-text span {
  color: #FFB100;
}

.intro-tagline {
  margin-top: 0.75rem;
  color: #E8C99A;
  font-size: 0.95rem;
  letter-spacing: 0.08rem;
}

.intro-loader {
  width: 200px;
  height: 3px;
  background: rgba(255,255,255,0.12);
  border-radius: 3px;
  margin: 2rem auto 0 auto;
  overflow: hidden;
}

.intro-loader-bar {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #FF7A29, #FFB100);
  animation: introLoad 2.4s ease-out forwards;
}

@keyframes introLoad {
  0% { width: 0%; }
  100% { width: 100%; }
}

/* -------------------------------------------------------------
 * AUTH PAGES (Login / Register)
 * ------------------------------------------------------------- */
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 1.5rem 3rem 1.5rem;
}

.auth-card {
  width: 100%;
  max-width: 440px;
  background: var(--bg-primary);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  padding: 2.75rem 2.5rem;
  box-shadow: 0 20px 60px var(--glass-shadow);
  text-align: center;
}

.auth-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.auth-brand .logo-symbol {
  width: 32px;
  height: 32px;
  border: 2px solid var(--color-secondary);
  border-radius: 6px;
  transform: rotate(45deg);
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-brand .logo-symbol i {
  transform: rotate(-45deg);
  color: var(--color-secondary);
  font-size: 0.9rem;
}

.auth-brand .logo-text {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.12rem;
  text-transform: uppercase;
}

.auth-brand .logo-text span {
  color: var(--color-secondary);
}

.auth-tagline {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.auth-tabs {
  display: flex;
  border: 1px solid var(--glass-border);
  border-radius: 30px;
  padding: 0.3rem;
  margin-bottom: 1.75rem;
}

.auth-tab {
  flex: 1;
  padding: 0.6rem 1rem;
  border: none;
  background: transparent;
  border-radius: 25px;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--text-muted);
  transition: var(--transition-quick);
}

.auth-tab.active {
  background: var(--color-primary);
  color: var(--bg-main);
}

[data-theme="dark"] .auth-tab.active {
  background: var(--color-secondary);
  color: #241505;
}

.auth-panel {
  display: none;
  text-align: left;
}

.auth-panel.active {
  display: block;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-form input,
.auth-form textarea,
.admin-select {
  width: 100%;
  padding: 0.85rem 1.1rem;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  background: var(--bg-main);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 0.92rem;
  transition: var(--transition-quick);
}

.auth-form input:focus,
.auth-form textarea:focus,
.admin-select:focus {
  outline: none;
  border-color: var(--color-secondary);
}

.auth-submit-btn {
  width: 100%;
  border: none;
  margin-top: 0.25rem;
}

.auth-error {
  color: #E5484D;
  font-size: 0.85rem;
  min-height: 1.1rem;
}

.auth-success {
  color: #1E9E6B;
  font-size: 0.85rem;
  min-height: 1.1rem;
}

.auth-switch {
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  text-align: center;
}

.auth-switch a {
  color: var(--color-secondary);
  font-weight: 600;
}

.auth-hint {
  margin-top: 1.5rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  text-align: center;
}

/* -------------------------------------------------------------
 * ADMIN PANEL
 * ------------------------------------------------------------- */
.admin-wrapper {
  max-width: 1300px;
  margin: 0 auto;
  padding: 9rem 4% 4rem 4%;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.admin-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.admin-stat-card {
  background: var(--bg-primary);
  border: 1px solid var(--glass-border);
  border-radius: var(--card-radius);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  box-shadow: 0 10px 30px var(--glass-shadow);
}

.admin-stat-card i {
  font-size: 1.4rem;
  color: var(--color-secondary);
  margin-bottom: 0.4rem;
}

.admin-stat-num {
  font-family: var(--font-display);
  font-size: 1.9rem;
  font-weight: 800;
  color: var(--text-primary);
}

.admin-stat-label {
  font-size: 0.82rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.admin-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.admin-action-card {
  background: var(--bg-primary);
  border: 1px solid var(--glass-border);
  border-radius: var(--card-radius);
  padding: 2rem;
  transition: var(--transition-smooth);
  box-shadow: 0 10px 30px var(--glass-shadow);
}

.admin-action-card i {
  font-size: 1.6rem;
  color: var(--color-secondary);
  margin-bottom: 1rem;
  display: block;
}

.admin-action-card h3 {
  font-family: var(--font-display);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.admin-action-card p {
  font-size: 0.88rem;
  color: var(--text-muted);
}

.admin-action-card:hover {
  border-color: var(--color-secondary);
  transform: translateY(-4px);
}

.admin-panel-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 900px) {
  .admin-panel-grid {
    grid-template-columns: 1fr;
  }
}

.admin-form-card,
.admin-list-card {
  background: var(--bg-primary);
  border: 1px solid var(--glass-border);
  border-radius: var(--card-radius);
  padding: 2rem;
  box-shadow: 0 10px 30px var(--glass-shadow);
}

.admin-form-card h3,
.admin-list-card h3 {
  font-family: var(--font-display);
  font-size: 1.15rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text-primary);
}

.admin-form-card h3 i,
.admin-list-card h3 i {
  color: var(--color-secondary);
}

.admin-label {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.admin-subfields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.admin-existing-list {
  max-height: 620px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.admin-area-group h4 {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--color-secondary);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.admin-existing-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem;
  border-radius: 12px;
  margin-bottom: 0.6rem;
  border: 1px solid var(--glass-border);
}

.admin-existing-item img {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.admin-existing-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
}

.admin-existing-info strong {
  font-size: 0.9rem;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-existing-info span {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.admin-delete-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--glass-border);
  background: transparent;
  color: var(--color-accent);
  flex-shrink: 0;
  transition: var(--transition-quick);
}

.admin-delete-btn:hover {
  background: var(--color-accent);
  color: #fff;
}

.admin-empty-note {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* -------------------------------------------------------------
 * FAVORITES (heart toggle button)
 * ------------------------------------------------------------- */
.fav-btn {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  z-index: 4;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: rgba(27, 31, 59, 0.55);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: var(--transition-quick);
  backdrop-filter: blur(4px);
}

.fav-btn:hover {
  background: rgba(214, 91, 74, 0.85);
  transform: scale(1.08);
}

.fav-btn.active {
  background: var(--color-accent);
  color: #fff;
}

.list-card-img {
  position: relative;
}

.details-fav-btn {
  position: static;
  width: 54px;
  height: 54px;
  flex-shrink: 0;
  background: var(--bg-main);
  color: var(--color-accent);
  border: 1px solid var(--glass-border);
}

.details-fav-btn.active {
  background: var(--color-accent);
  color: #fff;
}

.list-card-rating {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-secondary);
  margin-bottom: 0.4rem;
}

/* -------------------------------------------------------------
 * REVIEWS
 * ------------------------------------------------------------- */
.reviews-card {
  max-width: 1200px;
  margin: 2.5rem auto 0 auto;
  background: var(--bg-primary);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 15px 45px var(--glass-shadow);
}

.reviews-header h3 {
  font-family: var(--font-display);
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.75rem;
  color: var(--text-primary);
}

.reviews-header h3 i {
  color: var(--color-secondary);
}

.reviews-avg {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-left: 0.5rem;
}

.reviews-avg i {
  color: var(--color-secondary);
}

.review-form {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--glass-border);
}

.star-picker {
  display: flex;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: var(--color-secondary);
}

.star-pick {
  cursor: pointer;
  transition: var(--transition-quick);
}

.star-pick:hover {
  transform: scale(1.15);
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.review-item {
  padding: 1.25rem;
  border: 1px solid var(--glass-border);
  border-radius: 14px;
}

.review-item-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
}

.review-item-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.review-item-name i {
  color: var(--color-secondary);
}

.review-item-stars {
  color: var(--color-secondary);
  font-size: 0.85rem;
}

.review-item-text {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 0.6rem;
}

.review-item-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;
  color: var(--text-muted);
}

.review-delete-btn {
  background: none;
  border: none;
  color: var(--color-accent);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
}

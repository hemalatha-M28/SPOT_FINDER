/* -------------------------------------------------------------
 * SPOT FINDER - Simplified Animation Engine
 * Manages minimal, clean page entrance fades
 * ------------------------------------------------------------- */

class SpotFinderAnimations {
  constructor() {
    this.initScrollAnimations();
  }

  initScrollAnimations() {
    // Elegant slide-up animations for area cards, category choice cards, and list cards
    const elementsToAnimate = document.querySelectorAll('.area-card, .choice-card, .list-card, .details-card');
    
    if (elementsToAnimate.length === 0) return;

    gsap.fromTo(elementsToAnimate, 
      { opacity: 0, y: 15 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.08,
        ease: 'power2.out'
      }
    );
  }
}

// Global registration
window.SpotFinderAnimations = null;
window.addEventListener('DOMContentLoaded', () => {
  window.SpotFinderAnimations = new SpotFinderAnimations();
});


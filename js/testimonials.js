/**
 * Testimonials Carousel — pill dots, auto-advance, arrows, touch swipe
 */
const Testimonials = (() => {
  let container, track, slides, dots, prevBtn, nextBtn;
  let currentIndex = 0;
  let autoplayInterval = null;
  let touchStartX = 0;
  let touchEndX = 0;
  const AUTOPLAY_DELAY = 6000;

  function getSlideCount() {
    return slides ? slides.length : 0;
  }

  function goTo(index) {
    const count = getSlideCount();
    if (count === 0) return;
    currentIndex = ((index % count) + count) % count;
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    updateDots();
  }

  function next() {
    goTo(currentIndex + 1);
  }

  function prev() {
    goTo(currentIndex - 1);
  }

  function updateDots() {
    if (!dots) return;
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('bg-primary', 'w-8');
        dot.classList.remove('bg-border', 'w-2');
      } else {
        dot.classList.remove('bg-primary', 'w-8');
        dot.classList.add('bg-border', 'w-2');
      }
      dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
    });
  }

  function startAutoplay() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    stopAutoplay();
    autoplayInterval = setInterval(next, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
      stopAutoplay();
      startAutoplay();
    }
  }

  function init() {
    container = document.getElementById('testimonials-carousel');
    if (!container) return;

    track = container.querySelector('.carousel-track');
    slides = container.querySelectorAll('.carousel-slide');
    dots = container.querySelectorAll('.carousel-dot');
    prevBtn = container.querySelector('.carousel-prev');
    nextBtn = container.querySelector('.carousel-next');

    if (!track || slides.length === 0) return;

    // Arrow buttons
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); stopAutoplay(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); stopAutoplay(); startAutoplay(); });

    // Dots
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); stopAutoplay(); startAutoplay(); });
    });

    // Touch
    track.addEventListener('touchstart', handleTouchStart, { passive: true });
    track.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Pause on hover
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);

    // Keyboard
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { prev(); stopAutoplay(); startAutoplay(); }
      if (e.key === 'ArrowRight') { next(); stopAutoplay(); startAutoplay(); }
    });

    goTo(0);
    startAutoplay();
  }

  return { init };
})();

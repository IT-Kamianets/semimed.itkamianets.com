/**
 * Scroll-triggered fade-in animations using IntersectionObserver
 * Respects prefers-reduced-motion
 */
const Animations = (() => {
  function init() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

    if (prefersReducedMotion) {
      // Make all elements visible immediately
      animatedElements.forEach(el => el.classList.add('visible'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      animatedElements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, parseInt(delay));
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  }

  return { init };
})();

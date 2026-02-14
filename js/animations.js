/**
 * Scroll-triggered animations + counter animation
 * Supports fade-in-up, fade-in-left, fade-in-right, scale-in
 * Respects prefers-reduced-motion
 */
const Animations = (() => {
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    const duration = 2000;
    const start = performance.now();
    const suffix = el.getAttribute('data-count-suffix') || '';

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  function init() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    const counterElements = document.querySelectorAll('[data-count]');

    if (prefersReducedMotion) {
      animatedElements.forEach(el => el.classList.add('visible'));
      counterElements.forEach(el => {
        const target = el.getAttribute('data-count') || '0';
        const suffix = el.getAttribute('data-count-suffix') || '';
        el.textContent = target + suffix;
      });
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

    // Counter observer
    if (counterElements.length > 0) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      counterElements.forEach(el => counterObserver.observe(el));
    }
  }

  return { init };
})();

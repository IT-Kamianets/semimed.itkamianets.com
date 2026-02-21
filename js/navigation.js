/**
 * Navigation — mobile menu toggle, glassmorphism sticky header, smooth scroll, and scroll-spy active link highlighting.
 */
const Navigation = (() => {
  let header, mobileToggle, mobileMenu;

  function initStickyHeader() {
    if (!header) return;

    window.addEventListener('scroll', () => {
      header.classList.toggle('header-scrolled', window.pageYOffset > 50);
    }, { passive: true });
  }

  function initMobileMenu() {
    mobileToggle = document.getElementById('mobile-menu-toggle');
    mobileMenu = document.getElementById('mobile-menu');
    if (!mobileToggle || !mobileMenu) return;

    const hamburgerIcon = mobileToggle.querySelector('.hamburger-icon');
    const closeIcon = mobileToggle.querySelector('.close-icon');

    const toggleMenu = (open) => {
      mobileMenu.classList.toggle('hidden', !open);
      if (hamburgerIcon) hamburgerIcon.classList.toggle('hidden', open);
      if (closeIcon) closeIcon.classList.toggle('hidden', !open);
      mobileToggle.setAttribute('aria-expanded', open);
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !mobileMenu.classList.contains('hidden');
      toggleMenu(!isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && e.target !== mobileToggle) {
        toggleMenu(false);
      }
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.length <= 1) return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
          
          // Close mobile menu on click
          if (!mobileMenu.classList.contains('hidden')) {
            mobileToggle.click();
          }
        }
      });
    });
  }

  function initNavHighlight() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('[data-nav-link]');

    // For non-index pages, just highlight the link based on URL
    if (currentPage !== 'index.html' && currentPage !== '') {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').endsWith(currentPage));
      });
      return;
    }

    // On index page, implement scroll-spy
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!sections.length || !('IntersectionObserver' in window)) {
      const homeLink = document.querySelector('[data-nav-link][href="index.html"]');
      if (homeLink) homeLink.classList.add('active');
      return;
    }
    
    const observer = new IntersectionObserver(entries => {
      let activeSectionId = null;

      // Find the topmost visible section
      const visibleSections = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      
      if (visibleSections.length > 0) {
        activeSectionId = visibleSections[0].target.id;
      }
      
      // Highlight the corresponding link
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Match href="index.html" to the first section, and #links to their section id
        const linkCorrespondsToId = (href === 'index.html' && activeSectionId === sections[0].id) || href.endsWith(`#${activeSectionId}`);
        link.classList.toggle('active', linkCorrespondsToId);
      });

    }, { 
        rootMargin: `-${(header?.offsetHeight || 80) + 1}px 0px -70% 0px`,
        threshold: 0,
    });

    sections.forEach(section => observer.observe(section));
  }

  function init() {
    header = document.getElementById('header');
    initStickyHeader();
    initMobileMenu();
    initSmoothScroll();
    initNavHighlight();
  }

  return { init };
})();


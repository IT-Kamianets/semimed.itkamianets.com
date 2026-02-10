/**
 * Gallery — filtering, lightbox, lazy loading, keyboard/touch navigation
 */
const Gallery = (() => {
  let lightboxOverlay, lightboxImg, lightboxCaption, galleryItems;
  let currentLightboxIndex = 0;
  let filteredItems = [];

  function initFilters() {
    const filterBtns = document.querySelectorAll('[data-filter]');
    galleryItems = document.querySelectorAll('[data-category]');

    if (filterBtns.length === 0 || galleryItems.length === 0) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach(b => {
          b.classList.remove('bg-primary', 'text-white');
          b.classList.add('bg-white', 'text-body');
        });
        btn.classList.add('bg-primary', 'text-white');
        btn.classList.remove('bg-white', 'text-body');

        // Filter items
        galleryItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.classList.remove('hidden');
            item.style.animation = 'fadeIn 0.4s ease-out';
          } else {
            item.classList.add('hidden');
          }
        });

        updateFilteredItems();
      });
    });

    updateFilteredItems();
  }

  function updateFilteredItems() {
    filteredItems = Array.from(document.querySelectorAll('[data-category]:not(.hidden)'));
  }

  function initLightbox() {
    // Create lightbox overlay
    lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.id = 'lightbox';
    lightboxOverlay.setAttribute('role', 'dialog');
    lightboxOverlay.setAttribute('aria-modal', 'true');
    lightboxOverlay.setAttribute('aria-label', 'Image lightbox');
    lightboxOverlay.innerHTML = `
      <button class="lightbox-close" aria-label="Close">&times;</button>
      <button class="lightbox-btn left-4" aria-label="Previous">&#8249;</button>
      <div class="text-center">
        <img class="lightbox-img" src="" alt="" />
        <p class="lightbox-caption text-white mt-4 text-lg"></p>
      </div>
      <button class="lightbox-btn right-4" aria-label="Next">&#8250;</button>
    `;
    document.body.appendChild(lightboxOverlay);

    lightboxImg = lightboxOverlay.querySelector('.lightbox-img');
    lightboxCaption = lightboxOverlay.querySelector('.lightbox-caption');

    // Close button
    lightboxOverlay.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

    // Background click to close
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) closeLightbox();
    });

    // Navigation buttons
    lightboxOverlay.querySelector('.lightbox-btn.left-4').addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(-1);
    });
    lightboxOverlay.querySelector('.lightbox-btn.right-4').addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightboxOverlay.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // Touch swipe
    let touchStartX = 0;
    lightboxOverlay.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    lightboxOverlay.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        navigateLightbox(diff > 0 ? 1 : -1);
      }
    }, { passive: true });

    // Bind gallery items
    document.querySelectorAll('[data-lightbox]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const src = item.getAttribute('data-lightbox') || item.querySelector('img')?.src;
        const caption = item.getAttribute('data-caption') || item.querySelector('img')?.alt || '';
        openLightbox(src, caption, item);
      });
      item.style.cursor = 'pointer';
    });
  }

  function openLightbox(src, caption, triggerItem) {
    updateFilteredItems();
    if (triggerItem) {
      currentLightboxIndex = filteredItems.indexOf(triggerItem.closest('[data-category]') || triggerItem);
    }
    lightboxImg.src = src;
    lightboxImg.alt = caption;
    lightboxCaption.textContent = caption;
    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    if (filteredItems.length === 0) return;
    currentLightboxIndex = ((currentLightboxIndex + direction) % filteredItems.length + filteredItems.length) % filteredItems.length;
    const item = filteredItems[currentLightboxIndex];
    const lightboxTrigger = item.querySelector('[data-lightbox]');
    if (lightboxTrigger) {
      const src = lightboxTrigger.getAttribute('data-lightbox') || lightboxTrigger.querySelector('img')?.src;
      const caption = lightboxTrigger.getAttribute('data-caption') || lightboxTrigger.querySelector('img')?.alt || '';
      lightboxImg.src = src;
      lightboxImg.alt = caption;
      lightboxCaption.textContent = caption;
    }
  }

  function init() {
    initFilters();
    if (document.querySelector('[data-lightbox]')) {
      initLightbox();
    }
  }

  return { init };
})();

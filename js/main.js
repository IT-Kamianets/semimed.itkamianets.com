/**
 * Main initialization — coordinates all modules
 */
document.addEventListener('DOMContentLoaded', () => {
  // Core
  Navigation.init();
  I18n.init();

  // Page-specific modules
  if (typeof Testimonials !== 'undefined') Testimonials.init();
  if (typeof FormHandler !== 'undefined') FormHandler.init();
  if (typeof Gallery !== 'undefined') Gallery.init();

  // Animations (always last)
  if (typeof Animations !== 'undefined') Animations.init();
});

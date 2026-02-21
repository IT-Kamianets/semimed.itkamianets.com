/**
 * i18n Engine — UA/EN language switcher
 * Loads JSON translation files, updates DOM elements with data-i18n attributes,
 * persists language choice in localStorage.
 */
const I18n = (() => {
  const STORAGE_KEY = 'semimed-lang';
  const DEFAULT_LANG = 'uk';
  const SUPPORTED = ['uk', 'en'];
  const cache = {};
  let currentLang = DEFAULT_LANG;

  function getNestedValue(obj, path) {
    return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
  }

  async function loadTranslations(lang) {
    if (cache[lang]) return cache[lang];
    try {
      const basePath = document.querySelector('meta[name="base-path"]')?.content || '.';
      const response = await fetch(`${basePath}/lang/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
      cache[lang] = await response.json();
      return cache[lang];
    } catch (error) {
      console.error(`Error loading translations for ${lang}:`, error);
      return null;
    }
  }

  function updateDOM(translations) {
    if (!translations) return;

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = getNestedValue(translations, key);
      if (value) el.textContent = value;
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const value = getNestedValue(translations, key);
      if (value) el.placeholder = value;
    });

    // Update aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const value = getNestedValue(translations, key);
      if (value) el.setAttribute('aria-label', value);
    });

    // Update title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const value = getNestedValue(translations, key);
      if (value) el.title = value;
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
  }

  async function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    const translations = await loadTranslations(lang);
    updateDOM(translations);
    updateSwitcher();
  }

  function updateSwitcher() {
    document.querySelectorAll('[data-lang-switch]').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang-switch');
      btn.classList.toggle('font-bold', btnLang === currentLang);
      btn.classList.toggle('text-primary', btnLang === currentLang);
      btn.classList.toggle('opacity-60', btnLang !== currentLang);
    });
  }

  function getSavedLanguage() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function getCurrentLang() {
    return currentLang;
  }

  function getTranslation(key) {
    const translations = cache[currentLang];
    if (!translations) return key;
    return getNestedValue(translations, key) || key;
  }

  async function init() {
    currentLang = getSavedLanguage();

    // Bind language switcher buttons
    document.querySelectorAll('[data-lang-switch]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.getAttribute('data-lang-switch');
        setLanguage(lang);
      });
    });

    await setLanguage(currentLang);
  }

  return { init, setLanguage, getCurrentLang, getTranslation, loadTranslations };
})();

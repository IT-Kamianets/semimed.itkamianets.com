/**
 * Form validation + Web3Forms submission
 */
const FormHandler = (() => {
  const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
  const ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE'; // Replace with actual Web3Forms access key

  function validateField(field, translations) {
    const name = field.getAttribute('name');
    const value = field.value.trim();
    let error = '';

    switch (name) {
      case 'name':
        if (!value) error = translations?.appointment?.validation?.name_required || 'Name is required';
        break;
      case 'phone':
        if (!value) error = translations?.appointment?.validation?.phone_required || 'Phone is required';
        else if (!/^[\+]?[\d\s\(\)\-]{7,}$/.test(value)) error = translations?.appointment?.validation?.phone_invalid || 'Invalid phone';
        break;
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = translations?.appointment?.validation?.email_invalid || 'Invalid email';
        break;
      case 'service':
        if (!value) error = translations?.appointment?.validation?.service_required || 'Select a service';
        break;
    }

    const errorEl = field.parentElement.querySelector('.field-error');
    if (error) {
      field.classList.add('border-red-500');
      field.classList.remove('border-border');
      if (errorEl) {
        errorEl.textContent = error;
        errorEl.classList.remove('hidden');
      }
      return false;
    } else {
      field.classList.remove('border-red-500');
      field.classList.add('border-border');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.add('hidden');
      }
      return true;
    }
  }

  async function submitForm(form, translations) {
    const submitBtn = form.querySelector('[type="submit"]');
    const statusEl = form.querySelector('.form-status');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = '...';

    const formData = new FormData(form);
    formData.append('access_key', ACCESS_KEY);

    try {
      const response = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();

      if (result.success) {
        if (statusEl) {
          statusEl.textContent = translations?.appointment?.success || 'Thank you! Your request has been received.';
          statusEl.className = 'form-status mt-4 p-4 rounded-lg bg-green-50 text-green-700 border border-green-200';
        }
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      if (statusEl) {
        statusEl.textContent = translations?.appointment?.error || 'An error occurred. Please try again.';
        statusEl.className = 'form-status mt-4 p-4 rounded-lg bg-red-50 text-red-700 border border-red-200';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  function init() {
    document.querySelectorAll('[data-form="appointment"]').forEach(form => {
      // Honeypot field (anti-spam)
      const honeypot = document.createElement('input');
      honeypot.type = 'text';
      honeypot.name = 'botcheck';
      honeypot.style.display = 'none';
      honeypot.tabIndex = -1;
      honeypot.autocomplete = 'off';
      form.appendChild(honeypot);

      // Real-time validation
      form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', () => {
          const translations = I18n.loadTranslations ? null : null; // will use cached
          validateField(field, null);
        });
        field.addEventListener('input', () => {
          if (field.classList.contains('border-red-500')) {
            validateField(field, null);
          }
        });
      });

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Check honeypot
        if (form.querySelector('[name="botcheck"]').value) return;

        // Validate all fields
        const fields = form.querySelectorAll('input[required], select[required]');
        let isValid = true;
        fields.forEach(field => {
          if (!validateField(field, null)) isValid = false;
        });

        if (isValid) {
          await submitForm(form, null);
        }
      });
    });
  }

  return { init };
})();

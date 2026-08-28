export const initPageNavigation = () => {
  const pageButtons = document.querySelectorAll('.page-button');
  const pagePanels = document.querySelectorAll('.page-panel');

  const showPage = (pageId) => {
    pageButtons.forEach((button) => {
      const isActive = button.dataset.page === pageId;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    pagePanels.forEach((panel) => {
      panel.classList.toggle('active', panel.id === pageId);
    });
  };

  pageButtons.forEach((button) => {
    button.addEventListener('click', () => showPage(button.dataset.page));
  });
};

export const initFormValidation = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const setFieldState = (fieldName, message = '') => {
    const input = document.getElementById(fieldName);
    const errorEl = document.querySelector(`[data-error-for="${fieldName}"]`);

    if (!input || !errorEl) return;

    if (message) {
      input.classList.add('invalid');
      errorEl.textContent = message;
      return;
    }

    input.classList.remove('invalid');
    errorEl.textContent = '';
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const successMessage = document.getElementById('form-success');

    let isValid = true;

    if (!name || !email || !message || !successMessage) return;

    if (!name.value.trim()) {
      setFieldState('name', 'Name is required.');
      isValid = false;
    } else {
      setFieldState('name');
    }

    if (!email.value.trim()) {
      setFieldState('email', 'Email is required.');
      isValid = false;
    } else if (!validateEmail(email.value)) {
      setFieldState('email', 'Please enter a valid email address.');
      isValid = false;
    } else {
      setFieldState('email');
    }

    if (!message.value.trim()) {
      setFieldState('message', 'Message is required.');
      isValid = false;
    } else {
      setFieldState('message');
    }

    if (!isValid) {
      successMessage.textContent = '';
      return;
    }

    successMessage.textContent = 'Thanks! Your message was sent successfully.';
    form.reset();
    setFieldState('name');
    setFieldState('email');
    setFieldState('message');
  });
};

const form = document.getElementById('contact-form');

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

const handleSmoothScroll = (event) => {
  const anchor = event.currentTarget;
  const targetId = anchor.getAttribute('href');

  if (!targetId || !targetId.startsWith('#')) return;

  const target = document.querySelector(targetId);
  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener('click', handleSmoothScroll);
});

if (form) {
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
}

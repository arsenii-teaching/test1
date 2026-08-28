const pageButtons = document.querySelectorAll('[data-page]');
const pagePanels = document.querySelectorAll('.page-panel');

const showPage = (pageId) => {
  pageButtons.forEach((button) => {
    const isActive = button.dataset.page === pageId;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  pagePanels.forEach((panel) => panel.classList.toggle('active', panel.id === pageId));
};

pageButtons.forEach((button) => button.addEventListener('click', () => showPage(button.dataset.page)));

const greetings = [
  'Hello from the other side of the screen.',
  'Good ideas look good on you, Arsenii.',
  'Welcome back. What will you make today?',
  'A little code, a lot of possibility.',
];
const greetingButton = document.getElementById('greeting-button');
const greetingOutput = document.getElementById('greeting-output');
greetingButton.addEventListener('click', () => {
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
  greetingOutput.textContent = greeting;
});

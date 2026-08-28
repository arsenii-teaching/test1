// ------------------------------------------------------------------
// Reusable flashcard viewer. Deck data lives in flashcards-data.js
// (window.FLASHCARD_DECKS). Point any container at a deck with:
//   <div data-flashcards data-deck="<deck id>"> ... </div>
// The container should include elements tagged with the data-role
// names listed in FLASHCARD_ROLES below.
// ------------------------------------------------------------------

const FLASHCARD_ROLES = ['deck-meta', 'progress', 'card', 'front', 'back', 'prev', 'flip', 'next', 'shuffle', 'reset'];

const getFlashcardElements = (root) => {
  const els = {};
  FLASHCARD_ROLES.forEach((role) => { els[role] = root.querySelector(`[data-role="${role}"]`); });
  return els;
};

const findFlashcardDeck = (deckId) => {
  const decks = window.FLASHCARD_DECKS || [];
  return decks.find((deck) => deck.id === deckId) || decks[0];
};

const shuffleCards = (cards) => {
  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

const initFlashcards = (root) => {
  const deck = findFlashcardDeck(root.dataset.deck);
  if (!deck || !deck.cards || !deck.cards.length) return;

  const els = getFlashcardElements(root);
  if (!els.card || !els.front || !els.back) return;

  const baseOrder = deck.cards.map((card, index) => ({ card, index }));
  let order = baseOrder.slice();
  let position = 0;
  let flipped = false;

  const render = () => {
    const current = order[position];
    els.front.textContent = current.card.front;
    els.back.textContent = current.card.back;
    els.progress.textContent = `Card ${position + 1} of ${order.length}`;
    if (els['deck-meta']) els['deck-meta'].textContent = `${deck.title} · ${order.length} cards`;
  };

  const setFlipped = (value) => {
    flipped = value;
    els.card.classList.toggle('is-flipped', flipped);
    els.card.setAttribute('aria-pressed', String(flipped));
    if (els.flip) els.flip.setAttribute('aria-pressed', String(flipped));
  };

  const flip = () => setFlipped(!flipped);

  const goTo = (next) => {
    position = (next + order.length) % order.length;
    setFlipped(false);
    render();
  };

  const step = (direction) => goTo(position + direction);

  const shuffle = () => {
    order = shuffleCards(order);
    goTo(0);
  };

  const reset = () => {
    order = baseOrder.slice();
    goTo(0);
  };

  els.card.addEventListener('click', flip);
  if (els.flip) els.flip.addEventListener('click', flip);
  if (els.prev) els.prev.addEventListener('click', () => step(-1));
  if (els.next) els.next.addEventListener('click', () => step(1));
  if (els.shuffle) els.shuffle.addEventListener('click', shuffle);
  if (els.reset) els.reset.addEventListener('click', reset);

  // Keyboard shortcuts, only while this panel is on screen.
  document.addEventListener('keydown', (event) => {
    const panel = root.closest('.page-panel');
    if (panel && !panel.classList.contains('active')) return;
    if (event.key === 'ArrowLeft') {
      step(-1);
      event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      step(1);
      event.preventDefault();
    } else if ((event.key === ' ' || event.key.toLowerCase() === 'f') && !(event.target instanceof HTMLElement && event.target.closest('button, a, input, textarea, select'))) {
      flip();
      event.preventDefault();
    }
  });

  render();
};

document.querySelectorAll('[data-flashcards]').forEach(initFlashcards);

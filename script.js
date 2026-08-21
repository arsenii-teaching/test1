const form = document.getElementById('contact-form');
const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let deck = [];
let playerHand = [];
let dealerHand = [];
let bankroll = 500;
let round = 1;
let handActive = false;

const elements = {
  dealerHand: document.getElementById('dealer-hand'),
  playerHand: document.getElementById('player-hand'),
  dealerScore: document.getElementById('dealer-score'),
  playerScore: document.getElementById('player-score'),
  message: document.getElementById('game-message'),
  bankroll: document.getElementById('bankroll'),
  round: document.getElementById('round-count'),
  bet: document.getElementById('bet-amount'),
  hit: document.getElementById('hit-button'),
  stand: document.getElementById('stand-button'),
  deal: document.getElementById('deal-button')
};

const createDeck = () => suits.flatMap((suit) => ranks.map((rank) => ({ suit, rank })));
const shuffle = (cards) => cards.sort(() => Math.random() - 0.5);

const handValue = (hand) => {
  let value = hand.reduce((sum, card) => sum + (card.rank === 'A' ? 11 : ['K', 'Q', 'J'].includes(card.rank) ? 10 : Number(card.rank)), 0);
  let aces = hand.filter((card) => card.rank === 'A').length;
  while (value > 21 && aces) { value -= 10; aces -= 1; }
  return value;
};

const renderCard = (card, hidden = false) => {
  if (hidden) return '<div class="playing-card hidden-card" aria-label="Hidden card"></div>';
  const colorClass = ['♥', '♦'].includes(card.suit) ? ' red' : '';
  return `<div class="playing-card${colorClass}"><span>${card.rank}${card.suit}</span><span class="card-bottom">${card.rank}${card.suit}</span></div>`;
};

const renderGame = (revealDealer = false) => {
  elements.playerHand.innerHTML = playerHand.map((card) => renderCard(card)).join('');
  elements.dealerHand.innerHTML = dealerHand.map((card, index) => renderCard(card, !revealDealer && index === 1)).join('');
  elements.playerScore.textContent = handValue(playerHand);
  elements.dealerScore.textContent = revealDealer ? handValue(dealerHand) : '?';
  elements.bankroll.textContent = `$${bankroll}`;
  elements.round.textContent = `Round ${round}`;
};

const setButtons = (active) => { elements.hit.disabled = !active; elements.stand.disabled = !active; };

const finishRound = (message, payout = 0) => {
  bankroll += payout;
  handActive = false;
  elements.message.textContent = message;
  setButtons(false);
  renderGame(true);
};

const dealHand = () => {
  const bet = Number(elements.bet.value);
  if (bet < 5 || bet > bankroll) { elements.message.textContent = `Choose a bet between $5 and $${bankroll}.`; return; }
  deck = shuffle(createDeck());
  bankroll -= bet;
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  handActive = true;
  elements.message.textContent = 'Your move. Hit or stand.';
  elements.deal.textContent = 'New hand';
  setButtons(true);
  renderGame();
  if (handValue(playerHand) === 21) finishRound('Blackjack. A beautiful start.', bet + Math.floor(bet * 1.5));
};

const hit = () => {
  if (!handActive) return;
  playerHand.push(deck.pop());
  renderGame();
  if (handValue(playerHand) > 21) finishRound('Bust. The house takes this one.');
  if (handValue(playerHand) === 21) stand();
};

const stand = () => {
  if (!handActive) return;
  while (handValue(dealerHand) < 17) dealerHand.push(deck.pop());
  const playerValue = handValue(playerHand);
  const dealerValue = handValue(dealerHand);
  const bet = Number(elements.bet.value);
  if (dealerValue > 21 || playerValue > dealerValue) finishRound('You win. The table tips its hat.', bet * 2);
  else if (playerValue === dealerValue) finishRound('Push. Your bet comes back to you.', bet);
  else finishRound('Dealer wins. Next hand?', 0);
};

elements.deal?.addEventListener('click', () => { round += 1; dealHand(); });
elements.hit?.addEventListener('click', hit);
elements.stand?.addEventListener('click', stand);
dealHand();

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

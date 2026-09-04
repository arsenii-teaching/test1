const pageButtons = document.querySelectorAll('[data-page]');
const pagePanels = document.querySelectorAll('.page-panel');

const showPage = (pageId) => {
  pageButtons.forEach((button) => {
    const isActive = button.dataset.page === pageId;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  pagePanels.forEach((panel) => panel.classList.toggle('active', panel.id === pageId));
  // Let embedded widgets (e.g. the car racing game) react to page switches.
  document.dispatchEvent(new CustomEvent('pagechange', { detail: { page: pageId } }));
};

pageButtons.forEach((button) => button.addEventListener('click', () => showPage(button.dataset.page)));

// Announce the page that is open on load.
const initialPanel = document.querySelector('.page-panel.active');
document.dispatchEvent(new CustomEvent('pagechange', { detail: { page: initialPanel ? initialPanel.id : 'home' } }));

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

// Blackjack — a minimal casino table for Terry
const PLAYER_NAME = 'Terry';
const BLACKJACK_BET = 10;
const STARTING_CHIPS = 100;
const SUITS = [
  { symbol: '♠', red: false },
  { symbol: '♥', red: true },
  { symbol: '♦', red: true },
  { symbol: '♣', red: false },
];
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const dealerCardsEl = document.getElementById('dealer-cards');
const playerCardsEl = document.getElementById('player-cards');
const dealerScoreEl = document.getElementById('dealer-score');
const playerScoreEl = document.getElementById('player-score');
const gameStatusEl = document.getElementById('game-status');
const chipsValueEl = document.getElementById('chips-value');
const dealButton = document.getElementById('deal-button');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');

let deck = [];
let dealerHand = [];
let playerHand = [];
let chips = STARTING_CHIPS;

const createDeck = () => SUITS.flatMap((suit) => RANKS.map((rank) => ({ rank, symbol: suit.symbol, red: suit.red })));

const shuffleDeck = (cards) => {
  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

const drawCard = () => {
  if (deck.length < 15) deck = shuffleDeck(createDeck());
  return deck.pop();
};

const handValue = (hand) => {
  let total = 0;
  let aces = 0;
  hand.forEach((card) => {
    if (card.rank === 'A') { total += 11; aces += 1; }
    else if (card.rank === 'J' || card.rank === 'Q' || card.rank === 'K') total += 10;
    else total += Number(card.rank);
  });
  while (total > 21 && aces > 0) { total -= 10; aces -= 1; }
  return total;
};

const isBlackjack = (hand) => hand.length === 2 && handValue(hand) === 21;

const buildCardEl = (card, faceDown) => {
  const cardEl = document.createElement('article');
  cardEl.className = faceDown ? 'playing-card face-down' : `playing-card${card.red ? ' red' : ''}`;
  if (faceDown) return cardEl;
  cardEl.innerHTML = `<span class="card-corner">${card.rank}${card.symbol}</span><span class="card-pip">${card.symbol}</span><span class="card-corner bottom">${card.rank}${card.symbol}</span>`;
  return cardEl;
};

const renderHands = (hideHole) => {
  dealerCardsEl.replaceChildren();
  dealerHand.forEach((card, index) => dealerCardsEl.appendChild(buildCardEl(card, hideHole && index === 1)));
  playerCardsEl.replaceChildren();
  playerHand.forEach((card) => playerCardsEl.appendChild(buildCardEl(card, false)));
  playerScoreEl.textContent = playerHand.length ? handValue(playerHand) : '';
  dealerScoreEl.textContent = !dealerHand.length ? '' : hideHole ? `${handValue([dealerHand[0]])} + ?` : handValue(dealerHand);
};

const setStatus = (message) => { gameStatusEl.textContent = message; };
const renderChips = () => { chipsValueEl.textContent = chips; };
const setControls = (deal, hit, stand) => {
  dealButton.disabled = !deal;
  hitButton.disabled = !hit;
  standButton.disabled = !stand;
};

const finishRound = (message, payout) => {
  chips += payout;
  renderChips();
  renderHands(false);
  setStatus(message);
  setControls(true, false, false);
};

const dealerTurn = () => {
  setControls(false, false, false);
  renderHands(false);
  setStatus('Dealer plays...');
  const step = () => {
    const dealerTotal = handValue(dealerHand);
    const playerTotal = handValue(playerHand);
    if (dealerTotal < 17) {
      dealerHand.push(drawCard());
      renderHands(false);
      setTimeout(step, 450);
      return;
    }
    if (dealerTotal > 21) finishRound(`Dealer busts at ${dealerTotal}. Terry wins ${BLACKJACK_BET * 2} chips!`, BLACKJACK_BET * 2);
    else if (dealerTotal > playerTotal) finishRound(`Dealer stands on ${dealerTotal} and takes the round.`, 0);
    else if (dealerTotal === playerTotal) finishRound(`Both stand on ${dealerTotal} — the round is a push.`, BLACKJACK_BET);
    else finishRound(`Terry's ${playerTotal} beats the dealer's ${dealerTotal}. ${BLACKJACK_BET * 2} chips to Terry!`, BLACKJACK_BET * 2);
  };
  setTimeout(step, 450);
};

const dealRound = () => {
  const reloaded = chips < BLACKJACK_BET;
  if (reloaded) chips = STARTING_CHIPS;
  chips -= BLACKJACK_BET;
  renderChips();
  playerHand = [drawCard(), drawCard()];
  dealerHand = [drawCard(), drawCard()];
  renderHands(true);

  const playerBlackjack = isBlackjack(playerHand);
  const dealerBlackjack = isBlackjack(dealerHand);
  if (playerBlackjack || dealerBlackjack) {
    if (playerBlackjack && dealerBlackjack) finishRound('Both have blackjack — the round is a push.', BLACKJACK_BET);
    else if (playerBlackjack) finishRound(`Blackjack! It pays 3 to 2 — ${PLAYER_NAME} wins ${BLACKJACK_BET + Math.floor(BLACKJACK_BET * 1.5)} chips.`, BLACKJACK_BET + Math.floor(BLACKJACK_BET * 1.5));
    else finishRound('Dealer flips blackjack. The house takes the round.', 0);
    return;
  }
  setControls(false, true, true);
  setStatus(reloaded ? `Fresh ${STARTING_CHIPS} chips from the house. Hit or stand, ${PLAYER_NAME}?` : `Hit or stand, ${PLAYER_NAME}?`);
};

const hitCard = () => {
  playerHand.push(drawCard());
  renderHands(true);
  const total = handValue(playerHand);
  if (total > 21) finishRound(`${PLAYER_NAME} busts at ${total}. The house takes the round.`, 0);
  else if (total === 21) dealerTurn();
  else setStatus(`${PLAYER_NAME} holds ${total}. Hit or stand?`);
};

dealButton.addEventListener('click', dealRound);
hitButton.addEventListener('click', hitCard);
standButton.addEventListener('click', dealerTurn);

renderChips();
setControls(true, false, false);
setStatus(`Welcome to the table, ${PLAYER_NAME}! Each deal costs ${BLACKJACK_BET} chips.`);

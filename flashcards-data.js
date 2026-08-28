// ------------------------------------------------------------------
// Flashcard data — kept separate from the viewer code in flashcards.js
// so decks are easy to edit here and reuse anywhere on the site.
//
// How it works:
// 1. Each deck is an object: { id, title, cards: [{ front, back }] }
//    - id:    unique name with no spaces — used by data-deck on the page
//    - title: shown in the study window header
//    - cards: front = term / prompt, back = definition / answer
// 2. To add a deck, copy a deck object, give it a new id, and edit cards.
// 3. Show it anywhere with: <div data-flashcards data-deck="<deck id>">...
// ------------------------------------------------------------------

window.FLASHCARD_DECKS = [
  {
    id: 'apmicro-unit-1',
    title: 'ap-micro / unit-1',
    cards: [
      { front: 'Scarcity', back: 'People have unlimited wants but only limited resources. Scarcity forces individuals and societies to make choices — it is the basic problem all of economics studies.' },
      { front: 'Economics', back: 'The social science that studies how individuals, businesses, and societies choose to use scarce resources to satisfy unlimited wants.' },
      { front: 'Opportunity cost', back: 'The value of the next best alternative given up when a choice is made — what you sacrifice to get something else.' },
      { front: 'Trade-off', back: 'All of the alternatives given up whenever a choice is made. Every decision trades one thing for another.' },
      { front: 'Land (factor of production)', back: 'All natural resources used to make goods and services — soil, water, minerals, forests, and animals.' },
      { front: 'Labor (factor of production)', back: 'The physical and mental effort people contribute to producing goods and services.' },
      { front: 'Capital (factor of production)', back: 'Man-made goods used to produce other goods and services — tools, machines, and factories. Money itself is not capital; it is financial capital.' },
      { front: 'Entrepreneurship (factor of production)', back: 'The initiative to combine land, labor, and capital, take on risk, and innovate in search of profit.' },
      { front: 'Physical capital vs. human capital', back: 'Physical capital is tools, machinery, and buildings. Human capital is the knowledge and skills workers gain from education, training, and experience.' },
      { front: 'Capital goods vs. consumer goods', back: 'Capital goods (machines, factories) are used to produce other goods; consumer goods (pizza, shoes) are enjoyed directly. Choosing more capital goods today shifts tomorrow’s PPC outward — faster growth.' },
      { front: 'Production possibilities curve (PPC)', back: 'A model showing the maximum combinations of two goods an economy can produce with its current resources and technology. Also called the production possibilities frontier (PPF).' },
      { front: 'Productive efficiency', back: 'A point on the PPC: all resources are fully and efficiently employed, so producing more of one good requires producing less of the other.' },
      { front: 'Inefficient output', back: 'A point inside the PPC: resources are unemployed or underused, so the economy could produce more of both goods without any trade-off.' },
      { front: 'Unattainable output', back: 'A point beyond the PPC: the economy lacks the resources or technology to produce that combination right now.' },
      { front: 'Constant opportunity cost', back: 'A straight-line PPC. Resources are equally suited to making either good, so each extra unit of one good always costs the same amount of the other.' },
      { front: 'Law of increasing opportunity cost', back: 'A bowed-out (concave) PPC. Resources are specialized, so producing additional units of one good requires giving up ever-larger amounts of the other.' },
      { front: 'Economic growth', back: 'An outward shift of the PPC caused by more resources, better resources, or improved technology — the economy can now produce more of both goods.' },
      { front: 'Absolute advantage', back: 'The ability to produce more of a good using the same resources (or the same output with fewer resources) than another producer.' },
      { front: 'Comparative advantage', back: 'The ability to produce a good at a lower opportunity cost than another producer. Comparative advantage — not absolute advantage — is the basis for specialization and trade.' },
      { front: 'Specialization', back: 'When a producer concentrates on making the goods in which it holds a comparative advantage, then trades for the rest.' },
      { front: 'Terms of trade', back: 'The rate at which two goods are exchanged between trading partners. Trade is mutually beneficial when the terms fall between the two parties’ opportunity costs.' },
      { front: 'Gains from trade', back: 'When producers specialize according to comparative advantage and trade, both parties end up consuming more than they could produce on their own.' },
      { front: 'Marginal analysis', back: 'Making decisions by comparing the additional benefit of one more unit (marginal benefit) against its additional cost (marginal cost). Take the action when marginal benefit ≥ marginal cost.' },
      { front: 'Utility', back: 'The satisfaction a person gets from consuming a good or service. Consumers try to maximize utility; businesses try to maximize profit.' },
      { front: 'Ceteris paribus', back: '“All else equal.” The assumption that everything except the variables being studied stays constant, so their relationship can be isolated.' },
      { front: 'Positive statement', back: 'A claim that can be tested against facts — “The unemployment rate is 5%.” It describes the world as it is.' },
      { front: 'Normative statement', back: 'A claim based on values or opinions that cannot be tested — “The government should create more jobs.” It describes the world as it ought to be.' },
      { front: 'Free market economy', back: 'An economic system where resources are privately owned and allocated by buyers, sellers, and prices, with little or no government involvement.' },
      { front: 'Command economy', back: 'An economic system where a central government owns the resources and decides what, how, and for whom to produce.' },
      { front: 'Mixed economy', back: 'An economic system that combines free markets with some government involvement. Most real-world economies — including the U.S. — are mixed.' },
      { front: 'Invisible hand', back: 'Adam Smith’s idea that people pursuing their own self-interest in competitive markets are led, as if by an unseen force, to benefit society as a whole.' },
      { front: 'Private property rights', back: 'The right of individuals and businesses to own, use, and dispose of property and resources. Strong property rights make markets work and give people incentives to produce.' },
    ],
  },

  // Add the next deck below, then point a page element at it:
  // <div data-flashcards data-deck="apmicro-unit-2"> ...
  //
  // {
  //   id: 'apmicro-unit-2',
  //   title: 'ap-micro / unit-2',
  //   cards: [
  //     { front: 'Demand', back: '...' },
  //   ],
  // },
];

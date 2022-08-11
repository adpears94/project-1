const ScryfallFetch = require('../scripts').ScryfallFetch;

/**
 * @jest-environment jsdom
 */

test('use jsdom and set the URL in this test file', () => {
  expect(window.location.href).toBe('../Card.html');
});

describe('Scryfall', () => {
  describe('fetch method for scryfall api', () => {
    test('does a fetch for a random card', () => {
      const card = new ScryfallFetch.getRandom();
      expect(card).toBeInstanceOf(ScryfallFetch)
    });
  });
});
import { Deck } from "@features/card";
import { describe, expect, test } from "vitest";

describe("Card", () => {
  test("should deck be 52 cards", () => {
    const deck = new Deck();
    expect(deck.length()).toBe(52);
  });

  test("should deck be shuffled", () => {
    const deck = new Deck();
    const originalDeck = [...deck];
    deck.shuffle();
    expect(deck).not.toEqual(originalDeck);
  });

  test("should draw card by value", () => {
    const deck = new Deck();
    const card = deck.drawByValue("As");
    expect(card.value).toBe("As");
  });

  test("should delete drawn card from deck", () => {
    const deck = new Deck();
    const card = deck.drawByValue("As");
    expect(card.value).toBe("As");
    expect(deck.length()).toBe(51);
    expect(deck.getDrawnCards().map((c) => c.value)).toEqual([card.value]);
  });
});

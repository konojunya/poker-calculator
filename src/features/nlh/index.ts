import { Card, Deck, CardValue } from "../card";

type Hand = [Card, Card];
type Community = Card[];
type Round = "pre-flop" | "flop" | "turn" | "river" | "showdown";

interface HandRank {
  rank:
    | "high-card"
    | "pair"
    | "two-pair"
    | "three-of-a-kind"
    | "straight"
    | "flush"
    | "full-house"
    | "four-of-a-kind"
    | "straight-flush";
  cards: Card[];
}

export class MLH {
  private readonly _deck: Deck;
  private _community: Community = [];

  public constructor() {
    this._deck = new Deck();
    this._deck.shuffle();
  }

  public get round(): Round {
    switch (this._community.length) {
      case 0: {
        return "pre-flop";
      }
      case 3: {
        return "flop";
      }
      case 4: {
        return "turn";
      }
      case 5: {
        return "river";
      }
      default: {
        return "showdown";
      }
    }
  }

  public get community(): Community {
    return this._community;
  }

  public flop(cards: [CardValue, CardValue, CardValue]): void {
    if (this.round !== "pre-flop") {
      throw new Error("Cannot flop after the pre-flop round");
    }

    const [card1, card2, card3] = cards;
    this._community.push(
      this._deck.drawByValue(card1),
      this._deck.drawByValue(card2),
      this._deck.drawByValue(card3),
    );
  }

  public turn(card: CardValue): void {
    if (this.round !== "flop") {
      throw new Error("Cannot turn after the flop round");
    }

    this._community.push(this._deck.drawByValue(card));
  }

  public river(card: CardValue): void {
    if (this.round !== "turn") {
      throw new Error("Cannot river after the turn round");
    }

    this._community.push(this._deck.drawByValue(card));
  }

  public showdown(): void {
    if (this.round !== "river") {
      throw new Error("Cannot showdown after the river round");
    }
  }

  public calculateHandRank(player: Player): HandRank {
    const allCards = [...player.hand, ...this._community];
    const allCombinations = this.generateAllCombinations(allCards, 5);
    const handRanks = allCombinations.map((combination) => {
      const rank = this.calculateRank(combination);
      return { rank, cards: combination };
    });

    return handRanks.reduce((prev, current) =>
      this.compareHandRanks(prev, current) > 0 ? prev : current,
    );
  }

  private generateAllCombinations<T>(arr: T[], length: number): T[][] {
    if (length === 1) {
      return arr.map((value) => [value]);
    }

    return arr.flatMap((value, index) =>
      this.generateAllCombinations(arr.slice(index + 1), length - 1).map(
        (combination) => [value, ...combination],
      ),
    );
  }

  private compareHandRanks(rank1: HandRank, rank2: HandRank): number {
    const rankOrder = [
      "high-card",
      "pair",
      "two-pair",
      "three-of-a-kind",
      "straight",
      "flush",
      "full-house",
      "four-of-a-kind",
      "straight-flush",
    ];

    const rank1Index = rankOrder.indexOf(rank1.rank);
    const rank2Index = rankOrder.indexOf(rank2.rank);

    if (rank1Index !== rank2Index) {
      return rank1Index - rank2Index;
    }

    for (let i = 0; i < rank1.cards.length; i++) {
      const card1 = rank1.cards[i];
      const card2 = rank2.cards[i];

      if (card1.value !== card2.value) {
        return card1.value - card2.value;
      }
    }

    return 0;
  }

  private isStraightFlush(cards: Card[]): boolean {
    return this.isStraight(cards) && this.isFlush(cards);
  }

  private isFourOfAKind(cards: Card[]): boolean {
    return this.hasSameRank(cards, 4);
  }

  private isFullHouse(cards: Card[]): boolean {
    return this.hasSameRank(cards, 3) && this.hasSameRank(cards, 2);
  }

  private isFlush(cards: Card[]): boolean {
    return cards.every((card) => card.suit === cards[0].suit);
  }

  private isStraight(cards: Card[]): boolean {
    const sortedCards = cards.sort((a, b) => a.value - b.value);
    const isLowStraight = sortedCards.every(
      (card, index) => card.value === index + 2,
    );
    const isHighStraight = sortedCards.every(
      (card, index) => card.value === index + 10,
    );

    return isLowStraight || isHighStraight;
  }

  private isThreeOfAKind(cards: Card[]): boolean {
    return this.hasSameRank(cards, 3);
  }

  private isTwoPair(cards: Card[]): boolean {
    return this.hasSameRank(cards, 2, 2);
  }

  private isPair(cards: Card[]): boolean {
    return this.hasSameRank(cards, 2);
  }

  private hasSameRank(cards: Card[], count: number, pairCount = 1): boolean {
    const rankCounts = cards.reduce(
      (acc, card) => {
        acc[card.value] = (acc[card.value] || 0) + 1;
        return acc;
      },
      {} as Record<CardValue, number>,
    );

    const counts = Object.values(rankCounts);
    return counts.includes(count) && counts.length === pairCount + 1;
  }

  private calcurateRank(cards: Card[]): HandRank {
    if (this.isStraightFlush(cards)) {
      return { rank: "straight-flush", cards };
    }
    if (this.isFourOfAKind(cards)) {
      return { rank: "four-of-a-kind", cards };
    }
    if (this.isFullHouse(cards)) {
      return { rank: "full-house", cards };
    }
    if (this.isFlush(cards)) {
      return { rank: "flush", cards };
    }
    if (this.isStraight(cards)) {
      return { rank: "straight", cards };
    }
    if (this.isThreeOfAKind(cards)) {
      return { rank: "three-of-a-kind", cards };
    }
    if (this.isTwoPair(cards)) {
      return { rank: "two-pair", cards };
    }
    if (this.isPair(cards)) {
      return { rank: "pair", cards };
    }
    return { rank: "high-card", cards };
  }
}

export class Player {
  private readonly _hand: Hand;

  public constructor(hand: Hand) {
    this._hand = hand;
  }

  public get hand(): Hand {
    return this._hand;
  }
}

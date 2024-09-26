type Rank =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "10"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";
type Suit = "s" | "d" | "c" | "h";
export type CardValue = `${Rank}${Suit}`;

export class Card {
  private readonly _rank: Rank;
  private readonly _suit: Suit;

  public constructor(
    public rank: Rank,
    public suit: Suit,
  ) {
    this._rank = rank;
    this._suit = suit;
  }

  public get value(): CardValue {
    return `${this._rank}${this._suit}`;
  }
}

export class Deck {
  private _cards: Card[] = [];
  private _drawnCards: Card[] = []; // すでに排出したカードを保持する配列

  public constructor() {
    this._cards = this.generateDeck();
  }

  public [Symbol.iterator](): Iterator<Card> {
    let index = 0;
    return {
      next: () => {
        return index < this._cards.length
          ? {
              value: this._cards[index++],
              done: false,
            }
          : {
              value: null,
              done: true,
            };
      },
    };
  }

  private generateDeck(): Card[] {
    const ranks: Rank[] = [
      "A",
      "K",
      "Q",
      "J",
      "10",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
    ];
    const suits: Suit[] = ["s", "d", "c", "h"];

    return ranks.flatMap((rank) => suits.map((suit) => new Card(rank, suit)));
  }

  public shuffle(): void {
    this._cards = this._cards.sort(() => Math.random() - 0.5);
    this._drawnCards = []; // シャッフル時にすでに排出されたカードをリセット
  }

  public length(): number {
    return this._cards.length;
  }

  public drawByValue(value: CardValue): Card {
    const cardIndex = this._cards.findIndex((card) => card.value === value);
    if (cardIndex === -1) {
      throw new Error(`Card with value ${value} not found`);
    }

    const card = this._cards.splice(cardIndex, 1)[0]; // カードをデッキから削除
    this._drawnCards.push(card); // 排出されたカードを追加

    return card;
  }

  // 残っているカードの一覧を取得
  public getRemainingCards(): Card[] {
    return this._cards;
  }

  // 排出されたカードの一覧を取得
  public getDrawnCards(): Card[] {
    return this._drawnCards;
  }
}

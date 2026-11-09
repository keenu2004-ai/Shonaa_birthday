/**
 * High-performance, unbiased Shuffle Bag algorithm.
 * Guarantees that every unique media item is displayed once
 * before any item repeats, with zero back-to-back repetitions across cycles.
 */

export class ShuffleBag<T> {
  private allItems: T[] = [];
  private currentBag: T[] = [];
  private lastDrawnItem: T | null = null;
  private keyExtractor?: (item: T) => string;
  private cycle: number = 0;

  constructor(items: T[], keyExtractor?: (item: T) => string) {
    this.keyExtractor = keyExtractor;
    this.setItems(items);
  }

  /**
   * Updates or initializes the items in the bag, deduplicating by key.
   */
  public setItems(items: T[]): void {
    if (this.keyExtractor) {
      const seen = new Set<string>();
      this.allItems = items.filter(item => {
        const key = this.keyExtractor!(item);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    } else {
      this.allItems = [...items];
    }

    this.cycle = 0;
    this.lastDrawnItem = null;
    this.refillAndShuffle();
  }

  /**
   * Refills the bag from the master list and applies Fisher-Yates shuffle.
   */
  private refillAndShuffle(): void {
    if (this.allItems.length === 0) {
      this.currentBag = [];
      return;
    }

    this.currentBag = [...this.allItems];

    // Fisher-Yates Shuffle
    for (let i = this.currentBag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.currentBag[i], this.currentBag[j]] = [this.currentBag[j], this.currentBag[i]];
    }

    // Guard against back-to-back repetitions across cycle boundaries
    if (
      this.lastDrawnItem &&
      this.currentBag.length > 1 &&
      this.isEqual(this.currentBag[this.currentBag.length - 1], this.lastDrawnItem)
    ) {
      // Swap the first item with a random other element in the bag
      const swapIndex = Math.floor(Math.random() * (this.currentBag.length - 1));
      [this.currentBag[this.currentBag.length - 1], this.currentBag[swapIndex]] = [
        this.currentBag[swapIndex],
        this.currentBag[this.currentBag.length - 1],
      ];
    }

    this.cycle++;
  }

  private isEqual(a: T, b: T): boolean {
    if (this.keyExtractor) {
      return this.keyExtractor(a) === this.keyExtractor(b);
    }
    return a === b;
  }

  /**
   * Draws the next random item from the bag.
   */
  public draw(): T | null {
    if (this.allItems.length === 0) return null;

    if (this.currentBag.length === 0) {
      this.refillAndShuffle();
    }

    const item = this.currentBag.pop()!;
    this.lastDrawnItem = item;
    return item;
  }

  /**
   * Draws multiple distinct items from the bag.
   */
  public drawMultiple(count: number): T[] {
    const result: T[] = [];
    const needed = Math.min(count, this.allItems.length);
    for (let i = 0; i < needed; i++) {
      const drawn = this.draw();
      if (drawn !== null) result.push(drawn);
    }
    return result;
  }

  /**
   * Peeks at the next item that will be drawn without consuming it (useful for preloading).
   */
  public peekNext(): T | null {
    if (this.allItems.length === 0) return null;
    if (this.currentBag.length === 0) {
      return this.allItems[0] || null;
    }
    return this.currentBag[this.currentBag.length - 1] || null;
  }

  public getAllItems(): T[] {
    return [...this.allItems];
  }

  public getTotalUniqueCount(): number {
    return this.allItems.length;
  }

  public getRemainingInCycle(): number {
    return this.currentBag.length;
  }

  public getCycleCount(): number {
    return this.cycle;
  }
}


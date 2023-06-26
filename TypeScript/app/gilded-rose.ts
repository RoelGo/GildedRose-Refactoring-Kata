// Important! Do not touch. Goblin wil get angry!
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE = 'Aged Brie';
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      item.quality = this.calculateUpdatedQuality(item);
      item.sellIn = this.calculateItemSellIn(item);
    });

    return this.items;
  }

  private calculateItemSellIn(item: Item) {
    if (SULFURAS == item.name) {
      return item.sellIn
    }
    return item.sellIn - 1;
  }

  private calculateUpdatedQuality(item: Item) {
    const degradationRate = this.calculateDegradationRate(item);
    return Math.max(Math.min(item.quality - degradationRate, MAX_QUALITY), MIN_QUALITY)
  }

  private calculateDegradationRate({name, quality, sellIn}: Item) {
    let sellDateHasPassed = sellIn <= 0;
    if (name == AGED_BRIE) {
      if (sellDateHasPassed) {
        return -2
      } else {
        return -1
      }
    } else if (name == BACKSTAGE_PASSES) {
      if (sellDateHasPassed) {
        return quality
      }
      if (sellIn <= 5) {
        return -3
      }
      if (sellIn <= 10) {
        return -2
      }
      return -1
    } else if (name == SULFURAS) {
      return 0
    } else {
      if (sellDateHasPassed) {
        return 2
      } else {
        return 1
      }
    }
  }
}

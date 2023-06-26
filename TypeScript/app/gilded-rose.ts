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

  private calculateUpdatedQuality({name, quality, sellIn}: Item) {
    if (name == AGED_BRIE) {
      quality = this.increaseQuality(quality);
      if (sellIn < 0) {
        quality = this.increaseQuality(quality)
      }
    } else if (name == BACKSTAGE_PASSES) {
      quality = this.increaseQuality(quality);
      if (sellIn <= 10) {
        quality = this.increaseQuality(quality);
      }
      if (sellIn <= 5) {
        quality = this.increaseQuality(quality);
      }
      if (sellIn <= 0) {
        quality = 0
      }
    } else if (name == SULFURAS) {
    } else {
      quality = this.decreaseQuality(quality);
      if (sellIn < 0) {
        quality = this.decreaseQuality(quality)
      }
    }
    return quality
  }

  private decreaseQuality(quality: number) {
    if (quality > MIN_QUALITY) {
      return quality - 1
    }
    return quality
  }

  private increaseQuality(quality: number) {
    if (quality < MAX_QUALITY) {
      return quality + 1
    }
    return quality
  }
}

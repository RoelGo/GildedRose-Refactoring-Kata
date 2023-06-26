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
      if (item.name == AGED_BRIE) {
        this.increaseQuality(item);
        if (item.sellIn < 0) {
          this.increaseQuality(item)
        }
      } else if (item.name == BACKSTAGE_PASSES) {
        this.increaseQuality(item);
        if (item.sellIn <= 10) {
          this.increaseQuality(item);
        }
        if (item.sellIn <= 5) {
          this.increaseQuality(item);
        }
        if (item.sellIn <= 0) {
          item.quality = 0
        }
      } else if (item.name == SULFURAS) {
      } else {
        this.decreaseQuality(item);
        if (item.sellIn < 0) {
          this.decreaseQuality(item)
        }
      }
      if (item.name != SULFURAS) {
        item.sellIn = item.sellIn - 1;
      }
    });

    return this.items;
  }

  private decreaseQuality(item: Item) {
    if (item.quality > MIN_QUALITY) {
      item.quality = item.quality - 1
    }
  }

  private increaseQuality(item: Item) {
    if (item.quality < MAX_QUALITY) {
      item.quality = item.quality + 1
    }
  }
}

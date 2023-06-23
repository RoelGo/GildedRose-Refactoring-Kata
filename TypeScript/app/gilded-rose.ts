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
      if (item.name != AGED_BRIE && item.name != BACKSTAGE_PASSES) {
        if (item.quality > MIN_QUALITY) {
          if (item.name != SULFURAS) {
            item.quality = item.quality - 1
          }
        }
      } else {
        if (item.quality < MAX_QUALITY) {
          item.quality = item.quality + 1
          if (item.name == BACKSTAGE_PASSES) {
            if (item.sellIn <= 10) {
              if (item.quality < MAX_QUALITY) {
                item.quality = item.quality + 1
              }
            }
            if (item.sellIn <= 5) {
              if (item.quality < MAX_QUALITY) {
                item.quality = item.quality + 1
              }
            }
          }
        }
      }
      if (item.name != SULFURAS) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != AGED_BRIE) {
          if (item.name != BACKSTAGE_PASSES) {
            if (item.quality > MIN_QUALITY) {
              if (item.name != SULFURAS) {
                item.quality = item.quality - 1
              }
            }
          } else {
            item.quality = 0
          }
        } else {
          if (item.quality < MAX_QUALITY) {
            item.quality = item.quality + 1
          }
        }
      }
    });

    return this.items;
  }
}

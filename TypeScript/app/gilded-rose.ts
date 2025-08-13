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

class ItemContainer {
  private readonly item: Item;

  constructor(item: Item) {
    this.item = item;
  }

  ageItem() {
    this.item.quality = this.calculateUpdatedQuality();
    this.item.sellIn = this.calculateItemSellIn();
  }

  private calculateItemSellIn() {
    const {sellIn, name} = this.item;
    return SULFURAS == name ? sellIn : sellIn - 1;
  }

  private calculateUpdatedQuality() {
    const degradationRate = this.getDegradationRate();
    return Math.max(Math.min(this.item.quality - degradationRate, MAX_QUALITY), MIN_QUALITY)
  }

  private getDegradationRate() {
    return calculateDegradationRate(this.item);
  }
}

const AGED_BRIE = 'Aged Brie';
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const CONJURED = 'Conjured Mana Cake';
const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  getContainedItems(): Array<ItemContainer> {
    return this.items.map(item => new ItemContainer(item));
  }

  updateQuality() {
    this.getContainedItems().forEach(container => {
      container.ageItem()
    });

    return this.items;
  }

}

function calculateDegradationRate({name, quality, sellIn}: Item) {
  const sellDateHasPassed = sellIn <= 0;
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
  } else if (name === CONJURED) {
    if (sellDateHasPassed) {
      return 4
    }
    return 2
  } else {
    if (sellDateHasPassed) {
      return 2
    } else {
      return 1
    }
  }
}


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

  protected getItem() {
    return this.item;
  }

  sellDateHasPassed() {
    return this.item.sellIn <= 0;
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

  protected getDegradationRate(): number {
    if (this.sellDateHasPassed()) {
      return 2
    } else {
      return 1
    }
  }
}

abstract class SpecialContainer<T extends Pick<Item, "name">> extends ItemContainer {
  constructor(item: Item & T) {
    super(item);
  }

}

type AgedBrie = { name: 'Aged Brie' };

class AgedBrieContainer extends SpecialContainer<AgedBrie> {
  protected override getDegradationRate() {
    if (this.sellDateHasPassed()) {
      return -2
    } else {
      return -1
    }
  }
}

type BackstagePasses = { name: 'Backstage passes to a TAFKAL80ETC concert' };

class BackstagePassesContainer extends SpecialContainer<BackstagePasses> {
  protected override getDegradationRate() {
    const {quality, sellIn} = this.getItem();
    if (super.sellDateHasPassed()) {
      return quality
    }
    if (sellIn <= 5) {
      return -3
    }
    if (sellIn <= 10) {
      return -2
    }
    return -1
  }
}

type Sulfuras = { name: 'Sulfuras, Hand of Ragnaros' };

class SulfurasContainer extends SpecialContainer<Sulfuras> {
  protected override getDegradationRate() {
    return 0
  }
}

type Conjured = { name: 'Conjured Mana Cake' };

class ConjuredContainer extends SpecialContainer<Conjured> {
  protected override getDegradationRate() {
    if (this.sellDateHasPassed()) {
      return 4
    }
    return 2
  }
}

const AGED_BRIE = 'Aged Brie';
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const CONJURED = 'Conjured Mana Cake';
const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

function isAgedBrie(item: Item): item is Item & AgedBrie {
  return item.name === AGED_BRIE;
}

function isBackstagePasses(item: Item): item is Item & BackstagePasses {
  return item.name === BACKSTAGE_PASSES;
}

function isSulfuras(item: Item): item is Item & Sulfuras {
  return item.name === SULFURAS;
}

function isConjured(item: Item): item is Item & Conjured {
  return item.name === CONJURED;
}

function putItemIntoContainer(item: Item): ItemContainer {
  if (isAgedBrie(item)) {
    return new AgedBrieContainer(item);
  } else if (isBackstagePasses(item)) {
    return new BackstagePassesContainer(item);
  } else if (isSulfuras(item)) {
    return new SulfurasContainer(item);
  } else if (isConjured(item)) {
    return new ConjuredContainer(item);
  }
  return new ItemContainer(item);
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  getContainedItems(): Array<ItemContainer> {
    return this.items.map(putItemIntoContainer);
  }

  updateQuality() {
    this.getContainedItems().forEach(container => {
      container.ageItem()
    });

    return this.items;
  }

}

import {Item} from "@/gilded-rose";

export class ItemContainer {
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

  protected calculateItemSellIn() {
    return this.item.sellIn - 1;
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

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

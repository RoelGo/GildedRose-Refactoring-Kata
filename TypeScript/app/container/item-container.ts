import {Item} from "@/gilded-rose";

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

export abstract class ItemContainer {
  private readonly item: Item;

  constructor(item: Item) {
    this.item = item;
  }

  protected getItem() {
    return this.item;
  }

  protected sellDateHasPassed() {
    return this.item.sellIn <= 0;
  }

  public ageItem() {
    this.item.quality = this.calculateUpdatedQuality();
    this.item.sellIn = this.calculateItemSellIn();
  }

  private calculateUpdatedQuality() {
    const degradationRate = this.getDegradationRate();
    return Math.max(Math.min(this.item.quality - degradationRate, MAX_QUALITY), MIN_QUALITY)
  }

  protected abstract calculateItemSellIn(): number
  protected abstract getDegradationRate(): number
}

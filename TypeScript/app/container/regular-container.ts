import {ItemContainer} from "@/container/item-container";

export class RegularContainer extends ItemContainer {
  protected override calculateItemSellIn() {
    return this.getItem().sellIn - 1;
  }

  protected override getDegradationRate(): number {
    if (this.sellDateHasPassed()) {
      return 2
    } else {
      return 1
    }
  }
}

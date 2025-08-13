import {ItemContainer} from "@/container/item-container";
import {Item} from "@/gilded-rose";

export abstract class SpecialContainer<T extends Pick<Item, "name">> extends ItemContainer {
  constructor(item: Item & T) {
    super(item);
  }

  protected override calculateItemSellIn() {
    return this.getItem().sellIn - 1;
  }
}

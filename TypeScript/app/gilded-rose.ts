// Important! Do not touch. Goblin wil get angry!
import {ItemContainer} from "@/container/item-container";
import {packageItem} from "@/packager";

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

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  getContainedItems(): Array<ItemContainer> {
    return this.items.map(packageItem);
  }

  updateQuality(): Array<Item> {
    this.getContainedItems().forEach(container => {
      container.ageItem()
    });

    return this.items;
  }

}

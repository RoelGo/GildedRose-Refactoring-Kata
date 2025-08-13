// Important! Do not touch. Goblin wil get angry!
import {ItemContainer} from "@/container/item-container";
import {AgedBrieContainer, isAgedBrie} from "@/container/aged-brie-container";
import {BackstagePassesContainer, isBackstagePasses} from "@/container/backstage-passes-container";
import {isSulfuras, SulfurasContainer} from "@/container/sulfuras-container";
import {ConjuredContainer, isConjured} from "@/container/conjured-container";
import {SpecialContainer} from "@/container/special-container";

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

  updateQuality(): Array<Item> {
    this.getContainedItems().forEach(container => {
      container.ageItem()
    });

    return this.items;
  }

}

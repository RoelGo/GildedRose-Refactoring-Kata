import {SpecialContainer} from "@/container/special-container";
import {Item} from "@/gilded-rose";

type Sulfuras = { name: 'Sulfuras, Hand of Ragnaros' };

export class SulfurasContainer extends SpecialContainer<Sulfuras> {
  protected override getDegradationRate() {
    return 0
  }

  protected override calculateItemSellIn() {
    return this.getItem().sellIn;
  }
}

const SULFURAS = 'Sulfuras, Hand of Ragnaros';

export function isSulfuras(item: Item): item is Item & Sulfuras {
  return item.name === SULFURAS;
}

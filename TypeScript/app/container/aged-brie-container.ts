import {SpecialContainer} from "@/container/special-container";
import {Item} from "@/gilded-rose";

type AgedBrie = { name: 'Aged Brie' };

export class AgedBrieContainer extends SpecialContainer<AgedBrie> {
  protected override getDegradationRate() {
    if (this.sellDateHasPassed()) {
      return -2
    } else {
      return -1
    }
  }
}

const AGED_BRIE = 'Aged Brie';

export function isAgedBrie(item: Item): item is Item & AgedBrie {
  return item.name === AGED_BRIE;
}

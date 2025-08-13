import {SpecialContainer} from "@/container/special-container";
import {Item} from "@/gilded-rose";

type BackstagePasses = { name: 'Backstage passes to a TAFKAL80ETC concert' };

export class BackstagePassesContainer extends SpecialContainer<BackstagePasses> {
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

const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';

export function isBackstagePasses(item: Item): item is Item & BackstagePasses {
  return item.name === BACKSTAGE_PASSES;
}

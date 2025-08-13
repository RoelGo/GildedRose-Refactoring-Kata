import {SpecialContainer} from "@/container/special-container";
import {Item} from "@/gilded-rose";

type Conjured = { name: 'Conjured Mana Cake' };

export class ConjuredContainer extends SpecialContainer<Conjured> {
  protected override getDegradationRate() {
    if (this.sellDateHasPassed()) {
      return 4
    }
    return 2
  }
}

const CONJURED = 'Conjured Mana Cake';

export function isConjured(item: Item): item is Item & Conjured {
  return item.name === CONJURED;
}

import {ItemContainer} from "@/container/item-container";
import {AgedBrieContainer, isAgedBrie} from "@/container/aged-brie-container";
import {BackstagePassesContainer, isBackstagePasses} from "@/container/backstage-passes-container";
import {isSulfuras, SulfurasContainer} from "@/container/sulfuras-container";
import {ConjuredContainer, isConjured} from "@/container/conjured-container";
import {Item} from "@/gilded-rose";
import {RegularContainer} from "@/container/regular-container";

export function packageItem(item: Item): ItemContainer {
  if (isAgedBrie(item)) {
    return new AgedBrieContainer(item);
  } else if (isBackstagePasses(item)) {
    return new BackstagePassesContainer(item);
  } else if (isSulfuras(item)) {
    return new SulfurasContainer(item);
  } else if (isConjured(item)) {
    return new ConjuredContainer(item);
  }
  return new RegularContainer(item);
}

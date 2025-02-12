import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('item quality and sellIn should decrease at the end of each day', () => {
    const gildedRose = new GildedRose([new Item('Generic Item', 6, 5)]);
    const [item] = gildedRose.updateQuality();
    expect(item).toMatchObject({
      sellIn: 5,
      quality: 4
    });
  });

  it('item quality should decrease twice as fast when sellIn has passed', () => {
    const gildedRose = new GildedRose([new Item('Generic Item', -1, 5)]);
    const [item] = gildedRose.updateQuality();
    expect(item).toMatchObject({
      sellIn: -2,
      quality: 3
    });
  });

  it('item quality should not be negative', () => {
    const gildedRose = new GildedRose([new Item('Generic Item', 2, 0)]);
    const [item] = gildedRose.updateQuality();
    expect(item).toMatchObject({
      sellIn: 1,
      quality: 0
    });
  });

  it('aged brie quality should increase', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 0)]);
    const [item] = gildedRose.updateQuality();
    expect(item).toMatchObject({
      sellIn: 0,
      quality: 1
    });
  });

  it('aged brie quality should increase twice as fast when sell date has passes', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', -1, 0)]);
    const [item] = gildedRose.updateQuality();
    expect(item).toMatchObject({
      sellIn: -2,
      quality: 2
    });
  });

  it('item quality should never be more than 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', -1, 49), new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)]);
    const [brie, passes] = gildedRose.updateQuality();
    expect(brie).toMatchObject({
      sellIn: -2,
      quality: 50
    });
    expect(passes).toMatchObject({
      sellIn: 4,
      quality: 50
    });
  });

  it('Sulfuras quality and sellIn should not change', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', -1, 50)]);
    const [item] = gildedRose.updateQuality();
    expect(item).toMatchObject({
      sellIn: -1,
      quality: 50
    });
  });

  it('Backstage passes quality should increase', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 10)]);
    const [item] = gildedRose.updateQuality();
    expect(item).toMatchObject({
      sellIn: 14,
      quality: 11
    });
  });

  it('Backstage passes quality should increase by 2 when there are 10 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
    const [item] = gildedRose.updateQuality();
    expect(item).toMatchObject({
      sellIn: 9,
      quality: 12
    });
  });

  it('Backstage passes quality should increase by 3 when there are 5 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
    const [item] = gildedRose.updateQuality();
    expect(item).toMatchObject({
      sellIn: 4,
      quality: 13
    });
  });

  it('Backstage passes quality should drop to 0 when sell date has passed', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
    const [item] = gildedRose.updateQuality();
    expect(item).toMatchObject({
      sellIn: -1,
      quality: 0
    });
  });

  it('conjured items quality should decrease twice as fast a normal items', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 1, 10), new Item('Conjured Mana Cake', 0, 10)]);
    const [conjured1, conjured2] = gildedRose.updateQuality();
    expect(conjured1).toMatchObject({
      sellIn: 0,
      quality: 8
    });
    expect(conjured2).toMatchObject({
      sellIn: -1,
      quality: 6
    });
  });

});

import { GildedRose, Item } from "@/gilded-rose";
import { describe, expect, test } from "vitest";

const items = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 35),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 40),
];

describe("Gilded Rose", () => {
  test("Golden test", () => {
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(gildedRose.items).toEqual([
      {
        name: "+5 Dexterity Vest",
        quality: 19,
        sellIn: 9,
      },
      {
        name: "Aged Brie",
        quality: 1,
        sellIn: 1,
      },
      {
        name: "Elixir of the Mongoose",
        quality: 6,
        sellIn: 4,
      },
      {
        name: "Sulfuras, Hand of Ragnaros",
        quality: 80,
        sellIn: 0,
      },
      {
        name: "Sulfuras, Hand of Ragnaros",
        quality: 80,
        sellIn: -1,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 21,
        sellIn: 14,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 37,
        sellIn: 9,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 43,
        sellIn: 4,
      },
    ]);
  });

  test("Golden test many days", () => {
    const gildedRose = new GildedRose(items);

    for (let i = 0; i < 100; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items).toEqual([
      {
        name: "+5 Dexterity Vest",
        quality: 0,
        sellIn: -91,
      },
      {
        name: "Aged Brie",
        quality: 50,
        sellIn: -99,
      },
      {
        name: "Elixir of the Mongoose",
        quality: 0,
        sellIn: -96,
      },
      {
        name: "Sulfuras, Hand of Ragnaros",
        quality: 80,
        sellIn: 0,
      },
      {
        name: "Sulfuras, Hand of Ragnaros",
        quality: 80,
        sellIn: -1,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 0,
        sellIn: -86,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 0,
        sellIn: -91,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 0,
        sellIn: -96,
      },
    ]);
  });

  test("Backstage passes sellIn boundary - exactly 11 days", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10),
    ]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(12);
    expect(gildedRose.items[0].sellIn).toBe(10);
  });

  test("Backstage passes sellIn boundary - exactly 6 days", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10),
    ]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(13);
    expect(gildedRose.items[0].sellIn).toBe(5);
  });

  test("sellIn boundary - exactly 0 days", () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 0, 10)]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(8);
    expect(gildedRose.items[0].sellIn).toBe(-1);
  });

  test("Backstage passes - différence entre sellIn 11 et 12", () => {
    const items11 = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 10),
    ]);
    const items12 = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10),
    ]);

    items11.updateQuality();
    items12.updateQuality();

    expect(items11.items[0].quality).toBe(11);
    expect(items12.items[0].quality).toBe(12);
  });

  test("Backstage passes - différence entre sellIn 6 et 7", () => {
    const items6 = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 7, 10),
    ]);
    const items7 = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10),
    ]);

    items6.updateQuality();
    items7.updateQuality();

    expect(items6.items[0].quality).toBe(12);
    expect(items7.items[0].quality).toBe(13);
  });

  test("Item expiration - différence entre sellIn 0 et 1", () => {
    const item0 = new GildedRose([new Item("+5 Dexterity Vest", 1, 10)]);
    const item1 = new GildedRose([new Item("+5 Dexterity Vest", 0, 10)]);

    item0.updateQuality();
    item1.updateQuality();

    expect(item0.items[0].quality).toBe(9);
    expect(item1.items[0].quality).toBe(8);
  });
});

export class Item {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {}

  public isExpired() {
    return this.sellIn < 0;
  }

  public increaseQuality(amount = 1) {
    this.quality = Math.min(50, this.quality + amount);
  }

  public decreaseQuality(amount = 1) {
    this.quality = Math.max(0, this.quality - amount);
  }

  public reduceSellIn() {
    this.sellIn--;
  }
}

export class GildedRose {
  constructor(public items: Item[] = []) {}

  updateQuality() {
    this.items.forEach((item) => {
      if (item.name === "Sulfuras, Hand of Ragnaros") return;

      item.reduceSellIn();

      if (item.name == "Aged Brie") this.updateAgeBrie(item);
      else if (item.name == "Backstage passes to a TAFKAL80ETC concert")
        this.updateBackstage(item);
      else this.updateOtherItem(item);
    });
  }

  private updateOtherItem(item: Item) {
    item.decreaseQuality(item.isExpired() ? 2 : 1);
  }

  private updateAgeBrie(item: Item) {
    item.increaseQuality(item.isExpired() ? 2 : 1);
  }

  private updateBackstage(item: Item) {
    if (item.isExpired()) {
      item.quality = 0;
      return;
    }

    item.increaseQuality();
    if (item.sellIn < 11) {
      item.increaseQuality();
    }
    if (item.sellIn < 6) {
      item.increaseQuality();
    }
  }
}

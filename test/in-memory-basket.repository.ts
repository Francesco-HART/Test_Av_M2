import { Basket, BasketRepository } from "@/basket.repository";

export class InMemoryBasketRepository implements BasketRepository {
  public baskets: Basket[] = [];
  async save(basket: Basket): Promise<void> {
    this.baskets.push(basket);
  }
  remove(id: string): Promise<void> {
    this.baskets = this.baskets.filter((basket) => basket.id !== id);
    return Promise.resolve();
  }
}

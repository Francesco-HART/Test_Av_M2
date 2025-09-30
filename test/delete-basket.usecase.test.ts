import { beforeEach, describe, expect, it } from "vitest";
import { productBuilder } from "./product.builder";
import { InMemoryBasketRepository } from "./in-memory-basket.repository";
import { Basket } from "api/infra/basket.repository";
import { RemoveBasketUsecase } from "@/remove-basket.usecase";

describe("Feature remove basket", () => {
  let removeBasketUsecase: RemoveBasketUsecase;
  let basketRepository: InMemoryBasketRepository;
  beforeEach(() => {
    basketRepository = new InMemoryBasketRepository();
    removeBasketUsecase = new RemoveBasketUsecase(basketRepository);
  });

  describe("Remove saved basket", () => {
    it("I have one product to remove", async () => {
      givenBasketExists([
        {
          id: "1",
          products: [new productBuilder().withQuantity(1).withPrice(1).build()],
          totalPrice: 1,
        },
      ]);

      await removeBasketUsecase.handle(basketRepository.baskets[0].id);

      thenBasketIsSavedWithId([]);
    });
  });

  function givenBasketExists(baskets: Basket[]) {
    basketRepository.baskets = baskets;
  }

  function thenBasketIsSavedWithId(basket: Basket[]) {
    expect(basketRepository.baskets).toEqual(basket);
  }
});

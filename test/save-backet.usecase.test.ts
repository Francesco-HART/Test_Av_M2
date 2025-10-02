import { CalculPriceUsecase } from "../app/calcul-price.usecase";
import { beforeEach, describe, expect, it } from "vitest";
import { productBuilder } from "./product.builder";
import { StubReductionCodeGateway } from "./stub-reduction-code.gateway";
import { SaveBasketUsecase } from "../app/save-basket.usecase";
import { InMemoryBasketRepository } from "./in-memory-basket.repository";
import { StubIDGenerator } from "./stub-id-generator.provider";
import { Basket } from "../app/basket.repository";
import { StubClock } from "./calcul-basket.usecase.test";

describe("Feature save basket", () => {
  let saveBasketUsecase: SaveBasketUsecase;
  let reductionsGateway: StubReductionCodeGateway;
  let idGenerator: StubIDGenerator;
  let clock: StubClock;
  let basketRepository: InMemoryBasketRepository;
  beforeEach(() => {
    reductionsGateway = new StubReductionCodeGateway();
    idGenerator = new StubIDGenerator();
    clock = new StubClock(new Date());
    basketRepository = new InMemoryBasketRepository();
    saveBasketUsecase = new SaveBasketUsecase(
      basketRepository,
      new CalculPriceUsecase(reductionsGateway, clock),
      idGenerator
    );
  });

  describe("Calcul save basket", () => {
    it("I have one product to save", async () => {
      givenIdIs("1");

      const expectPrice = await saveBasketUsecase.handle(
        [new productBuilder().withQuantity(1).withPrice(1).build()],
        ""
      );

      thenBasketIsSavedWithId([
        {
          id: "1",
          products: [new productBuilder().withQuantity(1).withPrice(1).build()],
          totalPrice: 1,
        },
      ]);
    });
  });

  function givenIdIs(id: string) {
    idGenerator.id = id;
  }

  function thenBasketIsSavedWithId(basket: Basket[]) {
    expect(basketRepository.baskets).toEqual(basket);
  }
});

import { CalculPriceUsecase } from "../app/calcul-price.usecase";
import { beforeEach, describe, expect, it } from "vitest";
import { productBuilder } from "./product.builder";
import { StubReductionCodeGateway } from "./stub-reduction-code.gateway";
import { SaveBasketUsecase } from "../app/save-basket.usecase";
import { FakeBasketRepository } from "./fake-basket.repository";
import { StubIDGenerator } from "./stub-id-generator.provider";
import { Basket } from "../app/basket.repository";
import { StubClock } from "./calcul-basket.usecase.test";

export interface EmailNotifier {
  send(email: { to: string; name: "BASKET_SAVED"; message: string });
}

export class SpyEmailNotifier implements EmailNotifier {
  public lastEmail:
    | { to: string; name: "BASKET_SAVED"; message: string }
    | undefined;

  send(email: { to: string; name: "BASKET_SAVED"; message: string }) {
    this.lastEmail = email;
  }
}

describe("Feature save basket", () => {
  let saveBasketUsecase: SaveBasketUsecase;
  let reductionsGateway: StubReductionCodeGateway;
  let idGenerator: StubIDGenerator;
  let clock: StubClock;
  let basketRepository: FakeBasketRepository;
  let spyEmailNotify = new SpyEmailNotifier();

  beforeEach(() => {
    reductionsGateway = new StubReductionCodeGateway();
    idGenerator = new StubIDGenerator();
    clock = new StubClock(new Date());
    basketRepository = new FakeBasketRepository();
    saveBasketUsecase = new SaveBasketUsecase(
      basketRepository,
      new CalculPriceUsecase(reductionsGateway, clock),
      idGenerator,
      spyEmailNotify
    );
  });

  describe("Calcul save basket", () => {
    it("I have one product to save", async () => {
      givenIdIs("1");

      const userEmail = "bob@bob.fr";
      const products = [
        new productBuilder().withQuantity(1).withPrice(1).build(),
      ];

      await saveBasketUsecase.handle(userEmail, products);

      thenBasketIsSavedWithId([
        {
          id: "1",
          userEmail: "bob@bob.fr",
          products: products,
          totalPrice: 1,
        },
      ]);
    });

    it("Recovery email", async () => {
      const userEmail = "bob@bob.fr";
      const products = [
        new productBuilder().withQuantity(1).withPrice(1).build(),
      ];

      await saveBasketUsecase.handle(userEmail, products);

      thenEventShouldBe({
        name: "BASKET_SAVED",
        to: userEmail,
        message: "Profitez de 10% de réduction avec le code DISCOUNT10",
      });
    });
  });

  function givenIdIs(id: string) {
    idGenerator.id = id;
  }

  function thenBasketIsSavedWithId(basket: Basket[]) {
    expect(basketRepository.baskets).toEqual(basket);
  }

  function thenEventShouldBe({
    message,
    to,
    name,
  }: {
    message: string;
    to: string;
    name: "BASKET_SAVED";
  }) {
    expect(spyEmailNotify.lastEmail).toEqual({
      name: name,
      to,
      message,
    });
  }
});

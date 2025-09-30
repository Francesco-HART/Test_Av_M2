import { Basket, BasketRepository } from "../api/infra/basket.repository";
import { CalculPriceUsecase } from "./calcul-price.usecase";
import { ProductsType } from "./reduction.gateway";
import { IDGenerator } from "./id-generator.provider";

export class SaveBasketUsecase {
  constructor(
    private readonly basketRepository: BasketRepository,
    private readonly calculPriceUsecase: CalculPriceUsecase,
    private readonly idGenerator: IDGenerator
  ) {}
  async handle(
    products: {
      name: string;
      quantity: number;
      type: ProductsType;
      price: number;
    }[],
    reductionCode: string
  ): Promise<void> {
    const totalPrice = await this.calculPriceUsecase.handle(
      products,
      reductionCode
    );
    const basket: Basket = {
      id: this.idGenerator.generate(),
      products,
      totalPrice,
    };
    await this.basketRepository.save(basket);
  }
}

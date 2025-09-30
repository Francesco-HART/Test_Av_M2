import { BasketRepository } from "api/infra/basket.repository";

export class RemoveBasketUsecase {
  constructor(private basketRepository: BasketRepository) {}

  async handle(id: string): Promise<void> {
    await this.basketRepository.remove(id);
  }
}

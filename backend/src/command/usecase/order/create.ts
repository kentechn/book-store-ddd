import { ORDER_REPOSITORY_INTERFACE } from "../../domain/order/order.repository.interface";
import type { OrderRepositoryInterface } from "../../domain/order/order.repository.interface";
import { Order } from "../../domain/order/order";
import { DuplicateRepositoryError } from "../../infra/errors/common.repository.error";
import { DuplicateUsecaseError } from "../errors/common.usecase.error";
import { Inject } from "@nestjs/common";

export type CreateOrderUsecaseCommand = {
  userId: string;
  bookId: string;
  quantity: number;
};

export class CreateOrderUsecase {
  constructor(
    @Inject(ORDER_REPOSITORY_INTERFACE)
    private readonly orderRepository: OrderRepositoryInterface
  ) {}

  async execute(command: CreateOrderUsecaseCommand): Promise<void> {
    try {
      // TODO:本とユーザーの存在チェックをする
      const order = Order.create(command);
      await this.orderRepository.create(order);
    } catch (error) {
      if (error instanceof DuplicateRepositoryError) {
        throw new DuplicateUsecaseError(error.message);
      }
      throw error;
    }
  }
}

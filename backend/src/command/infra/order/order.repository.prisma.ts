import { PrismaClient, Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { OrderRepositoryInterface } from "../../domain/order/order.repository.interface";
import { Order } from "../../domain/order/order";
import { DuplicateRepositoryError } from "../errors/common.repository.error";

@Injectable()
export class OrderRepository implements OrderRepositoryInterface {
  constructor(private readonly prisma: PrismaClient) {}

  async create(order: Order): Promise<void> {
    try {
      await this.prisma.order.create({
        data: {
          id: order.id,
          userId: order.userId,
          bookId: order.bookId,
          quantity: order.quantity,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      )
        throw new DuplicateRepositoryError(
          `ユニークキー制約違反: order.id=${order.id}`
        );
      throw error;
    }
  }
}

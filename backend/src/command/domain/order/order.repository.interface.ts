import { Order } from "./order";

export const ORDER_REPOSITORY_INTERFACE = Symbol("OrderRepositoryInterface");
export interface OrderRepositoryInterface {
  create(order: Order): Promise<void>;
}

import { ulid } from "ulid";


type OrderCommand = {
  userId: string;
  bookId: string;
  quantity: number;
};

export class Order {
  private readonly _id: string;
  private readonly _userId: string;
  private readonly _bookId: string;
  private readonly _quantity: number;

  
  private constructor({
    id,
    userId,
    bookId,
    quantity,
  }: OrderCommand & { id: string }) {
    this._id = id;
    this._userId = userId;
    this._bookId = bookId;
    this._quantity = quantity;
  }

  static create({
    userId,
    bookId,
    quantity,
  }: OrderCommand): Order {
    return new Order({
      id: ulid(),
      userId,
      bookId,
      quantity,
    });
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get bookId(): string {
    return this._bookId;
  }

  get quantity(): number {
    return this._quantity;
  }



}

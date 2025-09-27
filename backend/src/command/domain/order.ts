export class Order {
  private readonly _id: string;
  private readonly _userId: string;
  private readonly _bookId: string;
  private readonly _quantity: number;
  private readonly _createdAt: Date;

  constructor({
    id,
    userId,
    bookId,
    quantity,
    createdAt,
  }: {
    id: string;
    userId: string;
    bookId: string;
    quantity: number;
    createdAt: Date;
  }) {
    this._id = id;
    this._userId = userId;
    this._bookId = bookId;
    this._quantity = quantity;
    this._createdAt = createdAt;
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

  get createdAt(): Date {
    return this._createdAt;
  }
}

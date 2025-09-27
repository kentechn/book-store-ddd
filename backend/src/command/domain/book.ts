import { InsufficientStockError } from "./errors/insufficient-stock.error";

export class Book {
  private readonly _id: string;
  private readonly _stock: number;
  private readonly _price: number;
  private readonly _isPaperback: boolean;
  private readonly _userId: string;
  private readonly _saleDate: Date;
  private readonly _name: string;

  constructor({
    id,
    stock,
    price,
    isPaperback,
    userId,
    saleDate,
    name,
  }: {
    id: string;
    stock: number;
    price: number;
    isPaperback: boolean;
    userId: string;
    saleDate: Date;
    name: string;
  }) {
    this._id = id;
    this._stock = stock;
    this._price = price;
    this._isPaperback = isPaperback;
    this._userId = userId;
    this._saleDate = saleDate;
    this._name = name;
  }

  get id(): string {
    return this._id;
  }

  get stock(): number {
    return this._stock;
  }

  get price(): number {
    return this._price;
  }

  get isPaperback(): boolean {
    return this._isPaperback;
  }

  get userId(): string {
    return this._userId;
  }

  get saleDate(): Date {
    return this._saleDate;
  }

  get name(): string {
    return this._name;
  }

  decreaseStock(quantity: number): Book {
    if (this._stock - quantity < 0) {
      throw new InsufficientStockError();
    }
    return new Book({
      id: this._id,
      stock: this._stock - quantity,
      price: this._price,
      isPaperback: this._isPaperback,
      userId: this._userId,
      saleDate: this._saleDate,
      name: this._name,
    });
  }
}

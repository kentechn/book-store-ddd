import { ulid } from "ulid";
import { InsufficientStockError } from "./errors/insufficient-stock.error";

export class Book {
  private readonly _id: string;
  private readonly _stock: number;
  private readonly _price: number;
  private readonly _isPaperbook: boolean;
  private readonly _name: string;
  private readonly _publishAt: Date;
  private readonly _isSaled: boolean;

  constructor({
    id,
    stock,
    price,
    isPaperbook,
    publishAt,
    name,
    isSaled,
  }: {
    id: string;
    stock: number;
    price: number;
    isPaperbook: boolean;
    publishAt: Date;
    name: string;
    isSaled: boolean;
  }) {
    this._id = id;
    this._stock = stock;
    this._price = price;
    this._isPaperbook = isPaperbook;
    this._publishAt = publishAt;
    this._name = name;
    this._isSaled = isSaled;
  }

  static create({
    stock,
    price,
    isPaperbook,
    publishAt,
    name,
    isSaled,
  }: {
    stock: number;
    price: number;
    isPaperbook: boolean;
    publishAt: Date;
    name: string;
    isSaled: boolean;
  }): Book {
    return new Book({
      id: ulid(),
      stock,
      price,
      isPaperbook,
      publishAt,
      name,
      isSaled,
    });
  }

  static recreate({
    id,
    stock,
    price,
    isPaperbook,
    publishAt,
    name,
    isSaled,
  }: {
    id: string;
    stock: number;
    price: number;
    isPaperbook: boolean;
    publishAt: Date;
    name: string;
    isSaled: boolean;
  }): Book {
    return new Book({
      id,
      stock,
      price,
      isPaperbook,
      publishAt,
      name,
      isSaled,
    });
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

  get isPaperbook(): boolean {
    return this._isPaperbook;
  }

  get publishAt(): Date {
    return this._publishAt;
  }

  get name(): string {
    return this._name;
  }

  get isSaled(): boolean {
    return this._isSaled;
  }

  decreaseStock(quantity: number): Book {
    if (this._stock - quantity < 0) {
      throw new InsufficientStockError();
    }

    // なんでプロパティの値を変更するのではなく、新しいインスタンスを返すのか？
    return new Book({
      id: this._id,
      stock: this._stock - quantity,
      price: this._price,
      isPaperbook: this._isPaperbook,
      publishAt: this._publishAt,
      name: this._name,
      isSaled: this._isSaled,
    });
  }

  isSale(quantity: number, now: Date): boolean {
    // 本が販売停止の場合エラー
    if (this._isSaled) {
      throw new Error("この本は販売停止されています");
    }

    // // 販売日が未来の場合エラー
    if (this._publishAt > now) {
      throw new Error("この本はまだ販売されていません");
    }

    // 注文数量が在庫数以下の場合エラー
    if (quantity > this._stock) {
      throw new Error("在庫数が不足しています");
    }

    return true;
  }
}

export class InsufficientStockError extends Error {
  constructor(message: string = "在庫が不足しています") {
    super(message);
    this.name = "InsufficientStockError";
  }
}

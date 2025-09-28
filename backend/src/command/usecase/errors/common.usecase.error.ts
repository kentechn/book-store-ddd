export class DuplicateUsecaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateUsecaseError";
  }
}

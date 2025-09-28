export class DuplicateRepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateRepositoryError";
  }
}

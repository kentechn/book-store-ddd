export class DuplicateUsecaseError extends Error {
  public readonly cause?: Error;

  constructor({ message, cause }: { message?: string; cause?: Error }) {
    super(message, { cause });
    this.name = "DuplicateUsecaseError";
    this.cause = cause;
  }
}

import { Book } from "../../types/book";

export const BOOK_DAO_INTERFACE = Symbol("BookDAOInterface");

export interface BookDAOInterface {
  findById({ id }: { id: string }): Promise<Book | undefined>;
  findAll(): Promise<Book[] | undefined>;
}

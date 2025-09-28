import { Inject, Injectable } from "@nestjs/common";
import { Book } from "../../types/book";
import { BOOK_DAO_INTERFACE } from "./book.dao.interface";
import type { BookDAOInterface } from "./book.dao.interface";

@Injectable()
export class GetBooksUsecase {
  constructor(
    @Inject(BOOK_DAO_INTERFACE)
    private readonly bookDAO: BookDAOInterface
  ) {}

  async execute(): Promise<Book[]> {
    try {
      return await this.bookDAO.findAll();
    } catch (error) {
      throw error;
    }
  }
}

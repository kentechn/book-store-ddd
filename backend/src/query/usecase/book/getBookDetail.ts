import { Inject, Injectable } from "@nestjs/common";
import { Book } from "../../types/book";
import { BOOK_DAO_INTERFACE } from "./book.dao.interface";
import type { BookDAOInterface } from "./book.dao.interface";

@Injectable()
export class GetBookDetailUsecase {
  constructor(
    @Inject(BOOK_DAO_INTERFACE)
    private readonly bookDAO: BookDAOInterface
  ) {}

  async execute({ id }: { id: string }): Promise<Book | undefined> {
    try {
      return await this.bookDAO.findById({ id });
    } catch (error) {
      throw error;
    }
  }
}

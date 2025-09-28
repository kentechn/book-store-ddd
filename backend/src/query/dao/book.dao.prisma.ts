import { Book, PrismaClient } from "@prisma/client";
import { BookDAOInterface } from "../usecase/book/book.dao.interface";

export class BookDao implements BookDAOInterface {
  constructor(private readonly prisma: PrismaClient) {}

  async findById({ id }: { id: string }): Promise<Book | undefined> {
    try {
      const book = await this.prisma.book.findUnique({
        where: { id },
      });

      if (!book) {
        return undefined;
      }
      return book;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      const books = await this.prisma.book.findMany();
      KeyframeEffect;

      return books;
    } catch (error) {
      throw error;
    }
  }
}

import { Injectable } from "@nestjs/common";
import { BookDAOInterface } from "../usecase/book/book.dao.interface";
import { Book } from "../types/book";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class BookDao implements BookDAOInterface {
  constructor(private readonly prisma: PrismaService) {
    console.log("BookDao constructor called with prisma:", !!prisma);
  }

  async findById({ id }: { id: string }): Promise<Book | undefined> {
    try {
      const book = await this.prisma.book.findUnique({
        where: { id },
      });

      if (!book) {
        return undefined;
      }

      return {
        id: book.id,
        name: book.name,
        price: book.price,
        stock: book.stock,
        isPaperbook: book.isPaperbook,
        publishAt: book.publishAt,
        isSaled: book.isSaled,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      const books = await this.prisma.book.findMany();

      return books.map((book) => ({
        id: book.id,
        name: book.name,
        price: book.price,
        stock: book.stock,
        isPaperbook: book.isPaperbook,
        publishAt: book.publishAt,
        isSaled: book.isSaled,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
      }));
    } catch (error) {
      throw error;
    }
  }
}

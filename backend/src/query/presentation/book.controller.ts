import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
} from "@nestjs/common";
import { Book } from "../types/book";
import { GetBooksUsecase } from "../usecase/book/getBooks";
import { GetBookDetailUsecase } from "../usecase/book/getBookDetail";
import { isValid } from "ulid";

@Controller("books")
export class BookController {
  constructor(
    private readonly GetBooksUsecase: GetBooksUsecase,
    private readonly GetBookDetailUsecase: GetBookDetailUsecase
  ) {}

  @Get()
  async getBooks(
    @Param("limit") limit: number,
    @Param("offset") offset: number
  ): Promise<{ books: Book[]; limit: number; offset: number; total: number }> {
    try {
      const books = await this.GetBooksUsecase.execute();
      return { books, limit: 10, offset: 0, total: books.length };
    } catch (error) {
      throw error;
    }
  }

  @Get(":id")
  async getBookDetail(@Param("id") id: string): Promise<Book | undefined> {
    try {
      if (isValid(id)) {
        throw new BadRequestException("リクエストが不正です");
      }

      const book = await this.GetBookDetailUsecase.execute({ id });
      if (!book) {
        throw new NotFoundException("書籍が見つかりません");
      }

      return book;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: "リクエストが不正です",
            error: "Bad Request",
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          }
        );
      }
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: "無効なULID形式です",
            error: "Bad Request",
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          }
        );
      }
      throw error;
    }
  }
}

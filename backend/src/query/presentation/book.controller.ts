import { Controller, Get, Param } from "@nestjs/common";
import { Book } from "../types/book";
import { GetBooksUsecase } from "../usecase/book/getBooks";
import { GetBookDetailUsecase } from "../usecase/book/getBookDetail";

@Controller("books")
export class BookController {
  constructor(
    private readonly GetBooksUsecase: GetBooksUsecase,
    private readonly GetBookDetailUsecase: GetBookDetailUsecase
  ) {}

  @Get()
  async getBooks(): Promise<Book[]> {
    try {
      return this.GetBooksUsecase.execute();
    } catch (error) {
      throw error;
    }
  }

  @Get(":id")
  async getBookDetail(@Param("id") id: string): Promise<Book | undefined> {
    try {
      return this.GetBookDetailUsecase.execute({ id });
    } catch (error) {
      throw error;
    }
  }
}

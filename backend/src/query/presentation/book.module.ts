import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { BookDao } from "../dao/book.dao.prisma";
import { BOOK_DAO_INTERFACE } from "../usecase/book/book.dao.interface";
import { GetBookDetailUsecase } from "../usecase/book/getBookDetail";
import { GetBooksUsecase } from "../usecase/book/getBooks";
import { BookController } from "./book.controller";
import { PrismaModule } from "../../prisma.module";

@Module({
  controllers: [BookController],
  imports: [PrismaModule],
  providers: [
    GetBooksUsecase,
    GetBookDetailUsecase,
    {
      provide: BOOK_DAO_INTERFACE,
      useClass: BookDao,
    },
    PrismaClient,
  ],
})
export class BookModule {}

import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    let prismaClientOption: Prisma.PrismaClientOptions = {};
    if (
      process.env.NODE_ENV === "development" &&
      process.env.ENABLE_SQL_LOG === "true"
    ) {
      // 開発環境では様々なログを出力する
      prismaClientOption = { log: ["query", "info", "warn", "error"] };
    } else if (process.env.NODE_ENV === "production") {
      // 本番環境ではエラーログのみ出力する
      prismaClientOption = { log: ["error"] };
    }
    super(prismaClientOption);
    this.logger.log("-----PrismaService instance created-----");
  }

  async onModuleInit() {
    this.$on("query", (event) => {
      this.logger.log(
        `Query: ${event.query}` +
          `Params: ${event.params}` +
          `Duration: ${event.duration} ms`
      );
    });
    this.$on("error", (event) => {
      //TODO 必要に応じてSlack通知などを行う
      this.logger.log(`error: ${event.message}`);
    });
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

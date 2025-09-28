import { Module } from "@nestjs/common";

import { PrismaClient } from "@prisma/client";

@Module({
  exports: [PrismaClient],
  providers: [PrismaClient],
})
export class PrismaModule {}

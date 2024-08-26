import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import {PrismaAccountRepository  } from "./prisma/repositories/prisma-account-reppository";
import { PrismaImageRepository } from "./prisma/repositories/prisma-image-repository";
import { AccountRepository } from "@/domain/application/repositories/account-repository";
import { ImageRepository } from "@/domain/application/repositories/image-repository";


@Module({
  providers: [
    PrismaService,
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository
    },
    {
      provide: ImageRepository,
      useClass: PrismaImageRepository
    },
    PrismaImageRepository,
    
  ],
  exports: [
    AccountRepository,
    PrismaService,
    PrismaImageRepository,
    ImageRepository
  ],
})

export class DatabaseModule {}
import { Injectable } from "@nestjs/common";
import { AccountRepository } from "../../../../domain/application/repositories/account-repository";
import { Account } from "../../../../domain/enterprise/entities/account";
import { PrismaService } from "../prisma.service";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";


@Injectable()
export class PrismaAccountRepository  implements AccountRepository {
  constructor(private prisma: PrismaService) {}
  async create(user: Account): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)
    await this.prisma.user.create({
      data
    }) 
  }
  async findByEmail(email: string): Promise<Account | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) return null
   return PrismaUserMapper.toDomain(user)

  }
  async findById(id: string): Promise<Account | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) return null
   return PrismaUserMapper.toDomain(user)
  }
}
  

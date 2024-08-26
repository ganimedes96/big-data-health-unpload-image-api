import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Account } from '@/domain/enterprise/entities/account';
import {Prisma, User as PrismaUser} from '@prisma/client'

export class PrismaUserMapper {
  static toDomain(row: PrismaUser):Account {
    return Account.create({
      name: row.name,
      email: row.email,
      password: row.password,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    }, new UniqueEntityID(row.id))
  }

  static toPrisma(user: Account): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }
}
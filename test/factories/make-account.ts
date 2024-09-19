import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Account, IAccountProps } from '@/domain/enterprise/entities/account';
import { PrismaUserMapper } from '@/infra/database/prisma/mappers/prisma-user-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common';



export function makeAccount(override: Partial<IAccountProps> = {}, id?: UniqueEntityID) {
  const account = Account.create({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    ...override
  }, id)
  return account
}

@Injectable()
export class AccountFactory {
  constructor (private prisma: PrismaService) {}
  async makePrismaAccount(data: Partial<IAccountProps> = {}): Promise<Account> {
    const account = makeAccount(data)
    await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(account)
    })
    return account
  }
}
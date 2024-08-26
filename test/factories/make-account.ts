import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Account, IAccountProps } from '@/domain/enterprise/entities/account';
import { faker } from '@faker-js/faker'



export function makeAccount(override: Partial<IAccountProps> = {}, id?: UniqueEntityID) {
  const account = Account.create({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    ...override
  }, id)
  return account
}
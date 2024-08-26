import { AccountRepository } from "@/domain/application/repositories/account-repository"
import { Account } from "@/domain/enterprise/entities/account"



export class InMemoryAccountRepository implements AccountRepository {
  public items: Account[] = []

  async findByEmail(email: string) {
    const account = this.items.find((item) => item.email === email)

    if (!account) {
      return null
    }

    return account
  }

  async create(student: Account) {
    this.items.push(student)
  }


  async findById  (id: string) {
    const account = this.items.find((item) => item.id.toString() === id)

    if (!account) {
      return null
    }

    return account
  }
}
import { Account } from "../../enterprise/entities/account";

export abstract class AccountRepository {
  abstract create(user: Account): Promise<void>
  abstract findByEmail(email: string): Promise<Account | null>
  abstract findById(id: string): Promise<Account | null> 
}
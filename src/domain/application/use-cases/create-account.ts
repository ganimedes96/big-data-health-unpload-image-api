import { Either, left, right } from "@/core/either"
import { UserAlreadyExistsError } from "@/core/erro/errors/user-already-exists-error"
import { AccountRepository } from "../repositories/account-repository"
import { Account } from "@/domain/enterprise/entities/account"
import { Injectable } from "@nestjs/common"
import { HashGenerator } from "../cryptography/hash-generator"

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = Either<UserAlreadyExistsError , {}>

@Injectable()
export class  CreateAccountUseCase {
  constructor(
      private  accountRepository: AccountRepository,
      private hashGenerator: HashGenerator,
    ) {}

  async execute({email, name, password}: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const accountWithSameEmail = await this.accountRepository.findByEmail(email)

    if(accountWithSameEmail) {
      return left(new UserAlreadyExistsError(accountWithSameEmail.email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)
    
    const account = Account.create({
      name,
      email,
      password: hashedPassword
    })
    await this.accountRepository.create(account)
    return right({})
  }
}

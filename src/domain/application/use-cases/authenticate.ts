import { Either, left, right } from "@/core/either"
import { AccountRepository } from "../repositories/account-repository"
import { Injectable } from "@nestjs/common"
import { HashComparer } from "../cryptography/hash-comparer"
import { Encrypter } from "../cryptography/encrypter"
import { WrongCredentialsError } from "@/core/erro/errors/wrong-credentials-error"

interface AuthenticaUseCaseRequest {
  email: string
  password: string
}

type CreateUserUseCaseResponse = Either<WrongCredentialsError, 
{
  accessToken: string
}>

@Injectable()
export class  AuthenticateUseCase {
  constructor(
      private  accountRepository: AccountRepository,
      private hashComparer: HashComparer,
      private encrypter: Encrypter,

    ) {}

  async execute({email, password}: AuthenticaUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const account = await this.accountRepository.findByEmail(email)
    if (!account) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(password, account.password)
    if (!isPasswordValid){
      return left(new WrongCredentialsError())
    }  

    const accessToken = await this.encrypter.encrypt({sub: account.id.toString()})
    return right({accessToken})
  }
}

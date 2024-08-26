import { Either, left, right } from "@/core/either"
import { AccountRepository } from "../repositories/account-repository"
import { Injectable } from "@nestjs/common"
import { ResourceNotFoundError } from "@/core/erro/errors/resource-not-found-error"
import { Image } from "@/domain/enterprise/entities/image"
import { ImageRepository } from "../repositories/image-repository"

interface GetImagesByIdUseCaseRequest {
  accountId: string
}

type GetImagesByIdUseCaseResponse = Either<ResourceNotFoundError , 
{
  images: Image[]
}>

@Injectable()
export class  GetImagesByIdUseCase {
  constructor(
      private  accountRepository: AccountRepository,
      private imageRepository: ImageRepository,

    ) {}

  async execute({ accountId}: GetImagesByIdUseCaseRequest): Promise<GetImagesByIdUseCaseResponse> {
    const account = await this.accountRepository.findById(accountId)

    if(!account) {
      return left(new ResourceNotFoundError())
    }

    const images = await this.imageRepository.findManyByUserId(accountId)

    return right({images})
    
  }
}

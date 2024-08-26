import { Either, left, right } from "@/core/either"
import { AccountRepository } from "../repositories/account-repository"
import { Injectable } from "@nestjs/common"
import { ResourceNotFoundError } from "@/core/erro/errors/resource-not-found-error"
import { Image } from "@/domain/enterprise/entities/image"
import { ImageRepository } from "../repositories/image-repository"

interface SaveImageUseCaseRequest {
  url: string
  accountId: string
  publicId: string
  assetId: string
  displayName: string
}

type SaveImageUseCaseResponse = Either<ResourceNotFoundError , {}>

@Injectable()
export class  SaveImageUseCase {
  constructor(
      private  accountRepository: AccountRepository,
      private imageRepository: ImageRepository,

    ) {}

  async execute({ accountId, url, publicId, assetId, displayName}: SaveImageUseCaseRequest): Promise<SaveImageUseCaseResponse> {
    const account = await this.accountRepository.findById(accountId)

    if(!account) {
      return left(new ResourceNotFoundError())
    }

    const images =  Image.create({
      url,
      publicId,
      userId: accountId,
      assetId,
      displayName

    })

    await this.imageRepository.save(images)

    return right({})
    
  }
}

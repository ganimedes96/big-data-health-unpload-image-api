import { Either, left, right } from "@/core/either"
import { AccountRepository } from "../repositories/account-repository"
import { Injectable } from "@nestjs/common"
import { ResourceNotFoundError } from "@/core/erro/errors/resource-not-found-error"
import { Image } from "@/domain/enterprise/entities/image"
import { ImageRepository } from "../repositories/image-repository"

interface DeleteImageUseCaseRequest {
  assetId: string
}

type DeleteImageUseCaseResponse = Either<ResourceNotFoundError , 
{
 
}>

@Injectable()
export class  DeleteImageUseCase {
  constructor(
      private imageRepository: ImageRepository,

    ) {}

  async execute({ assetId}: DeleteImageUseCaseRequest): Promise<DeleteImageUseCaseResponse> {
    const image = await this.imageRepository.findImageByAssetId(assetId)
    if (!image) {
      return left(new ResourceNotFoundError('Image not found'))
    }
    await this.imageRepository.delete(image.assetId)

    return right({})
  }
}

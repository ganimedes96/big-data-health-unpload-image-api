import {  BadRequestException, ConflictException, Controller, Get, HttpCode } from "@nestjs/common";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { TokenPayload } from "@/infra/auth/jwt_strategy";
import { GetImagesByIdUseCase } from "@/domain/application/use-cases/get-images-by-id";
import { ResourceNotFoundError } from "@/core/erro/errors/resource-not-found-error";
import { ImagePresenter } from "../presenters/image-presenter";

@Controller('/images')
export class GetImagesController {
  
  constructor(
    private getImageByIdUsecase: GetImagesByIdUseCase,
  ){}
  @Get()
  @HttpCode(200)
  async handle( @CurrentUser() user: TokenPayload) {

    const result = await this.getImageByIdUsecase.execute({
      accountId: user.sub
    })
    
    if(result.isLeft()) {
      const error = result.value
      switch(error.constructor) {
        case ResourceNotFoundError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
    const images = result.value.images
    return {images: images.map(ImagePresenter.toHTTP)}
  }
   
}
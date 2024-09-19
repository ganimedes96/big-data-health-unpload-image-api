import { BadRequestException, ConflictException, Controller, FileTypeValidator, HttpCode, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { TokenPayload } from "@/infra/auth/jwt_strategy";
import { CloudinaryService } from "@/infra/cloudinary/cloudinary.service";
import { SaveImageUseCase } from "@/domain/application/use-cases/save-image";
import { ResourceNotFoundError } from "@/core/erro/errors/resource-not-found-error";


@Controller('/images')
export class ImageUnploadController {

  constructor(
    private saveImageUsecase: SaveImageUseCase,
    private readonly cloudinary: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  async uploadImage(
    @CurrentUser() user: TokenPayload,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2, // 2MB
            }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),  
          ],
      }),
    ) file: Express.Multer.File
  ) {
    const result = await this.cloudinary.uploadImage(file);
    
    const rsult = await this.saveImageUsecase.execute({
      url: result.url,
      publicId: result.public_id,
      accountId: user.sub,
      assetId: result.asset_id,
      displayName: result.display_name
    })

    if(rsult.isLeft()) {
      const error = rsult.value
      switch(error.constructor) {
        case ResourceNotFoundError:
          throw new BadRequestException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
    
  }
}
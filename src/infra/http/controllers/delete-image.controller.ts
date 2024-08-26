import { BadRequestException, ConflictException, Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { CloudinaryService } from "@/infra/cloudinary/cloudinary.service";
import { DeleteImageUseCase } from "@/domain/application/use-cases/delete-image";
import { ResourceNotFoundError } from "@/core/erro/errors/resource-not-found-error";
import { PrismaService } from "@/infra/database/prisma/prisma.service";


@Controller('/images')
export class DeleteImageController {
  constructor(
    private deleteImageUsecase: DeleteImageUseCase,
    private readonly cloudinary: CloudinaryService,
    private readonly prisma: PrismaService
    
  ) {}

  @Delete('/delete/:assetId')
  @HttpCode(204)
  async deleteImage(
    @Param('assetId') assetId: string
  ) {
    
    
    try {
      await this.prisma.$transaction(async (prisma) => {
        await this.cloudinary.deleteImageByAssetId(assetId)
        const result = await this.deleteImageUsecase.execute({
          assetId,
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
        
      })
     
    } catch (error) {
      throw new Error("Failed to delete image.");
    }
    

  
  }
}
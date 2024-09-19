import { BadRequestException, ConflictException, Controller, Delete, HttpCode, Param, InternalServerErrorException } from "@nestjs/common";
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
      // Obtém o publicId da imagem no Cloudinary
      const cloudinaryResult = await this.cloudinary.getPublicIdByAssetId(assetId);
      
      if (!cloudinaryResult) {
        // Tenta deletar a imagem no banco de dados
        console.log('ENTROU');
        const deleteResult = await this.deleteImageUsecase.execute({ assetId });
          
        if (deleteResult.isLeft()) {
          const error = deleteResult.value;
          switch (error.constructor) {
            case ResourceNotFoundError:
              throw new BadRequestException('Image not found in database.');
            default:
              throw new BadRequestException(error.message);
          }
        }
        
        // Se imagem não está no Cloudinary mas foi deletada do banco
        if (deleteResult.isRight()) {
          return{message: ''}
        }
      }

      // Inicia uma transação no Prisma
      await this.prisma.$transaction(async () => {
        // Primeiro, tenta deletar a imagem no Cloudinary
        try {
          await this.cloudinary.deleteImageByAssetId(assetId);
        } catch (cloudinaryError) {
          throw new InternalServerErrorException('Falha ao deletar a imagem no Cloudinary');
        }

        // Se a deleção no Cloudinary for bem-sucedida, tenta deletar no banco de dados
        const deleteResult = await this.deleteImageUsecase.execute({ assetId });
        if (deleteResult.isLeft()) {
          const error = deleteResult.value;
          switch (error.constructor) {
            case ResourceNotFoundError:
              throw new ResourceNotFoundError('Imagem não encontrada no banco de dados.');
            default:
              throw new BadRequestException(error.message);
          }
        }
      });

    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        // Retorna erro 404 quando a imagem não for encontrada
        throw new ResourceNotFoundError(error.message);
      } else if (error instanceof ResourceNotFoundError || error instanceof BadRequestException) {
        throw error;
      }
      // Para outros erros, retorne um erro de servidor
      throw new InternalServerErrorException("Falha ao deletar a imagem.");
    }
  }
}

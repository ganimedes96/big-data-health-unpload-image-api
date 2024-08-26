import { ImageRepository } from "../../../../domain/application/repositories/image-repository";
import { Image } from "../../../../domain/enterprise/entities/image";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaImageMapper } from "../mappers/prisma-image-mapper";


@Injectable()
export class PrismaImageRepository implements ImageRepository {
  constructor(private prisma: PrismaService) {}
  async save(image: Image): Promise<void> {
    const data = PrismaImageMapper.toPrisma(image)
    await this.prisma.image.create({
      data,
    })
  }
  async findManyByUserId(userId: string): Promise<Image[]> {
    const images = await this.prisma.image.findMany({
      where: {
        userId
      }
    })
    return images.map(PrismaImageMapper.toDomain)
  }
  async delete(assetId: string): Promise<void> {
     await this.prisma.image.delete({
       where: {
         assertId: assetId
       }
     })

  }

  async findImageByAssetId(assetId: string): Promise<Image | null> {
    const image = await this.prisma.image.findUnique({
      where: {
        assertId: assetId
      }
    })
    if(!image) {
      return null
    }
    return PrismaImageMapper.toDomain(image)
  }
}
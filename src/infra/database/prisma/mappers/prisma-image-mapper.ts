import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Image } from '@/domain/enterprise/entities/image';
import {Image as PrismaImage, Prisma} from '@prisma/client'

export class PrismaImageMapper {
  static toDomain(row: PrismaImage):Image {
    return Image.create({
      publicId: row.publicId,
      url: row.url,
      userId: row.userId,
      assetId: row.assertId,
      displayName: row.displayName,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    }, new UniqueEntityID(row.id))
  }

  static toPrisma(image: Image): Prisma.ImageUncheckedCreateInput {
    return {
      id: image.id.toString(),
      publicId: image.publicId,
      url: image.url,
      userId: image.userId,
      assertId: image.assetId,
      displayName: image.displayName,
      createdAt: image.createdAt,
      updatedAt: image.updatedAt
    }
  }
}
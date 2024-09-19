import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { IImageProps, Image } from "@/domain/enterprise/entities/image";
import { PrismaImageMapper } from "@/infra/database/prisma/mappers/prisma-image-mapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";

export function makeImage(
    override: Partial<IImageProps> = {},
    id?: UniqueEntityID
  ) {
    const image = Image.create({
        url: faker.internet.url(),
        publicId: new UniqueEntityID().toString(),
        userId: new UniqueEntityID().toString(),
        assetId: new UniqueEntityID().toString(),
        displayName: faker.internet.userName(), 
        ...override
    }, id)
    return image
}



@Injectable()
export class ImageFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaImage(data: Partial<IImageProps> = {}): Promise<Image> {
    const image = makeImage(data)
    await this.prisma.image.create({
      data: PrismaImageMapper.toPrisma(image)
    }) 
    return image
  } 
}

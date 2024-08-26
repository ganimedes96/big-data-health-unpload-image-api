import { Image } from "@/domain/enterprise/entities/image";

export class ImagePresenter {
  static toHTTP(image: Image) {
    return {
      id: image.id.toString(),
      url: image.url,
      publicId: image.publicId,
      assetId: image.assetId,
      displayName: image.displayName,
      accountId: image.userId,
      createdAt: image.createdAt,
      updatedAt: image.updatedAt
    }
  }
}
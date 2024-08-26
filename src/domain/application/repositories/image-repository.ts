import { Image } from "../../enterprise/entities/image";



export abstract class ImageRepository {
  abstract save(image: Image): Promise<void>
  abstract findManyByUserId(userId: string): Promise<Image[]>
  abstract findImageByAssetId(publicId: string): Promise<Image | null>
  abstract delete(assetId: string): Promise<void>
}

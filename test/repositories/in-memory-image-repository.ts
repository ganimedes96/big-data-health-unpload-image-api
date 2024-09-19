import { ImageRepository } from "@/domain/application/repositories/image-repository";
import { Image } from "@/domain/enterprise/entities/image";

export class InMemoryImageRepository implements ImageRepository {
  
  public items: Image[] = [];

  async save(image: Image) {
    this.items.push(image);
  }
  async findManyByUserId(userId: string): Promise<Image[]> {
    const images = this.items.filter((item) => item.userId === userId);

    return images;
  }
  async findImageByAssetId(publicId: string): Promise<Image | null> {
    const image = this.items.find((item) => item.publicId === publicId);
    if (!image) {
      return null;
    }
    return image;
  }
 async delete(assetId: string): Promise<void> {
    const index = this.items.findIndex((item) => item.assetId === assetId);
    this.items.splice(index, 1);
  }
}

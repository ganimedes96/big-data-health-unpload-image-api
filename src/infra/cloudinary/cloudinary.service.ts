import { Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { EnvService } from '../env/env.service';


interface CloudinaryError {
  http_code: number;
  message?: string;
}

@Injectable()
export class CloudinaryService {
 
  constructor( private envService: EnvService) {
    cloudinary.config({
      cloud_name: envService.get('CLOUD_NAME'),
      api_key: envService.get('API_KEY'),
      api_secret: envService.get('API_SECRET'),
    });
  }
  // Função que verifica se a imagem existe
  async imageExists(assetId: string): Promise<boolean> {
   
    try {
      const result = await cloudinary.api.resource(assetId);
      return !!result;
    } catch (error: unknown) {
      if (this.isCloudinaryError(error)) {
        if (error.http_code === 404) {
          return false;
        }
      }
      throw error; // Re-throw errors that are not Cloudinary errors
    }
  }
  
  private  isCloudinaryError(error: unknown): error is CloudinaryError {
    return typeof error === 'object' && error !== null && 'http_code' in error;
  }
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: this.envService.get('CLOUDINARY_BUCKET_PATH') },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error("Upload result is undefined"));
          resolve(result);
        },
      ).end(file.buffer);
    });
  }

  private async deleteImage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Delete result is undefined"));
        resolve(result);
      });
    })
  }

  async getPublicIdByAssetId(assetId: string): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
      cloudinary.api.resources(
        { asset_id: assetId, max_results: 1 }, // max_results para garantir que peguemos apenas um resultado
        (error, result) => {
          if (error) return reject(error);
          if (result.resources && result.resources.length > 0) {
            const publicId = result.resources[0].public_id; // Pegue o primeiro public_id
            resolve(publicId);
          } else {
            resolve(null);
          }
        }
      );
    });
  }
  async deleteImageByAssetId(assetId: string) {
    const publicId = await this.getPublicIdByAssetId(assetId);
    if (!publicId) {
      throw new Error('Image with the specified asset_id not found');
    }
    return this.deleteImage(publicId);
  }
}
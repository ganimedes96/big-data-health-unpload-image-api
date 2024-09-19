import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';
import { EnvService } from '../env/env.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './images',
    }),
  ],
  providers: [CloudinaryService, EnvService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
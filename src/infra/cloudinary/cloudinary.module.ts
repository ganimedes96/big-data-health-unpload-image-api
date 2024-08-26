import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './images',
    }),
  ],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
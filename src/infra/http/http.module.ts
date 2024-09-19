import { Module } from "@nestjs/common";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccountController } from "./controllers/create-account.controller";
import { DeleteImageController } from "./controllers/delete-image.controller";
import { GetImagesController } from "./controllers/get-images.controller";
import { ImageUnploadController } from "./controllers/image-upload.controller";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { DatabaseModule } from "../database/dabase.module";
import { CreateAccountUseCase } from "@/domain/application/use-cases/create-account";
import { AuthenticateUseCase } from "@/domain/application/use-cases/authenticate";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { SaveImageUseCase } from "@/domain/application/use-cases/save-image";
import { GetImagesByIdUseCase } from "@/domain/application/use-cases/get-images-by-id";
import { DeleteImageUseCase } from "@/domain/application/use-cases/delete-image";

@Module({
  imports: [CloudinaryModule, DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController, 
    AuthenticateController,
    ImageUnploadController,
    DeleteImageController,
    GetImagesController,
  ],
  providers: [
    CreateAccountUseCase,
    SaveImageUseCase, 
    AuthenticateUseCase,
    GetImagesByIdUseCase,
    DeleteImageUseCase
  ]
    
})

export class HttpModule {}
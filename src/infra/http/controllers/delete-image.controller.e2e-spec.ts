import { INestApplication } from "@nestjs/common"
import { beforeAll, describe, expect, test, vi } from "vitest"
import { Test } from "@nestjs/testing"
import { AppModule } from "../../app.module"
import request from "supertest"
import { AccountFactory } from "test/factories/make-account"
import { JwtService } from "@nestjs/jwt"
import { DatabaseModule } from "@/infra/database/dabase.module"
import { ImageFactory } from "test/factories/make-image"
import { CloudinaryService } from "@/infra/cloudinary/cloudinary.service"

describe('Delete an image (E2E)', () => {
let app: INestApplication
let accountFadctory: AccountFactory
let imageFactory: ImageFactory
let jwt: JwtService
let cloudinaryService: CloudinaryService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AccountFactory, ImageFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    accountFadctory = moduleRef.get(AccountFactory)
    imageFactory = moduleRef.get(ImageFactory)
    cloudinaryService = moduleRef.get(CloudinaryService);
    jwt = moduleRef.get(JwtService);
    await app.init()
  })

  test('[DELETE] should delete an image', async () => {
      const account = await accountFadctory.makePrismaAccount()

      const accessToken = jwt.sign({ sub: account.id.toString() });   

      const image = await imageFactory.makePrismaImage({
        userId: account.id.toString(),
      })

      vi.spyOn(cloudinaryService, 'getPublicIdByAssetId').mockResolvedValue(image.publicId);
      vi.spyOn(cloudinaryService, 'deleteImageByAssetId').mockResolvedValue(true);

      const response = await request(app.getHttpServer())
        .delete(`/images/delete/${image.assetId.toString()}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send()
        
        expect(response.statusCode).toBe(204);
        
        
  })
  
})
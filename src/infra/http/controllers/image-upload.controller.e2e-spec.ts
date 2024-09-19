import { INestApplication } from "@nestjs/common"
import { beforeAll, describe, expect, test } from "vitest"
import { Test } from "@nestjs/testing"
import { AppModule } from "../../app.module"
import request from "supertest"
import { AccountFactory } from "test/factories/make-account"
import { JwtService } from "@nestjs/jwt"
import { DatabaseModule } from "@/infra/database/dabase.module"

describe('Save an image (E2E)', () => {
let app: INestApplication
let accountFadctory: AccountFactory
let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AccountFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    accountFadctory = moduleRef.get(AccountFactory);
    jwt = moduleRef.get(JwtService);
    await app.init()
  })

  test('[POST] should save an image', async () => {
      const account = await accountFadctory.makePrismaAccount()

      const accessToken = jwt.sign({ sub: account.id.toString() });   

      const response = await request(app.getHttpServer())
        .post('/images')
        .set('Authorization', `Bearer ${accessToken}`)
        .attach('file', './test/e2e/file.png')
        
        expect(response.statusCode).toBe(201)
        
  })

})
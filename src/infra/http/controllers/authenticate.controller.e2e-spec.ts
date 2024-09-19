import { INestApplication } from "@nestjs/common"
import { beforeAll, describe, expect, test } from "vitest"
import { Test } from "@nestjs/testing"
import { AppModule } from "../../app.module"
import request from "supertest"
import { PrismaService } from "../../database/prisma/prisma.service"
import { hash } from "bcryptjs"
import { JwtService } from "@nestjs/jwt"
import { AccountFactory } from "test/factories/make-account"
import { DatabaseModule } from "@/infra/database/dabase.module"

describe('Authenticate (E2E)', () => {
let app: INestApplication
let accountFadctory: AccountFactory;


  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AccountFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    accountFadctory = moduleRef.get(AccountFactory);
    
    await app.init()
  })

  test('[POST] should authenticate an account', async () => {
    await accountFadctory.makePrismaAccount({
      email: 'johndoe@me.com',
      password: await hash('123456', 8),
    })
    
    
    const response = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'johndoe@me.com',
        password: '123456',
      })  
      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({
        accessToken: expect.any(String),
      })
  })

})
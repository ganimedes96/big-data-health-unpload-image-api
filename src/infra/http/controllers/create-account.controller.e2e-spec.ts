import { INestApplication } from "@nestjs/common"
import { beforeAll, describe, expect, test } from "vitest"
import { Test } from "@nestjs/testing"
import { AppModule } from "../../app.module"
import request from "supertest"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import { AccountFactory } from "test/factories/make-account"
import { DatabaseModule } from "@/infra/database/dabase.module"

describe('Create account (E2E)', () => {
let app: INestApplication
let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AccountFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] should create an account', async () => {
      const response = await request(app.getHttpServer()).post('/accounts').send({
        name: 'John Doe',
        email: 'johndoe@me.com',
        password: '123456',
      })

      
      const userOnDatabase = await prisma.user.findUnique({
        where: {
          email: 'johndoe@me.com'
        }
      })
      expect(response.status).toBe(201)
      expect(userOnDatabase).toBeTruthy()
  })


})
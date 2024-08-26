import { INestApplication } from "@nestjs/common"
import { beforeAll, describe, expect, test } from "vitest"
import { Test } from "@nestjs/testing"
import { AppModule } from "../../app.module"
import request from "supertest"
import { PrismaService } from "../../database/prisma/prisma.service"
import { hash } from "bcryptjs"

describe('Authenticate (E2E)', () => {
let app: INestApplication
let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    await app.init()
  })

  test('[POST] should authenticate an account', async () => {
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@me.com',
        password: await hash('123456', 8),
      }
    })  
    
    const response = await request(app.getHttpServer()).post('/sessions').send({
        email: 'johndoe@me.com',
        password: '123456',
      })

      
      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({
        accessToken: expect.any(String),
      })
  })

})
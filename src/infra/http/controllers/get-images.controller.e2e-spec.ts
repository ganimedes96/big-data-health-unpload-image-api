import { INestApplication } from "@nestjs/common";
import { beforeAll, describe, expect, test } from "vitest";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../app.module";
import request from "supertest";
import { AccountFactory } from "test/factories/make-account";
import { JwtService } from "@nestjs/jwt";
import { ImageFactory } from "test/factories/make-image";
import { DatabaseModule } from "@/infra/database/dabase.module";

describe("Get images (E2E)", () => {
  let app: INestApplication;
  let accountFadctory: AccountFactory;
  let imageFactory: ImageFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AccountFactory, ImageFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    accountFadctory = moduleRef.get(AccountFactory);
    imageFactory = moduleRef.get(ImageFactory);
    jwt = moduleRef.get(JwtService);
    await app.init();
  });

  test("[GET] should get images", async () => {
    const account = await accountFadctory.makePrismaAccount();

    const accessToken = jwt.sign({ sub: account.id.toString() });

    await Promise.all([
      imageFactory.makePrismaImage({
        userId: account.id.toString(),
        displayName: "John Doe",
      }),
      imageFactory.makePrismaImage({
        userId: account.id.toString(),
        displayName: "Jane Doe2",
      }),
    ]);
    const response = await request(app.getHttpServer())
      .get("/images")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.images).toHaveLength(2);
  });
});

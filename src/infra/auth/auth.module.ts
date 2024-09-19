import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import { JwtStrategy } from "./jwt_strategy";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./jwt-auth-guard";
import { EnvService } from "../env/env.service";
import { EnvModule } from "../env/env.module";


@Module({
  imports: [
    PassportModule, 
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory: (config: EnvService) => {
        const privateKey = config.get('JWT_PRIVATE_KEY')
        const publicKey = config.get('JWT_PUBLIC_KEY')
        return {
          signOptions: { algorithm: 'RS256', expiresIn: '1d' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        } 
      }
    })
  ],
  providers: [
    JwtStrategy,
    EnvService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
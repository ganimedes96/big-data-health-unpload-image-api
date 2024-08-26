import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Env } from "../env/env";
import { z } from "zod";
import { EnvService } from "../env/env.service";


const tokenPayloadSchema = z.object({
  sub: z.string().uuid()
})

export type TokenPayload = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(config: EnvService) {
    const publicKey = config.get('JWT_PUBLIC_KEY');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256']
    });
  }

 async validate(payload: TokenPayload) {
   return tokenPayloadSchema.parse(payload)
  }
}
import {  BadRequestException, Body, Controller, HttpCode, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation";
import { z } from "zod";
import { AuthenticateUseCase } from "@/domain/application/use-cases/authenticate";
import { WrongCredentialsError } from "@/core/erro/errors/wrong-credentials-error";
import { Public } from "@/infra/auth/public";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

type AuthenticateAccountBody = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  
  constructor(private authenticateAccount: AuthenticateUseCase){}
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  @Public()
  async handle(@Body() body: AuthenticateAccountBody) {
    const {email, password} = body
    const result = await this.authenticateAccount.execute({
      email,
      password
    })

    if(result.isLeft()) {
      const error = result.value
      switch(error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)  
      }
    }
    const {accessToken} = result.value

    return {accessToken}
  }
}
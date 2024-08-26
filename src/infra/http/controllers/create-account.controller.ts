import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";
import {ZodValidationPipe} from '@/infra/http/pipes/zod-validation'
import { CreateAccountUseCase } from "@/domain/application/use-cases/create-account";
import { UserAlreadyExistsError } from "@/core/erro/errors/user-already-exists-error";
import { Public } from "@/infra/auth/public";

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
})

type CreateAccountBody = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private createAccount: CreateAccountUseCase) {}
  
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @Public()
  async handle(@Body() body: CreateAccountBody) {
    const { name, email, password } = body;
    const result = await this.createAccount.execute({
      name,
      email,
      password
    })

    if(result.isLeft()) {
      const error = result.value
      switch(error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
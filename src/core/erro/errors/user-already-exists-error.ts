import { UseCaseError } from '../use-case-error'

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Account ${identifier} already exists`)
  }
}
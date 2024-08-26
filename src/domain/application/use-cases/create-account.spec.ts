import { FakeHasher } from "test/cryptography/fake-hasher";
import { InMemoryAccountRepository } from "test/repositories/in-memory-account-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateAccountUseCase } from "./create-account";



let inMemoryAccountRepository: InMemoryAccountRepository
let fakeHasher: FakeHasher
let sut: CreateAccountUseCase

describe('Create Account Use Case', () => {

  beforeEach(() => {
    inMemoryAccountRepository = new InMemoryAccountRepository()
    fakeHasher = new FakeHasher()
    sut = new CreateAccountUseCase(inMemoryAccountRepository, fakeHasher)
  })

  it('should be able to create an account', async () => {
      const result = await sut.execute({
        name: 'John Doe',
        email: 'JG6uS@example.com',
        password: '123456'  
      })
      
      expect(result.isRight()).toBe(true)

  })
  it('should hash account password upon registration', async  () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'JG6uS@example.com',
      password: '123456'  
    })

    const hasherPassword = await fakeHasher.hash('123456')
    expect(result.isRight()).toBe(true)
    expect(inMemoryAccountRepository.items[0].password).toEqual(hasherPassword)

  })
})
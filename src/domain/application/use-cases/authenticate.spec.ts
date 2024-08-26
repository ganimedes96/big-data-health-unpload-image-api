import { FakeHasher } from "test/cryptography/fake-hasher";
import { InMemoryAccountRepository } from "test/repositories/in-memory-account-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { makeAccount } from "test/factories/make-account";



let inMemoryAccountRepository: InMemoryAccountRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter

let sut: AuthenticateUseCase

describe('Authenticate Account Use Case', () => {

  beforeEach(() => {
    inMemoryAccountRepository = new InMemoryAccountRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateUseCase(
      inMemoryAccountRepository,
      fakeHasher,
      fakeEncrypter
    )
  })

  it('should be able authenticate an account', async () => {
      const account = makeAccount({
        email: 'johndoe@example.com',
        password: await fakeHasher.hash('123456')
      })
      
     inMemoryAccountRepository.items.push(account)

      const result = await sut.execute({
        email: 'johndoe@example.com',
        password: '123456'  
      })
      
      expect(result.isRight()).toBe(true)
      expect(result.value).toEqual({
        accessToken: expect.any(String),
      })

  })

})
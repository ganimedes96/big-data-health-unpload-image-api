import { Module } from '@nestjs/common'


import { BcryptHasher } from './bcrypt-hasher'
import { JwtEncrypter } from './kwt-encrypter'
import { Encrypter } from '@/domain/application/cryptography/encrypter'
import { HashComparer } from '@/domain/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/application/cryptography/hash-generator'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
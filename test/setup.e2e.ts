import {config} from 'dotenv'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

import { PrismaClient } from '@prisma/client'
import { afterAll, beforeAll } from 'vitest'
import { randomUUID } from 'crypto'
import { execSync } from 'child_process'


const prisma = new PrismaClient()

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(randomUUID()) 
  process.env.DATABASE_URL = databaseURL
  execSync('pnpm prisma migrate deploy') 
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})


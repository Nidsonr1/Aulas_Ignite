import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaserequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaserequest) {
  const prismaUsersRepository = new PrismaUsersRepository()
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prismaUsersRepository.findByEmail(email)

  if (userWithSameEmail) {
    throw new Error('E-mail already exists')
  }

  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
  })
}

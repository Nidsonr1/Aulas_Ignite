import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaserequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaserequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
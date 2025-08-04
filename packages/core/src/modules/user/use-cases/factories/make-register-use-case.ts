import { PrismaUsersRepository } from '@modules/user/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '../register'

export function makeRegisterUseCase() {
  const userRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUserUseCase(userRepository)

  return registerUseCase
}

import { PrismaFormsRepository } from '@modules/form/repositories/prisma/prisma-forms-repository'
import { RegisterFormUseCase } from '../register'

export function makeRegisterFormUseCase() {
  const formsRepository = new PrismaFormsRepository()
  const registerFormUseCase = new RegisterFormUseCase(formsRepository)

  return registerFormUseCase
}

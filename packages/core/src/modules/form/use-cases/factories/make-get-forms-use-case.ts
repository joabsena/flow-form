import { PrismaFormsRepository } from '@modules/form/repositories/prisma/prisma-forms-repository'
import { GetFormsUseCase } from '../get-forms'

export function makeGetFormsUseCase() {
  const prismaFormsRepository = new PrismaFormsRepository()
  const getFormsUseCase = new GetFormsUseCase(prismaFormsRepository)

  return getFormsUseCase
}

import { PrismaFormsRepository } from '@modules/form/repositories/prisma/prisma-forms-repository'
import { DeleteFormUseCase } from '../delete'

export function makeDeleteFormUseCase() {
  const formsRepository = new PrismaFormsRepository()
  const deleteFormUseCase = new DeleteFormUseCase(formsRepository)

  return deleteFormUseCase
}

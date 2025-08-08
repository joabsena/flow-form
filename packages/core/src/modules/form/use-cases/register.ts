import { Prisma } from 'generated/prisma'
import { FormsRepository } from '../repositories/forms-repository'

export interface RegisterUseCaseRequest {
  title: string
  description?: string | null
  isPublic?: boolean
  fields: Prisma.FieldCreateInput[]
  userId?: string
}

export class RegisterFormUseCase {
  constructor(private formsRepository: FormsRepository) {}

  async execute(data: RegisterUseCaseRequest) {
    const form = await this.formsRepository.create({
      title: data.title,
      description: data?.description || null,
      isPublic: data?.isPublic || false,
      fields: {
        create: data.fields || [],
      },
      user: {
        connect: {
          id: data.userId,
        },
      },
    })

    return {
      form,
    }
  }
}

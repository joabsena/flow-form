import { $Enums } from 'generated/prisma'
import { FormsRepository } from '../repositories/forms-repository'

interface Field {
  id?: string
  label: string
  placeholder?: string | null
  type: $Enums.FieldType
  options?: []
  required?: boolean
}

export interface RegisterUseCaseRequest {
  title: string
  description?: string | null
  isPublic?: boolean
  fields?: Field
  userId?: string
}

export class RegisterFormUseCase {
  constructor(private formsRepository: FormsRepository) {}

  async execute(data: RegisterUseCaseRequest) {
    const form = await this.formsRepository.create({
      title: data.title,
      description: data?.description || null,
      isPublic: data?.isPublic || false,
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

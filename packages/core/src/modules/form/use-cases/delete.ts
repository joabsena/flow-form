import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { WithoutPermissionError } from '../errors/without-permission-error'
import { FormsRepository } from '../repositories/forms-repository'

interface DeleteUseCaseRequest {
  formId: string
  userId: string
}

export class DeleteFormUseCase {
  constructor(private formsRepository: FormsRepository) {}

  async execute({ formId, userId }: DeleteUseCaseRequest) {
    const form = await this.formsRepository.findById(formId)

    if (!form) {
      throw new ResourceNotFoundError()
    }

    if (form.user_id !== userId) {
      throw new WithoutPermissionError()
    }

    await this.formsRepository.deleteById(formId)
  }
}

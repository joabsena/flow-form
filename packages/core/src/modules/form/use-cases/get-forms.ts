import { FormsRepository } from '../repositories/forms-repository'

interface GetFormsUseCaseRequest {
  userId: string
}

export class GetFormsUseCase {
  constructor(private formsRepository: FormsRepository) {}

  async execute({ userId }: GetFormsUseCaseRequest) {
    const forms = await this.formsRepository.findByUserId(userId)

    return { forms }
  }
}

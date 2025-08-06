import { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeleteFormUseCase } from '../use-cases/factories/make-delete-form-use-case'

export async function deleteForm(
  request: FastifyRequest<{ Params: { formId: string } }>,
  reply: FastifyReply,
) {
  const { formId } = request.params
  const userId = request.user.sub

  try {
    const deleteFormUseCase = makeDeleteFormUseCase()

    await deleteFormUseCase.execute({ formId, userId })

    return reply.status(204).send()
  } catch (error) {
    return error
  }
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetFormsUseCase } from '../use-cases/factories/make-get-forms-use-case'

export async function getForms(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = request.user.sub

    const getFormsUseCase = makeGetFormsUseCase()

    const { forms } = await getFormsUseCase.execute({ userId })

    return reply.status(200).send({
      forms,
    })
  } catch (error) {
    return error
  }
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUseCaseRequest } from '../use-cases/register'
import { makeRegisterFormUseCase } from '../use-cases/factories/make-register-form-use-case'

export async function register(
  request: FastifyRequest<{
    Body: RegisterUseCaseRequest
  }>,
  reply: FastifyReply,
) {
  const { title, description, isPublic, fields } = request.body
  const userId = request.user.sub

  try {
    const registerFormUseCase = makeRegisterFormUseCase()

    const { form } = await registerFormUseCase.execute({
      title,
      userId,
      description: description || null,
      isPublic: isPublic || false,
      fields,
    })

    return reply.status(201).send({
      form,
    })
  } catch (error) {
    return error
  }
}

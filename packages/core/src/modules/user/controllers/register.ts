import { FastifyReply, FastifyRequest } from 'fastify'
import { makeRegisterUseCase } from '../use-cases/factories/make-register-use-case'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

type RegisterRequestBody = {
  name: string
  email: string
  password: string
}

export async function register(
  request: FastifyRequest<{
    Body: RegisterRequestBody
  }>,
  reply: FastifyReply,
) {
  const { name, email, password } = request.body

  try {
    const registerUseCase = makeRegisterUseCase()

    const { user } = await registerUseCase.execute({
      name,
      email,
      password,
    })

    user.password = null

    return reply.status(201).send(user)
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}

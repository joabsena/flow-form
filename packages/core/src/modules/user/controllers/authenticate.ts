import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthenticateUseCaseRequest } from '../use-cases/authenticate'
import { makeAuthenticateUseCase } from '../use-cases/factories/make-authenticate-use-case'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest<{ Body: AuthenticateUseCaseRequest }>,
  reply: FastifyReply,
) {
  const { email, password } = request.body

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}

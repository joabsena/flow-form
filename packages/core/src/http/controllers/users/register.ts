import { FastifyReply, FastifyRequest } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  reply.send({
    message: 'User registered successfully',
    user: request.body,
  })
}

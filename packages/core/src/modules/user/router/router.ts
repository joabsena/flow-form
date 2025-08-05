import { FastifyInstance } from 'fastify'
import { register } from '../controllers/register'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function usersRouter(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/users',
    schema: {
      body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      }),
    },
    handler: register,
  })
}

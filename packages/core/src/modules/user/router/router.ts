import { FastifyInstance } from 'fastify'
import { register } from '../controllers/register'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function usersRouter(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/users', {
    schema: {
      body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      }),
      response: {
        201: z.object({
          id: z.string(),
          name: z.string(),
          email: z.string().email(),
          password: z.null(),
          createdAt: z.date(),
          updatedAt: z.date(),
        }),
        409: z.object({
          message: z.string(),
        }),
      },
    },
    handler: register,
  })
}

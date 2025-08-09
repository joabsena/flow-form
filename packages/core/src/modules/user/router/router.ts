import { FastifyInstance } from 'fastify'
import { register } from '../controllers/register'
import z from 'zod'
import { authenticate } from '../controllers/authenticate'
import { SwaggerTags } from 'src/shared/types/swagger-tags'
import { refresh } from '../controllers/refresh'

export async function usersRouter(app: FastifyInstance) {
  app.post('/users', {
    schema: {
      description: 'Register a new user',
      tags: [SwaggerTags.AUTHENTICATION],
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

  app.post('/sessions', {
    schema: {
      description: 'Authenticate user and return JWT token',
      tags: [SwaggerTags.AUTHENTICATION],
      body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
      response: {
        200: z.object({
          token: z.string(),
        }),
        401: z.object({
          message: z.string(),
        }),
      },
    },
    handler: authenticate,
  })

  app.patch('/refresh', {
    schema: {
      description: 'Refresh JWT token',
      tags: [SwaggerTags.AUTHENTICATION],
      response: {
        200: z.object({
          token: z.string(),
        }),
      },
    },
    handler: refresh,
  })
}

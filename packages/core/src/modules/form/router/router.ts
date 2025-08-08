import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { register } from '../controllers/register'
import z from 'zod'
import { verifyJWT } from 'src/shared/middlewares/verify-jwt'
import { SwaggerTags } from 'src/shared/types/swagger-tags'
import { deleteForm } from '../controllers/delete'
import { getForms } from '../controllers/get-forms'

export const formsRouter = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post('/forms', {
    schema: {
      description: 'Register a new form',
      tags: [SwaggerTags.FORMS],
      body: z.object({
        title: z.string(),
        description: z.string().optional(),
        isPublic: z.boolean().optional(),
        fields: z.array(
          z.object({
            label: z.string(),
            placeholder: z.string().optional(),
            type: z.string(),
            options: z
              .array(
                z.object({
                  key: z.any(),
                  value: z.any(),
                }),
              )
              .optional(),
            required: z.boolean().optional(),
          }),
        ),
      }),
    },
    preHandler: [verifyJWT],
    handler: register,
  })

  app.withTypeProvider<ZodTypeProvider>().get('/forms', {
    schema: {
      description: 'Get all forms for the authenticated user',
    },
    preHandler: [verifyJWT],
    handler: getForms,
  })

  app.withTypeProvider<ZodTypeProvider>().delete('/forms/:formId', {
    schema: {
      description: 'Delete a form by ID',
      tags: [SwaggerTags.FORMS],
      params: z.object({
        formId: z.string(),
      }),
      response: {
        204: z.null(),
        400: z.object({
          message: z.string(),
        }),
      },
    },
    preHandler: [verifyJWT],
    handler: deleteForm,
  })
}

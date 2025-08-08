import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { register } from '../controllers/register'
import z from 'zod'
import { verifyJWT } from 'src/shared/middlewares/verify-jwt'
import { SwaggerTags } from 'src/shared/types/swagger-tags'
import { deleteForm } from '../controllers/delete'

export const formsRouter = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post('/forms', {
    schema: {
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

  app.withTypeProvider<ZodTypeProvider>().delete('/forms/:formId', {
    schema: {
      tags: [SwaggerTags.FORMS],
      params: z.object({
        formId: z.string(),
      }),
    },
    preHandler: [verifyJWT],
    handler: deleteForm,
  })
}

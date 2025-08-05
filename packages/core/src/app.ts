import fastify from 'fastify'
import { env } from '../env'
import { usersRouter } from '@modules/user/router/router'
import {
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

export const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Flow Form API',
      description: 'API for managing forms',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/documentation',
})

app.register(usersRouter)

app.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.code(400).send({
      error: 'Response Validation Error',
      message: "Request doesn't match the schema",
      statusCode: 400,
      details: {
        issues: error.validation,
        method: request.method,
        url: request.url,
      },
    })
  }

  if (isResponseSerializationError(error)) {
    return reply.code(500).send({
      error: 'Internal Server Error',
      message: "Response doesn't match the schema",
      statusCode: 500,
      details: {
        issues: error.cause.issues,
        method: request.method,
        url: request.url,
      },
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

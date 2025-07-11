import { FastifyInstance } from 'fastify';

import { loginSchema } from './login.schema';
import { loginController } from './login.controller';

export default async function loginRouter(fastify: FastifyInstance) {
  fastify.get(
    '/login',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Generate token for API authentication',
        description: 'responsible to generate token for API authentication.',
        headers: loginSchema.headers,
        response: loginSchema.response,
      },
    },
    loginController,
  );
}

import { FastifyInstance } from 'fastify';

import { logoutSchema } from './logout.schema';
import { logoutController } from './logout.controller';

export default async function logoutRouter(fastify: FastifyInstance) {
  fastify.get(
    '/logout',
    {
      schema: {
        tags: ['Auth'],
        summary: 'clear cookie responsible about refresh token',
        description: 'Clear cokkie responsible about refresh token.',
        headers: logoutSchema.headers,
        response: logoutSchema.response,
      },
    },
    logoutController,
  );
}

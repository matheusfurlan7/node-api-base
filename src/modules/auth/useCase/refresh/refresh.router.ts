import { FastifyInstance } from 'fastify';

import { refreshSchema } from './refresh.schema';
import { refreshController } from './refresh.controller';

export default async function refreshRouter(fastify: FastifyInstance) {
  fastify.get(
    '/refresh',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Generate new token for API authentication via cookie',
        description: 'responsible to generate new token for API authentication via cookie.',
        headers: refreshSchema.headers,
        response: refreshSchema.response,
      },
    },
    refreshController,
  );
}

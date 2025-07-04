import { FastifyInstance } from 'fastify';

import { checkHealthSchema } from './checkHealth.schema';
import { checkHealthController } from './checkHealth.controller';

export default async function checkHealthRouter(fastify: FastifyInstance) {
  fastify.get(
    '',
    {
      schema: {
        tags: ['Health'],
        summary: 'Check health from the API',
        description: 'Endpoint to check health from the API.',
        response: checkHealthSchema.response,
      },
    },
    checkHealthController,
  );
}

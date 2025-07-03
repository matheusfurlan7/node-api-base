import { FastifyInstance } from 'fastify';

async function registerHealthRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/',
    {
      schema: {
        tags: ['Health'],
        summary: 'Check health from the API',
        description: 'Endpoint to check health from the API.',
        response: {
          200: {
            type: 'object',
            properties: {
              status: { type: 'string' },
              uptime: { type: 'number' },
            },
          },
        },
      },
    },
    async () => {
      return { status: 'ok', uptime: process.uptime() };
    },
  );
}

export default async function healthRoutes(fastify: FastifyInstance) {
  fastify.register(registerHealthRoutes, { prefix: '/health' });
}

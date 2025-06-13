import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default async function healthRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  
  fastify.get('/', async (request, reply) => {
        return { status: 'ok' };
  });

}

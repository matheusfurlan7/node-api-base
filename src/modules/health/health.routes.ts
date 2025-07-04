import { FastifyInstance } from 'fastify';

import checkHealthRouter from './useCase/checkHealth/checkHealth.router';

export default async function healthRoutes(fastify: FastifyInstance) {
  fastify.register(checkHealthRouter, { prefix: '/health' });
}

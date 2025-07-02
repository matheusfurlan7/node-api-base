import { FastifyInstance } from 'fastify';

async function registerHealthRoutes(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return { status: 'ok', uptime: process.uptime() };
  });
}

export default async function healthRoutes(fastify: FastifyInstance) {
  fastify.register(registerHealthRoutes, { prefix: '/health' });
}

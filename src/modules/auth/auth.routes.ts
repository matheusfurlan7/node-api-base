import { FastifyInstance } from 'fastify';

import loginRouter from './useCase/login/login.router';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.register(loginRouter, { prefix: '/auth' });
}

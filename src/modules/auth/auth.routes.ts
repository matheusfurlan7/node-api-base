import { FastifyInstance } from 'fastify';

import loginRouter from './useCase/login/login.router';
import refreshRouter from './useCase/refresh/refresh.router';
import logoutRouter from './useCase/logout/logout.router';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.register(loginRouter, { prefix: '/auth' });
  fastify.register(refreshRouter, { prefix: '/auth' });
  fastify.register(logoutRouter, { prefix: '/auth' });
}

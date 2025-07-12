import { FastifyInstance } from 'fastify';

import healthRoutes from './health/health.routes';
import authRoutes from './auth/auth.routes';

export default async function moduleRoutes(app: FastifyInstance) {
  app.register(healthRoutes, { prefix: '/' });
  app.register(authRoutes, { prefix: '/' });

  app.register(async (protectedRoutes: FastifyInstance) => {
    protectedRoutes.addHook('onRequest', protectedRoutes.verifyJWT);
  });
}

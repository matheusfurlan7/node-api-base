import { FastifyInstance } from 'fastify';

import healthRoutes from '@src/modules/health/health.routes';

export default async function moduleRoutes(app: FastifyInstance) {
  app.register(healthRoutes, { prefix: '/' });
}

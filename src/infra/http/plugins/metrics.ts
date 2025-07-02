import { FastifyInstance } from 'fastify';
import { collectDefaultMetrics, Registry } from 'prom-client';

const register = new Registry();
collectDefaultMetrics({ register });

export async function metricsPlugin(app: FastifyInstance) {
  app.get('/metrics', async (req, reply) => {
    reply.header('Content-Type', register.contentType);
    reply.send(await register.metrics());
  });
}

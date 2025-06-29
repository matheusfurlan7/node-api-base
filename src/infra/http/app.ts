import Fastify from 'fastify';

import logger from '@plugins/logger';

import healthRoutes from '@modules/health/router/health.router';

const app = Fastify({ logger });

app.register(healthRoutes, { prefix: '/health' });

export default app;

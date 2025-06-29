import Fastify from 'fastify';

import logger from '@plugins/logger';
import { metricsPlugin } from '@plugins/metrics';
import { rateLimitPlugin } from './plugins/rate-limit';
import { corsPlugin } from './plugins/cors';

import healthRoutes from '@modules/health/router/health.router';

const app = Fastify({ logger });

metricsPlugin(app);
rateLimitPlugin(app);
corsPlugin(app);

app.register(healthRoutes, { prefix: '/health' });

export default app;

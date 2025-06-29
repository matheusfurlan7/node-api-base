import Fastify from 'fastify';

import healthRoutes from '@modules/health/router/health.router';

const app = Fastify();

app.register(healthRoutes, { prefix: '/health' });

export default app;

import APP from '@src/infra/http/app';
import dotenv from 'dotenv';

import { metricsPlugin } from '@plugins/metrics';
import { rateLimitPlugin } from './plugins/rate-limit';
import { corsPlugin } from './plugins/cors';
import { compressPlugin } from './plugins/compress';

import healthRoutes from '@modules/health/router/health.router';
import testCompressionRoutes from '@infra/http/plugins/test/testCompressionRoutes.router';

dotenv.config();

async function start() {
  const app: APP = new APP({
    plugins: [metricsPlugin, corsPlugin, rateLimitPlugin, compressPlugin],
    routers: [healthRoutes, testCompressionRoutes],
  });

  try {
    const PORT = process.env.PORT || 3000;
    await app.listen(Number(PORT));
  } catch (err) {
    app.server.log.error(err);
    process.exit(1);
  }
}

start();

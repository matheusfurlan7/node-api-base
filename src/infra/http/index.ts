import APP from '@src/infra/http/app';
import logger from '@plugins/logger';
import plugins from '@plugins/index';

import healthRoutes from '@modules/health/router/health.router';
import testCompressionRoutes from '@src/infra/http/plugins/__test__/testCompressionRoutes.router';

async function start() {
  (await import('dotenv')).config();

  const app: APP = new APP({
    options: { logger },
    plugins,
    routers: [healthRoutes, testCompressionRoutes],
  });

  try {
    const PORT = process.env.PORT || 3000;
    await app.server.listen({ port: Number(PORT) });
  } catch (err) {
    app.server.log.error(err);
    process.exit(1);
  }
}

start();

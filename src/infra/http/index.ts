import APP from '@src/infra/http/app';
import logger from '@plugins/logger';
import plugins from '@plugins/index';

import verifyJWT from '@plugins/verifyJWT';

import moduleRoutes from '@modules/modules.routers';

async function start() {
  (await import('dotenv')).config();

  const app: APP = new APP({
    options: { logger },
    plugins: plugins.concat(verifyJWT),
    routers: [moduleRoutes],
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

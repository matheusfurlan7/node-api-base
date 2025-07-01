import Fastify, { FastifyInstance } from 'fastify';

import logger from '@plugins/logger';

type FastifyInstanceFunction = (fastifyFunctions: FastifyInstance) => Promise<void>;

class APP {
  public readonly server: FastifyInstance;

  constructor(config: {
    plugins?: FastifyInstanceFunction[];
    routers?: FastifyInstanceFunction[];
  }) {
    this.server = Fastify({ logger });

    if (config.plugins)
      for (const plugin of config.plugins) {
        plugin(this.server);
      }

    if (config.routers)
      for (const routers of config.routers) {
        routers(this.server);
      }
  }

  public async listen(port: number) {
    await this.server.listen({ port: Number(port) });
  }
}

export default APP;

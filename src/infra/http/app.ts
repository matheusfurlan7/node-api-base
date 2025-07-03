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
}

export default APP;

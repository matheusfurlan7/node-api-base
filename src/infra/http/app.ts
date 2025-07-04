import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';

type FastifyInstanceFunction = (fastifyFunctions: FastifyInstance) => Promise<void>;

interface AppConstrutor {
  options?: FastifyServerOptions;
  plugins?: FastifyInstanceFunction[];
  routers?: FastifyInstanceFunction[];
}
class APP {
  public readonly server: FastifyInstance;

  constructor({ options, plugins, routers }: AppConstrutor) {
    this.server = Fastify({ ...options });

    if (plugins)
      for (const plugin of plugins) {
        plugin(this.server);
      }

    if (routers)
      for (const router of routers) {
        router(this.server);
      }
  }
}

export default APP;

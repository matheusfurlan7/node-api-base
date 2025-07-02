import { FastifyInstance } from 'fastify';

async function registerTestCompressionRoutes(app: FastifyInstance) {
  app.get('/test/compression', async () => {
    const bigPayload = {
      data: 'x'.repeat(5000), // string com 5000 caracteres
    };
    return bigPayload;
  });
}

export default async function testCompressionRoutes(fastify: FastifyInstance) {
  fastify.register(registerTestCompressionRoutes);
}

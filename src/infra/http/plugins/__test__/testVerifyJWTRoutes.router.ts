import { FastifyInstance } from 'fastify';

async function registerTestVerifyJWTRoutes(app: FastifyInstance) {
  app.get('/protected', { preHandler: app.verifyJWT }, async (req) => {
    return { user: req.user };
  });
}

export default async function testVerifyJWTRoutes(fastify: FastifyInstance) {
  fastify.register(registerTestVerifyJWTRoutes);
}

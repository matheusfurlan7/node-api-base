import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

async function registerTestCookieRoutes(app: FastifyInstance) {
  app.get('/set-cookie', (request: FastifyRequest, reply: FastifyReply) => {
    reply.setCookie('user', 'Matheus', {
      path: '/',
      httpOnly: true,
    });
    return { ok: true };
  });

  app.get('/get-cookie', (request: FastifyRequest) => {
    return { user: request.cookies.user || null };
  });
}

export default async function testCookieRoutes(fastify: FastifyInstance) {
  fastify.register(registerTestCookieRoutes);
}

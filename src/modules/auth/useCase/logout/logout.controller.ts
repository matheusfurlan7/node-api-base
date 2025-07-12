import { FastifyRequest, FastifyReply } from 'fastify';

export async function logoutController(req: FastifyRequest, reply: FastifyReply): Promise<null> {
  reply.clearCookie('refreshToken', {
    path: '/auth/refresh',
  });

  return reply.status(204).send();
}

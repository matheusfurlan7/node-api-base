import { verifyAccessToken } from '@src/modules/auth/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

export interface FastifyRequestUser {
  sub: string;
  email: string;
  role: 'admin';
}

declare module 'fastify' {
  interface FastifyInstance {
    verifyJWT: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    user: FastifyRequestUser;
  }
}

export default fp(async (fastify) => {
  fastify.decorate('verifyJWT', async (req: FastifyRequest, reply: FastifyReply) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return reply.status(401).send({ message: 'Missing token' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = verifyAccessToken(token) as FastifyRequestUser;
      req.user = payload;
    } catch {
      return reply.status(401).send({ message: 'Invalid token' });
    }
  });
});

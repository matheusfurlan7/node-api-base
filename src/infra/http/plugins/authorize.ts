import { FastifyRequest, FastifyReply } from 'fastify';

export function authorize(allowedRoles: string[]) {
  return async function (req: FastifyRequest, reply: FastifyReply) {
    const user = req.user;

    console.log('user', user);
    if (!user || !allowedRoles.includes(user.role)) {
      return reply.status(403).send({ message: 'Forbidden: insufficient role' });
    }
  };
}

import { FastifyRequest, FastifyReply } from 'fastify';
import { signAccessToken } from '@modules/auth/jwt';
import { LoginResponse, LoginHeader } from './login.schema';

export async function loginController(
  req: FastifyRequest,
  reply: FastifyReply,
): Promise<LoginResponse> {
  const { email, password } = req.headers as unknown as LoginHeader;

  if (email !== 'admin@admin.com' || password !== '123456') {
    return reply.status(401).send({ message: 'Invalid credentials' });
  }

  const payload = {
    sub: 'user-id',
    email,
    role: 'admin',
  };

  const accessToken = signAccessToken(payload);

  return reply.send({ accessToken });
}

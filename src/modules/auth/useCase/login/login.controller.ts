import { FastifyRequest, FastifyReply } from 'fastify';
import { signAccessToken, signRefreshToken } from '@modules/auth/jwt';
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
  const refreshToken = signRefreshToken(payload);

  reply.setCookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/auth/refresh',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return reply.send({ accessToken });
}

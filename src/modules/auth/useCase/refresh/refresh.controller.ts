import { FastifyRequest, FastifyReply } from 'fastify';
import { signAccessToken, verifyRefreshToken } from '@modules/auth/jwt';
import { RefreshInformationToken, RefreshResponse } from './refresh.schema';

export async function refreshController(
  req: FastifyRequest,
  reply: FastifyReply,
): Promise<RefreshResponse> {
  const token = req.cookies.refreshToken;

  if (!token) {
    return reply.status(401).send({ message: 'Missing refresh token' });
  }

  try {
    const decoded = verifyRefreshToken(token) as RefreshInformationToken;

    const accessToken = signAccessToken({
      sub: decoded.sub,
      email: decoded.email,
      role: decoded.role,
    });

    return reply.send({ accessToken });
  } catch {
    return reply.status(403).send({ message: 'Invalid or expired refresh token' });
  }
}

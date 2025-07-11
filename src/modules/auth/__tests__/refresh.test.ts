import { describe, it, expect } from 'vitest';
import { FastifyReply, FastifyRequest } from 'fastify';
import APP from '@src/infra/http/app';
import authRoutes from '../auth.routes';
import { refreshController } from '../useCase/refresh/refresh.controller';
import * as jwtModule from '@modules/auth/jwt';

describe('GET /auth', () => {
  let app: APP;

  const mocjwtkReply = () => {
    const reply: Partial<FastifyReply> = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    return reply as FastifyReply;
  };

  beforeAll(async () => {
    app = new APP({
      routers: [authRoutes],
    });

    await app.server.ready();
  });

  afterAll(async () => {
    await app.server.close();
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return 401 if refresh token is missing', async () => {
    const req = { cookies: {} } as unknown as FastifyRequest;
    const reply = mocjwtkReply();

    await refreshController(req, reply);

    expect(reply.status).toHaveBeenCalledWith(401);
    expect(reply.send).toHaveBeenCalledWith({ message: 'Missing refresh token' });
  });

  it('should return 403 if refresh token is invalid or expired', async () => {
    const req = {
      cookies: { refreshToken: 'invalid.token' },
    } as unknown as FastifyRequest;
    const reply = mocjwtkReply();

    vi.spyOn(jwtModule, 'verifyRefreshToken').mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await refreshController(req, reply);

    expect(reply.status).toHaveBeenCalledWith(403);
    expect(reply.send).toHaveBeenCalledWith({ message: 'Invalid or expired refresh token' });
  });

  it('should return 200 and a new access token if refresh token is valid', async () => {
    const req = {
      cookies: { refreshToken: 'valid.token' },
    } as unknown as FastifyRequest;
    const reply = mocjwtkReply();

    const fakeDecoded = {
      sub: 'user-id',
      email: 'user@example.com',
      role: 'user',
    };

    const fakeAccessToken = 'new.access.token';

    vi.spyOn(jwtModule, 'verifyRefreshToken').mockReturnValue(fakeDecoded);
    vi.spyOn(jwtModule, 'signAccessToken').mockReturnValue(fakeAccessToken);

    await refreshController(req, reply);

    expect(reply.send).toHaveBeenCalledWith({ accessToken: fakeAccessToken });
  });
});

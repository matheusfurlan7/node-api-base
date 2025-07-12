import { describe, it, expect } from 'vitest';
import { FastifyReply, FastifyRequest } from 'fastify';
import APP from '@src/infra/http/app';
import authRoutes from '../auth.routes';
import { logoutController } from '../useCase/logout/logout.controller';

describe('GET /auth', () => {
  let app: APP;

  const mocjwtkReply = () => {
    const reply: Partial<FastifyReply> = {
      clearCookie: vi.fn(),
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

  it('should clear the refresh token cookie and respond with 204', async () => {
    const req = {} as FastifyRequest;

    const reply = mocjwtkReply();

    await logoutController(req, reply);

    expect(reply.clearCookie).toHaveBeenCalledWith('refreshToken', { path: '/auth/refresh' });
    expect(reply.status).toHaveBeenCalledWith(204);
    expect(reply.send).toHaveBeenCalledWith();
  });
});

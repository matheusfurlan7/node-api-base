import { describe, it, expect } from 'vitest';
import { FastifyReply, FastifyRequest } from 'fastify';
import APP from '@src/infra/http/app';
import authRoutes from '../auth.routes';
import { loginController } from '../useCase/login/login.controller';
import * as jwt from '../jwt';
import { LoginHeader } from '../useCase/login/login.schema';

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

  it('should return 401 for invalid credentials', async () => {
    const req = {
      headers: {
        email: 'invalid@example.com',
        password: 'wrong',
      },
    } as unknown as FastifyRequest<{ Headers: LoginHeader }>;

    const reply = mocjwtkReply();

    await loginController(req, reply);

    expect(reply.status).toHaveBeenCalledWith(401);
    expect(reply.send).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it('should return access token for valid credentials', async () => {
    const fakeToken = 'fake.jwt.token';
    const signAccessTokenSpy = vi.spyOn(jwt, 'signAccessToken').mockReturnValue(fakeToken);

    const req = {
      headers: {
        email: 'admin@admin.com',
        password: '123456',
      },
    } as unknown as FastifyRequest<{ Headers: LoginHeader }>;

    const reply = mocjwtkReply();

    await loginController(req, reply);

    expect(signAccessTokenSpy).toHaveBeenCalledWith({
      sub: 'user-id',
      email: 'admin@admin.com',
      role: 'admin',
    });

    expect(reply.send).toHaveBeenCalledWith({ accessToken: fakeToken });
  });
});

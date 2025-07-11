import APP from '@infra/http/app';
import verifyJWT from '@plugins/verifyJWT';
import { signAccessToken } from '@src/modules/auth/jwt';
import testVerifyJWTRoutes from './testVerifyJWTRoutes.router';

describe('Verify JWT', () => {
  let app: APP;

  const validPayload = {
    sub: 'user-id',
    email: 'user@example.com',
    role: 'user',
  };

  beforeAll(async () => {
    app = new APP({
      plugins: [verifyJWT],
      routers: [testVerifyJWTRoutes],
    });

    await app.server.ready();
  });

  afterAll(async () => {
    await app.server.close();
  });

  it('should return 401 if Authorization header is missing', async () => {
    const res = await app.server.inject({
      method: 'GET',
      url: '/protected',
    });

    expect(res.statusCode).toBe(401);
    expect(res.json()).toEqual({ message: 'Missing token' });
  });

  it('should return 401 if token is invalid', async () => {
    const res = await app.server.inject({
      method: 'GET',
      url: '/protected',
      headers: {
        Authorization: 'Bearer invalid.token.here',
      },
    });

    expect(res.statusCode).toBe(401);
    expect(res.json()).toEqual({ message: 'Invalid token' });
  });

  it('should allow access and set req.user if token is valid', async () => {
    const res = await app.server.inject({
      method: 'GET',
      url: '/protected',
      headers: {
        Authorization: `Bearer ${signAccessToken(validPayload)}`,
      },
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({ user: validPayload });
  });
});

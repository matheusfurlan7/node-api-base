import { describe, it, expect, beforeEach } from 'vitest';
import APP from '@infra/http/app';
import { cookiePlugin } from '@plugins/cookie';
import testCookieRoutes from '@src/infra/http/plugins/__test__/testCokkieRoutes.router';

describe('cookiePlugin', () => {
  let app: APP;

  beforeEach(async () => {
    app = new APP({
      plugins: [cookiePlugin],
      routers: [testCookieRoutes],
    });

    await app.server.ready();
  });

  afterEach(async () => {
    await app.server.close();
  });

  it('should set a cookie', async () => {
    const res = await app.server.inject({
      method: 'GET',
      url: '/set-cookie',
    });

    const cookieHeader = res.headers['set-cookie'];
    expect(cookieHeader).toContain('user=Matheus');
  });

  it('should read a cookie', async () => {
    const res = await app.server.inject({
      method: 'GET',
      url: '/get-cookie',
      cookies: {
        user: 'Matheus',
      },
    });

    const body = await res.json();
    expect(body).toEqual({ user: 'Matheus' });
  });
});

import APP from '@infra/http/app';

import { corsPlugin } from '@plugins/cors';
import healthRoutes from '@modules/health/router/health.router';

import { describe, it, expect, vi, beforeEach } from 'vitest';

const createApp = async (): Promise<APP> => {
  const app = new APP({
    plugins: [corsPlugin],
    routers: [healthRoutes],
  });

  await app.server.ready();

  return app;
};

describe('CORS', () => {
  let app: APP;

  beforeEach(() => {
    vi.resetModules();
  });

  beforeAll(async () => {
    process.env.CORS_ORIGINS = 'localhost:80';

    app = await createApp();
  });

  afterAll(async () => {
    await app.server.close();
  });

  it('should allow valid origin', async () => {
    const res = await app.server.inject({
      method: 'get',
      url: '/health',
      headers: {
        origin: 'localhost:80',
      },
    });

    expect(res.headers['access-control-allow-origin']).toBe('localhost:80');
    expect(res.statusCode).toBe(200);
  });

  it('should block invalid origin', async () => {
    const res = await app.server.inject({
      method: 'get',
      url: '/health',
      headers: {
        origin: 'http://hacker.com',
      },
    });

    expect(res.headers['access-control-allow-origin']).toBeUndefined();
    expect(res.statusCode).toBe(500);
  });

  it('should allow all request', async () => {
    process.env.CORS_ORIGINS = '*';

    const app2 = await createApp();
    const res = await app2.server.inject({
      method: 'get',
      url: '/health',
      headers: {
        origin: 'http://hacker.com',
      },
    });

    expect(res.headers['access-control-allow-origin']).toBe('http://hacker.com');
    expect(res.statusCode).toBe(200);
  });
});

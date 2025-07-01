import APP from '@infra/http/app';

import dotenv from 'dotenv';

import { corsPlugin } from '@plugins/cors';
import healthRoutes from '@modules/health/router/health.router';

describe('CORS', () => {
  let app: APP;

  beforeAll(async () => {
    dotenv.config();

    app = new APP({
      plugins: [corsPlugin],
      routers: [healthRoutes],
    });

    await app.server.ready();
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
});

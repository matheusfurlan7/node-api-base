import APP from '@infra/http/app';

import { rateLimitPlugin } from '@plugins/rate-limit';
import healthRoutes from '@modules/health/health.routes';

describe('Rate limiting', () => {
  let app: APP;

  beforeAll(async () => {
    app = new APP({
      plugins: [rateLimitPlugin],
      routers: [healthRoutes],
    });

    await app.server.ready();
  });

  afterAll(async () => {
    await app.server.close();
  });

  it('should limit requests after threshold', async () => {
    for (let i = 0; i < 100; i++) {
      const res = await app.server.inject({
        method: 'GET',
        url: '/health',
      });
      expect(res.statusCode).toBe(200);
    }

    const limited = await app.server.inject({
      method: 'GET',
      url: '/health',
    });

    expect(limited.statusCode).toBe(429);
    const payload = JSON.parse(limited.body);
    expect(payload.error).toBe('Too Many Requests');
    expect(payload.message).toBe('You have exceeded the request limit.');
  });
});

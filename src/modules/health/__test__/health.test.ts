import { describe, it, expect } from 'vitest';

import APP from '@infra/http/app';
import healthRoutes from '@modules/health/router/health.router';

describe('GET /health', () => {
  let app: APP;

  beforeAll(async () => {
    app = new APP({
      routers: [healthRoutes],
    });

    await app.server.ready();
  });

  afterAll(async () => {
    await app.server.close();
  });

  it('should return status ok', async () => {
    const res = await app.server.inject({
      method: 'GET',
      url: '/health',
    });

    expect(res.statusCode).toBe(200);

    const payload = JSON.parse(res.body);
    expect(payload.status).toBe('ok');
    expect(payload.uptime).toBeDefined();
  });
});

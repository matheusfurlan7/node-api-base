import { describe, it, expect, beforeAll, afterAll } from 'vitest';

import APP from '@infra/http/app';
import { metricsPlugin } from '@plugins/metrics';

describe('Metrics', () => {
  let app: APP;

  beforeAll(async () => {
    app = new APP({
      plugins: [metricsPlugin],
    });

    await app.server.ready();
  });

  afterAll(async () => {
    await app.server.close();
  });

  it('should return prometheus metrics', async () => {
    const res = await app.server.inject({
      method: 'GET',
      url: '/metrics',
    });

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toContain('text/plain');
    expect(res.body).toContain('process_cpu_user_seconds_total');
  });
});

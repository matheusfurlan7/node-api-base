import { describe, it, expect } from 'vitest';
import app from '@src/infra/http/app';

describe('GET /health', () => {
  it('should return status ok', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/health',
    });

    expect(res.statusCode).toBe(200);

    const payload = JSON.parse(res.body);
    expect(payload.status).toBe('ok');
    expect(payload.uptime).toBeDefined();
  });
});

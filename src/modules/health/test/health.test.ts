import { describe, it, expect } from 'vitest';
import app from '@src/app';

describe('GET /health', () => {
  it('should return status ok', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/health',
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ status: 'ok' });
  });
});

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '@src/app';

describe('GET /health', () => {
  it('should return status ok', async () => {
    const response = await request(app.server).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});

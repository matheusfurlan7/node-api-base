// test/utils/jwt.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
import { signAccessToken } from '../jwt';

describe('signAccessToken', () => {
  const payload = { userId: '123' };

  type keyToken = Record<string, string>;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return a signed JWT token with correct payload and secret', () => {
    const token = signAccessToken(payload);

    expect(typeof token).toBe('string');

    const decoded = jwt.decode(token) as keyToken;
    expect(decoded.userId).toBe('123');
  });

  it('should sign token with 15 minutes expiration', () => {
    const token = signAccessToken(payload);
    const decoded = jwt.decode(token) as keyToken;

    expect(decoded.exp).toBeDefined();
    expect(decoded.iat).toBeDefined();

    const expirationTime = Number(decoded.exp) - Number(decoded.iat);
    expect(expirationTime).toBeLessThanOrEqual(15 * 60);
  });
});

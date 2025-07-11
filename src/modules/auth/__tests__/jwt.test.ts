import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../jwt';

describe('signAccessToken', () => {
  const payload = {
    userId: '123',
    email: 'admin@admin.com',
    role: 'admin',
  };

  const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'jwt-refresh-secret';

  type keyToken = Record<string, string>;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return a signed JWT token with correct payload and secret', () => {
    const token = signAccessToken(payload);

    expect(typeof token).toBe('string');

    const decoded = jwt.decode(token) as keyToken;
    expect(decoded).toMatchObject(payload);
  });

  it('should sign token with 15 minutes expiration', () => {
    const token = signAccessToken(payload);
    const decoded = jwt.decode(token) as keyToken;

    expect(decoded.exp).toBeDefined();
    expect(decoded.iat).toBeDefined();

    const expirationTime = Number(decoded.exp) - Number(decoded.iat);
    expect(expirationTime).toBeLessThanOrEqual(15 * 60);
  });

  it('should return a signed JWT refresh token with correct payload and secret', () => {
    const token = signRefreshToken(payload);

    expect(typeof token).toBe('string');

    const decoded = jwt.decode(token) as keyToken;
    expect(decoded).toMatchObject(payload);
  });

  it('should sign refresh token with 7 days expiration', () => {
    const token = signRefreshToken(payload);
    const decoded = jwt.decode(token) as keyToken;

    expect(decoded.exp).toBeDefined();
    expect(decoded.iat).toBeDefined();

    const expirationTime = Number(decoded.exp) - Number(decoded.iat);
    expect(expirationTime).toBeLessThanOrEqual(60 * 60 * 24 * 7);
  });

  it('should verify a valid refresh token and return the payload', () => {
    const token = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '1h' });

    const result = verifyRefreshToken(token);

    expect(result).toMatchObject(payload);
  });

  it('should throw if token is invalid', () => {
    expect(() => verifyRefreshToken('invalid.token.here')).toThrow(jwt.JsonWebTokenError);
  });

  it('should throw if token is expired', () => {
    const expiredToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '-10s' });

    expect(() => verifyRefreshToken(expiredToken)).toThrow(jwt.JsonWebTokenError);
  });

  it('should throw if secret is wrong', () => {
    const token = jwt.sign(payload, 'wrong-secret', { expiresIn: '1h' });

    expect(() => verifyRefreshToken(token)).toThrow(jwt.JsonWebTokenError);
  });
});

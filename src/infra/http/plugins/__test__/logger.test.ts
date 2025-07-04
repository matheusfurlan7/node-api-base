import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('logger config', async () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('uses "info" with default to LOG_LEVEL', async () => {
    delete process.env.LOG_LEVEL;
    delete process.env.NODE_ENV;

    const config = (await import('@plugins/logger')).default;

    expect(config.level).toBe('info');
  });

  it('uses LOG_LEVEL defined in the environment', async () => {
    process.env.LOG_LEVEL = 'debug';

    const config = (await import('@plugins/logger')).default;

    expect(config.level).toBe('debug');
  });

  it('transport must undefined in production', async () => {
    process.env.NODE_ENV = 'production';

    const config = (await import('@plugins/logger')).default;

    expect(config.transport).toBeUndefined();
  });

  it('transport must contain pino-pretty out of production', async () => {
    process.env.NODE_ENV = 'development';

    const config = (await import('@plugins/logger')).default;

    expect(config.transport).toEqual({
      target: 'pino-pretty',
      options: {
        translateTime: 'yyyy-mm-dd HH:MM:ss',
        ignore: 'pid,hostname',
      },
    });
  });
});

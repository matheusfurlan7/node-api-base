import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('logger config', async () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('usa "info" como padrão para LOG_LEVEL', async () => {
    delete process.env.LOG_LEVEL;
    delete process.env.NODE_ENV;

    const config = (await import('@plugins/logger')).default;

    expect(config.level).toBe('info');
  });

  it('usa LOG_LEVEL definido no ambiente', async () => {
    process.env.LOG_LEVEL = 'debug';

    const config = (await import('@plugins/logger')).default;

    expect(config.level).toBe('debug');
  });

  it('transport deve ser undefined em produção', async () => {
    process.env.NODE_ENV = 'production';

    const config = (await import('@plugins/logger')).default;

    expect(config.transport).toBeUndefined();
  });

  it('transport deve conter pino-pretty fora de produção', async () => {
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

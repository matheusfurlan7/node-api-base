import { beforeAll, afterAll, it, expect } from 'vitest';

import APP from '@infra/http/app';
import { SwaggerPlugin } from '@plugins/swagger';

describe('SwaggerPlugin', () => {
  let app: APP;

  beforeAll(async () => {
    app = new APP({ plugins: [SwaggerPlugin] });

    await app.server.ready();
  });

  afterAll(async () => {
    await app.server.close();
  });

  it('should answer the swagger documentation', async () => {
    const res = await app.server.inject({
      method: 'GET',
      url: '/docs',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain('Swagger UI');
  });

  it('it must be the correct configure in OpenAPI', async () => {
    const res = await app.server.inject({
      method: 'GET',
      url: '/docs/json',
    });

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toContain('application/json');
    expect(res.body).toBeTruthy();

    const body = JSON.parse(res.body);

    expect(body).toHaveProperty('info');
    expect(body.info).toHaveProperty('title', 'node-api-base');
    expect(body.info).toHaveProperty('description', 'Basic API created in NodeJs with TypeScript');
  });
});

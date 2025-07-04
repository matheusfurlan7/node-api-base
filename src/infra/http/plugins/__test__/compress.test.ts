import { gunzipSync } from 'zlib';

import APP from '@infra/http/app';
import { compressPlugin } from '@plugins/compress';
import testCompressionRoutes from '@plugins/__test__/testCompressionRoutes.router';

describe('Compression', () => {
  let app: APP;

  beforeAll(async () => {
    app = new APP({
      plugins: [compressPlugin],
      routers: [testCompressionRoutes],
    });

    await app.server.ready();
  });

  afterAll(async () => {
    await app.server.close();
  });

  it('should return a compressed response with gzip encoding', async () => {
    const response = await app.server.inject({
      method: 'GET',
      url: '/test/compression',
      headers: {
        'Accept-Encoding': 'gzip',
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-encoding']).toBe('gzip');

    const decompressedBuffer = gunzipSync(response.rawPayload as Buffer);
    const decompressed = JSON.parse(decompressedBuffer.toString());

    expect(decompressed.data.length).toBe(5000);
    expect(decompressed.data.startsWith('x')).toBe(true);
  });
});

import compress from '@fastify/compress';
import { FastifyInstance } from 'fastify';

export async function compressPlugin(app: FastifyInstance) {
  await app.register(compress, {
    global: true,
    encodings: ['gzip', 'deflate'],
  });
}

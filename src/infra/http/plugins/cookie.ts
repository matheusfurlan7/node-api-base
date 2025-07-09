import { FastifyInstance } from 'fastify';
import cookie from '@fastify/cookie';
import type { FastifyCookieOptions } from '@fastify/cookie';

export async function cookiePlugin(app: FastifyInstance) {
  app.register(cookie, {
    secret: process.env.COOKIE_SECRET,
    hook: 'onRequest',
    parseOptions: {},
  } as FastifyCookieOptions);
}

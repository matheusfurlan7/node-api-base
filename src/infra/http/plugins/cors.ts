import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify';

let allowedOrigins: string[] = [];

const CorsOrigins = {
  get: () => allowedOrigins,
  set: (origins: string[]) => (allowedOrigins = origins),
};

export async function corsPlugin(app: FastifyInstance) {
  if (process.env.CORS_ORIGINS != undefined)
    CorsOrigins.set(process.env.CORS_ORIGINS?.split(',').map((origin) => origin.trim()));

  await app.register(cors, {
    origin:
      process.env.CORS_ORIGINS === '*'
        ? true
        : (origin, cb) => {
            const allowed = CorsOrigins.get();

            if (!!origin && allowed.includes(origin)) {
              return cb(null, true);
            }

            cb(new Error('Origin not allowed by CORS'), false);
          },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the HTTP methods you want
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers you want
    exposedHeaders: ['Content-Range'], // Headers than can be exposed to the client
    credentials: true, // If you want to allow cross-origin cookies
  });

  // app.addHook('preHandler', async (request, reply) => {
  //   const origin = request.headers.origin;

  //   if (!origin || !allowedOrigins.includes(origin)) {
  //     reply.status(500).send(new Error('Origin not allowed by CORS'));
  //   }
  // });
}

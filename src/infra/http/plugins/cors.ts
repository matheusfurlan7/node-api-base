import cors from '@fastify/cors';
import { FastifyInstance } from 'fastify';

export async function corsPlugin(app: FastifyInstance) {
  await app.register(cors, {
    origin: '*', // Allow all origens (can be changed as needed)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the HTTP methods you want
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers you want
    exposedHeaders: ['Content-Range'], // Headers than can be exposed to the client
    credentials: true, // If you want to allow cross-origin cookies
  });
}

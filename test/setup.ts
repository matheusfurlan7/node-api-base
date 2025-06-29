import app from '../src/infra/http/app';
import { beforeAll, afterAll } from 'vitest';

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

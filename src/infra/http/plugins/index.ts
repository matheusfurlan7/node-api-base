import { metricsPlugin } from '@plugins/metrics';
import { rateLimitPlugin } from '@plugins/rate-limit';
import { corsPlugin } from '@plugins/cors';
import { compressPlugin } from '@plugins/compress';
import { SwaggerPlugin } from '@plugins/swagger';
import { cookiePlugin } from '@src/infra/http/plugins/cookie';

export default [
  metricsPlugin,
  corsPlugin,
  rateLimitPlugin,
  compressPlugin,
  SwaggerPlugin,
  cookiePlugin,
];

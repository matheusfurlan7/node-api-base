import { metricsPlugin } from '@plugins/metrics';
import { rateLimitPlugin } from '@plugins/rate-limit';
import { corsPlugin } from '@plugins/cors';
import { compressPlugin } from '@plugins/compress';
import { SwaggerPlugin } from '@plugins/swagger';

export default [metricsPlugin, corsPlugin, rateLimitPlugin, compressPlugin, SwaggerPlugin];

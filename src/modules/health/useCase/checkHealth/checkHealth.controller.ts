import { CheckHealthResponse } from '@modules/health/useCase/checkHealth/checkHealth.schema';

export async function checkHealthController(): Promise<CheckHealthResponse> {
  return { status: 'ok', uptime: process.uptime() };
}

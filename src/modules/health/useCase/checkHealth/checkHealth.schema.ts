export interface CheckHealthResponse {
  status: string;
  uptime: number;
}

export const checkHealthSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        uptime: { type: 'number' },
      },
    },
  },
};

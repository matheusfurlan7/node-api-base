export interface RefreshResponse {
  accessToken: string;
}

export interface RefreshInformationToken {
  sub: string;
  email: string;
  role: string;
}

export const refreshSchema = {
  headers: {
    type: 'object',
    properties: {
      cookie: {
        type: 'string',
        description: 'Autentication Cookie, for example: refreshToken=abc123',
      },
    },
    required: ['cookie'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
      },
    },
    401: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          enum: ['Missing refresh token'],
        },
      },
      required: ['message'],
    },
    403: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          enum: ['Invalid or expired refresh token'],
        },
      },
      required: ['message'],
    },
  },
};

export interface LoginResponse {
  accessToken: string;
}

export interface LoginHeader {
  email: string;
  password: string;
}

export const loginSchema = {
  headers: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      headers: {
        'Set-Cookie': {
          description: 'Refresh token cookie',
          type: 'string',
          example: 'refreshToken=abc123; HttpOnly; Path=/auth/refresh; Max-Age=604800',
        },
      },
      properties: {
        accessToken: { type: 'string' },
      },
    },
    401: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          enum: ['Invalid credentials'],
        },
      },
      required: ['message'],
    },
  },
};

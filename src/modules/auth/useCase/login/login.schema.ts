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
      properties: {
        accessToken: { type: 'string' },
      },
    },
  },
};

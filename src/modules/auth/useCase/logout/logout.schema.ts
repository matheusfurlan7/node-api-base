export const logoutSchema = {
  headers: {
    type: 'object',
    properties: {
      cookie: {
        type: 'string',
        description: 'Autentication Cookie, for example: refreshToken=abc123',
      },
    },
    //required: ['cookie'],
  },
  response: {
    204: {
      type: 'object',
      properties: {},
    },
  },
};

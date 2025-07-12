import { describe, it, expect, vi } from 'vitest';
import { authorize } from '../authorize';
import { FastifyReply, FastifyRequest } from 'fastify';

describe('authorize middleware', () => {
  const createReply = () => {
    const reply: Partial<FastifyReply> = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };
    return reply as FastifyReply;
  };

  it('should allow request when user role is authorized', async () => {
    const req = {
      user: { role: 'admin' },
    } as unknown as FastifyRequest;
    const reply = createReply();

    const middleware = authorize(['admin', 'manager']);
    await middleware(req, reply);

    expect(reply.status).not.toHaveBeenCalled();
    expect(reply.send).not.toHaveBeenCalled();
  });

  it('should deny request when user role is not authorized', async () => {
    const req = {
      user: { role: 'user' },
    } as unknown as FastifyRequest;
    const reply = createReply();

    const middleware = authorize(['admin']);
    await middleware(req, reply);

    expect(reply.status).toHaveBeenCalledWith(403);
    expect(reply.send).toHaveBeenCalledWith({ message: 'Forbidden: insufficient role' });
  });

  it('should deny request when user is missing', async () => {
    const req = {} as FastifyRequest;
    const reply = createReply();

    const middleware = authorize(['admin']);
    await middleware(req, reply);

    expect(reply.status).toHaveBeenCalledWith(403);
    expect(reply.send).toHaveBeenCalledWith({ message: 'Forbidden: insufficient role' });
  });
});

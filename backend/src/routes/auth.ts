import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/user';
import { prisma } from '../lib/prisma';
import { authenticate } from '../utils/auth';

interface RegisterBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  company?: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface UpdateProfileBody {
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
}

export default async function authRoutes(fastify: FastifyInstance) {
  const userService = new UserService(prisma);

  fastify.post<{ Body: RegisterBody }>('/register', {
    schema: {
      body: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'password', 'phone'],
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
          phone: { type: 'string' },
          company: { type: 'string' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: RegisterBody }>, reply: FastifyReply) => {
    try {
      const result = await userService.register(request.body);
      reply.code(201).send(result);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });

  fastify.post<{ Body: LoginBody }>('/login', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) => {
    try {
      const { email, password } = request.body;
      const result = await userService.login(email, password);
      reply.send(result);
    } catch (error: any) {
      reply.code(401).send({ error: error.message });
    }
  });

  // Создание админа (только для разработки)
  if (process.env.NODE_ENV === 'development') {
    fastify.post<{ Body: RegisterBody }>('/create-admin', {
      schema: {
        body: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'password', 'phone'],
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
            phone: { type: 'string' }
          }
        }
      }
    }, async (request: FastifyRequest<{ Body: RegisterBody }>, reply: FastifyReply) => {
      try {
        const result = await userService.createAdmin(request.body);
        reply.code(201).send(result);
      } catch (error: any) {
        reply.code(400).send({ error: error.message });
      }
    });
  }

  fastify.get('/validate', {
    preHandler: [authenticate]
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = await userService.getUserById((request as any).user.id);
      reply.send(user);
    } catch (error: any) {
      reply.code(401).send({ error: error.message });
    }
  });

  // Profile endpoints
  fastify.get('/user/profile', {
    preHandler: [authenticate]
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = await userService.getUserById((request as any).user.id);
      reply.send(user);
    } catch (error: any) {
      reply.code(401).send({ error: error.message });
    }
  });

  fastify.put<{ Body: UpdateProfileBody }>('/user/profile', {
    preHandler: [authenticate],
    schema: {
      body: {
        type: 'object',
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          phone: { type: 'string' },
          company: { type: 'string' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: UpdateProfileBody }>, reply: FastifyReply) => {
    try {
      const userId = (request as any).user.id;
      const updatedUser = await userService.updateProfile(userId, request.body);
      reply.send(updatedUser);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });
} 
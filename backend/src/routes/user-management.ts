import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/user';
import { prisma } from '../lib/prisma';
import { authenticate, requireRole } from '../utils/auth';
import { UserRole } from '@prisma/client';

interface UpdateUserBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  role?: UserRole;
}

interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
}

interface UserManagementError extends Error {
  code?: string;
  statusCode?: number;
}

export default async function userManagementRoutes(fastify: FastifyInstance) {
  const userService = new UserService(prisma);

  // Get all users with pagination and filtering
  fastify.get<{ Querystring: QueryParams }>('/users', {
    preHandler: [authenticate, requireRole([UserRole.ADMIN])],
    schema: {
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'number', minimum: 1, default: 1 },
          limit: { type: 'number', minimum: 1, maximum: 100, default: 10 },
          search: { type: 'string' },
          role: { type: 'string', enum: Object.values(UserRole) }
        }
      }
    }
  }, async (request: FastifyRequest<{ Querystring: QueryParams }>, reply: FastifyReply) => {
    try {
      const { page = 1, limit = 10, search, role } = request.query;
      const result = await userService.getUsers({ page, limit, search, role });
      reply.send(result);
    } catch (error: unknown) {
      const userError = error as UserManagementError;
      reply.code(500).send({ error: userError.message || 'Failed to process user operation' });
    }
  });

  // Get user by ID
  fastify.get<{ Params: { id: string } }>('/users/:id', {
    preHandler: [authenticate, requireRole([UserRole.ADMIN])],
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const user = await userService.getUserById(request.params.id);
      reply.send(user);
    } catch (error: unknown) {
      const userError = error as UserManagementError;
      reply.code(500).send({ error: userError.message || 'Failed to process user operation' });
    }
  });

  // Update user
  fastify.put<{ Params: { id: string }, Body: UpdateUserBody }>('/users/:id', {
    preHandler: [authenticate, requireRole([UserRole.ADMIN])],
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          company: { type: 'string' },
          role: { type: 'string', enum: Object.values(UserRole) }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: { id: string }, Body: UpdateUserBody }>, reply: FastifyReply) => {
    try {
      const currentUserId = (request as any).user.id;
      
      // Проверяем, не пытается ли админ изменить свою роль
      if (request.params.id === currentUserId && request.body.role) {
        reply.code(403).send({ error: 'Нельзя изменить свою роль' });
        return;
      }

      const updatedUser = await userService.updateUser(request.params.id, request.body);
      reply.send(updatedUser);
    } catch (error: unknown) {
      const userError = error as UserManagementError;
      reply.code(500).send({ error: userError.message || 'Failed to process user operation' });
    }
  });

  // Delete user
  fastify.delete<{ Params: { id: string } }>('/users/:id', {
    preHandler: [authenticate, requireRole([UserRole.ADMIN])],
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const currentUserId = (request as any).user.id;
      
      // Проверяем, не пытается ли админ удалить свой аккаунт
      if (request.params.id === currentUserId) {
        reply.code(403).send({ error: 'Нельзя удалить свой аккаунт' });
        return;
      }

      await userService.deleteUser(request.params.id);
      reply.code(204).send();
    } catch (error: unknown) {
      const userError = error as UserManagementError;
      reply.code(500).send({ error: userError.message || 'Failed to process user operation' });
    }
  });
} 
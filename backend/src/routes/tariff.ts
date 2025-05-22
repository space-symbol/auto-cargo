import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { TariffService } from '../services/tariff';
import { verifyToken, JwtPayload } from '../utils/auth';
import { prisma } from '../lib/prisma';

interface AuthenticatedRequest extends FastifyRequest {
  user: JwtPayload;
}

interface CreateTariffBody {
  name: string;
  baseRate: number;
  weightRate: number;
  volumeRate: number;
  distanceRate: number;
}

interface UpdateTariffBody {
  name?: string;
  baseRate?: number;
  weightRate?: number;
  volumeRate?: number;
  distanceRate?: number;
  isActive?: boolean;
}

export default async function tariffRoutes(fastify: FastifyInstance) {
  const tariffService = new TariffService(prisma);

  // Middleware для проверки авторизации
  const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = request.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new Error('No token provided');
      }
      const decoded = await verifyToken(token);
      (request as AuthenticatedRequest).user = decoded;
    } catch (error) {
      reply.code(401).send({ error: 'Unauthorized' });
    }
  };

  // Middleware для проверки прав администратора
  const adminMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    const user = (request as AuthenticatedRequest).user;
    if (user.role !== 'ADMIN') {
      reply.code(403).send({ error: 'Access denied' });
    }
  };

  // Создание тарифа (только для админов)
  fastify.post<{ Body: CreateTariffBody }>('/tariffs', {
    preHandler: [authMiddleware, adminMiddleware],
    schema: {
      body: {
        type: 'object',
        required: ['name', 'baseRate', 'weightRate', 'volumeRate', 'distanceRate'],
        properties: {
          name: { type: 'string' },
          baseRate: { type: 'number', minimum: 0 },
          weightRate: { type: 'number', minimum: 0 },
          volumeRate: { type: 'number', minimum: 0 },
          distanceRate: { type: 'number', minimum: 0 }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: CreateTariffBody }>, reply: FastifyReply) => {
    try {
      const tariff = await tariffService.createTariff(request.body);
      reply.code(201).send(tariff);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });

  // Обновление тарифа (только для админов)
  fastify.patch<{ 
    Params: { id: string };
    Body: UpdateTariffBody;
  }>('/tariffs/:id', {
    preHandler: [authMiddleware, adminMiddleware],
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          baseRate: { type: 'number', minimum: 0 },
          weightRate: { type: 'number', minimum: 0 },
          volumeRate: { type: 'number', minimum: 0 },
          distanceRate: { type: 'number', minimum: 0 },
          isActive: { type: 'boolean' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: { id: string }; Body: UpdateTariffBody }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;
      const tariff = await tariffService.updateTariff(id, request.body);
      reply.send(tariff);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });

  // Получение активного тарифа
  fastify.get('/tariffs/active', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const tariff = await tariffService.getActiveTariff();
      if (!tariff) {
        reply.code(404).send({ error: 'No active tariff found' });
        return;
      }
      reply.send(tariff);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });

  // Получение всех тарифов (только для админов)
  fastify.get('/tariffs', {
    preHandler: [authMiddleware, adminMiddleware]
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const tariffs = await tariffService.getAllTariffs();
      reply.send(tariffs);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });
} 
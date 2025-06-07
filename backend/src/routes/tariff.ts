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
  vehicleTypeIds: string[];
  cargoTypeIds: string[];
}

interface UpdateTariffBody {
  name?: string;
  baseRate?: number;
  weightRate?: number;
  volumeRate?: number;
  distanceRate?: number;
  isActive?: boolean;
  vehicleTypeIds?: string[];
  cargoTypeIds?: string[];
}

interface TariffError extends Error {
  code?: string;
  statusCode?: number;
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
    } catch {
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
        required: ['name', 'baseRate', 'weightRate', 'volumeRate', 'distanceRate', 'vehicleTypeIds'],
        properties: {
          name: { type: 'string' },
          baseRate: { type: 'number', minimum: 0 },
          weightRate: { type: 'number', minimum: 0 },
          volumeRate: { type: 'number', minimum: 0 },
          distanceRate: { type: 'number', minimum: 0 },
          vehicleTypeIds: { 
            type: 'array',
            items: { type: 'string' },
            minItems: 1
          },
          cargoTypeIds: { 
            type: 'array',
            items: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: CreateTariffBody }>, reply: FastifyReply) => {
    try {
      const tariff = await tariffService.createTariff(request.body);
      reply.code(201).send(tariff);
    } catch (error: unknown) {
      const tariffError = error as TariffError;
      reply.code(500).send({ error: tariffError.message || 'Failed to process tariff operation' });
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
          isActive: { type: 'boolean' },
          vehicleTypeIds: { 
            type: 'array',
            items: { type: 'string' },
            minItems: 1
          },
          cargoTypeIds: { 
            type: 'array',
            items: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: { id: string }; Body: UpdateTariffBody }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;
      const tariff = await tariffService.updateTariff(id, request.body);
      reply.send(tariff);
    } catch (error: unknown) {
      const tariffError = error as TariffError;
      reply.code(500).send({ error: tariffError.message || 'Failed to process tariff operation' });
    }
  });

  // Получение активного тарифа
  fastify.get<{
    Querystring: { vehicleTypeId?: string; cargoTypeId?: string }
  }>('/tariffs/active', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          vehicleTypeId: { type: 'string' },
          cargoTypeId: { type: 'string' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Querystring: { vehicleTypeId?: string; cargoTypeId?: string } }>, reply: FastifyReply) => {
    try {
      const { vehicleTypeId, cargoTypeId } = request.query;
      const tariff = await tariffService.getActiveTariff(vehicleTypeId, cargoTypeId);
      if (!tariff) {
        reply.code(404).send({ error: 'No active tariff found' });
        return;
      }
      reply.send(tariff);
    } catch (error: unknown) {
      const tariffError = error as TariffError;
      reply.code(500).send({ error: tariffError.message || 'Failed to process tariff operation' });
    }
  });

  // Получение всех тарифов (только для админов)
  fastify.get<{
    Querystring: { page?: string; limit?: string }
  }>('/tariffs', {
    preHandler: [authMiddleware, adminMiddleware],
    schema: {
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'string', pattern: '^[1-9]\\d*$' },
          limit: { type: 'string', pattern: '^[1-9]\\d*$' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Querystring: { page?: string; limit?: string } }>, reply: FastifyReply) => {
    try {
      const page = request.query.page ? parseInt(request.query.page) : 1;
      const limit = request.query.limit ? parseInt(request.query.limit) : 10;
      const result = await tariffService.getAllTariffs(page, limit);
      reply.send(result);
    } catch (error: unknown) {
      const tariffError = error as TariffError;
      reply.code(500).send({ error: tariffError.message || 'Failed to process tariff operation' });
    }
  });

  // Создание тестового тарифа (только для админов)
  fastify.post('/tariffs/default', {
    preHandler: [authMiddleware, adminMiddleware],
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Получаем первый тип транспорта и груза
      const [vehicleType, cargoType] = await Promise.all([
        prisma.vehicleType.findFirst(),
        prisma.cargoType.findFirst()
      ]);

      if (!vehicleType || !cargoType) {
        reply.code(400).send({ error: 'Не найдены типы транспорта или груза' });
        return;
      }

      // Создаем базовый тариф
      const tariff = await tariffService.createTariff({
        name: `Базовый тариф для ${vehicleType.name} и ${cargoType.name}`,
        baseRate: 1000, // Базовая ставка
        weightRate: 10, // Ставка за кг
        volumeRate: 100, // Ставка за м³
        distanceRate: 20, // Ставка за км
        vehicleTypeIds: [vehicleType.id],
        cargoTypeIds: [cargoType.id]
      });

      reply.code(201).send(tariff);
    } catch (error: unknown) {
      const tariffError = error as TariffError;
      reply.code(500).send({ error: tariffError.message || 'Failed to process tariff operation' });
    }
  });

  // Удаление тарифа (только для админов)
  fastify.delete<{ Params: { id: string } }>('/tariffs/:id', {
    preHandler: [authMiddleware, adminMiddleware],
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
      await tariffService.deleteTariff(request.params.id);
      reply.code(204).send();
    } catch (error: unknown) {
      const tariffError = error as TariffError;
      if (tariffError.code === 'P2025') {
        reply.code(404).send({ error: 'Тариф не найден' });
        return;
      }
      reply.code(500).send({ error: tariffError.message || 'Failed to process tariff operation' });
    }
  });
} 
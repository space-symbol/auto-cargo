import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { CargoRequestStatus, UserRole } from '../generated/prisma';
import { CargoService } from '../services/cargo';
import { TariffService } from '../services/tariff';
import { ReferenceService } from '../services/reference';
import { authenticate, requireRole, JwtPayload } from '../utils/auth';
import { prisma } from '../lib/prisma';

interface RequestBody {
  cargoTypeId: string;
  vehicleTypeId: string;
  weight: number;
  volume: number;
  distance?: number;
  fromAddress: {
    city: string;
    street: string;
    building: string;
    country: string;
  };
  toAddress: {
    city: string;
    street: string;
    building: string;
    country: string;
  };
  transportationDate: string;
  transportationTime: string;
}

interface StatusUpdateBody {
  status: CargoRequestStatus;
  comment?: string;
}

interface RequestParams {
  id: string;
}

interface AuthenticatedRequest extends FastifyRequest {
  user: JwtPayload;
}

export default async function cargoRoutes(fastify: FastifyInstance) {
  const tariffService = new TariffService(prisma);
  const referenceService = new ReferenceService(prisma);
  const cargoService = new CargoService(prisma, tariffService, referenceService);

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

  // Расчет стоимости (доступен без авторизации)
  fastify.post<{ Body: RequestBody }>('/calculate-cost', {
    schema: {
      body: {
        type: 'object',
        required: [
          'cargoTypeId',
          'vehicleTypeId',
          'weight',
          'volume',
          'fromAddress',
          'toAddress',
          'transportationDate',
          'transportationTime'
        ],
        properties: {
          cargoTypeId: { type: 'string' },
          vehicleTypeId: { type: 'string' },
          weight: { type: 'number' },
          volume: { type: 'number' },
          distance: { type: 'number' },
          fromAddress: {
            type: 'object',
            required: ['city', 'street', 'building', 'country'],
            properties: {
              city: { type: 'string' },
              street: { type: 'string' },
              building: { type: 'string' },
              country: { type: 'string' }
            }
          },
          toAddress: {
            type: 'object',
            required: ['city', 'street', 'building', 'country'],
            properties: {
              city: { type: 'string' },
              street: { type: 'string' },
              building: { type: 'string' },
              country: { type: 'string' }
            }
          },
          transportationDate: { type: 'string', format: 'date' },
          transportationTime: { type: 'string', pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply) => {
    try {
      const costCalculation = await cargoService.calculateCost(request.body);
      reply.send(costCalculation);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });

  // Создание заявки (требуется авторизация)
  fastify.post<{ Body: RequestBody }>('/requests', {
    preHandler: [authenticate],
    schema: {
      body: {
        type: 'object',
        required: [
          'cargoTypeId',
          'vehicleTypeId',
          'weight',
          'volume',
          'fromAddress',
          'toAddress',
          'transportationDate',
          'transportationTime'
        ],
        properties: {
          cargoTypeId: { type: 'string' },
          vehicleTypeId: { type: 'string' },
          weight: { type: 'number' },
          volume: { type: 'number' },
          distance: { type: 'number' },
          fromAddress: {
            type: 'object',
            required: ['city', 'street', 'building', 'country'],
            properties: {
              city: { type: 'string' },
              street: { type: 'string' },
              building: { type: 'string' },
              country: { type: 'string' }
            }
          },
          toAddress: {
            type: 'object',
            required: ['city', 'street', 'building', 'country'],
            properties: {
              city: { type: 'string' },
              street: { type: 'string' },
              building: { type: 'string' },
              country: { type: 'string' }
            }
          },
          transportationDate: { type: 'string', format: 'date' },
          transportationTime: { type: 'string', pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply) => {
    try {
      const user = (request as any).user;
      const requestData = {
        ...request.body,
        userId: user.id
      };
      const result = await cargoService.createRequest(requestData);
      reply.code(201).send(result);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });

  // Получение заявок пользователя
  fastify.get<{
    Querystring: { 
      page?: number; 
      pageSize?: number;
      status?: CargoRequestStatus;
      sortBy?: 'date' | 'cost';
      sortOrder?: 'asc' | 'desc';
    }
  }>('/user/requests', {
    preHandler: [authenticate],
    schema: {
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'number', default: 1 },
          pageSize: { type: 'number', default: 10 },
          status: { type: 'string', enum: Object.values(CargoRequestStatus) },
          sortBy: { type: 'string', enum: ['date', 'cost'] },
          sortOrder: { type: 'string', enum: ['asc', 'desc'] }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const user = (request as any).user;
      const { page, pageSize, status, sortBy, sortOrder } = request.query;
      const requests = await cargoService.getUserRequests(user.email, {
        page,
        pageSize,
        status,
        sortBy,
        sortOrder
      });
      reply.send(requests);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });

  // Получение всех заявок (для админов и менеджеров)
  fastify.get('/admin/requests', {
    preHandler: [authenticate, requireRole([UserRole.ADMIN, UserRole.MANAGER])],
    schema: {
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'number', default: 1 },
          pageSize: { type: 'number', default: 10 },
          status: { type: 'string', enum: Object.values(CargoRequestStatus) },
          sortBy: { type: 'string', enum: ['date', 'cost'] },
          sortOrder: { type: 'string', enum: ['asc', 'desc'] }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { page, pageSize, status, sortBy, sortOrder } = request.query;
      const requests = await cargoService.getAllRequests({
        page,
        pageSize,
        status,
        sortBy,
        sortOrder
      });
      reply.send(requests);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });

  // Получение заявки по ID
  fastify.get<{ Params: RequestParams }>('/requests/:id', {
    preHandler: [authenticate],
    schema: {
      querystring: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: RequestParams }>, reply: FastifyReply) => {
    try {
      const user = (request as any).user;
      const { id } = request.params;
      const cargoRequest = await cargoService.getRequestById(id);
      
      if (!cargoRequest) {
        reply.code(404).send({ error: 'Request not found' });
        return;
      }

      // Проверяем доступ
      if (cargoRequest.userId !== user.id && 
          user.role !== UserRole.ADMIN && 
          user.role !== UserRole.MANAGER) {
        reply.code(403).send({ error: 'Access denied' });
        return;
      }

      reply.send(cargoRequest);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });

  // Обновление статуса заявки (для админов и менеджеров)
  fastify.patch<{ 
    Params: RequestParams;
    Body: StatusUpdateBody;
  }>('/admin/requests/:id/status', {
    preHandler: [authenticate, requireRole([UserRole.ADMIN, UserRole.MANAGER])],
    schema: {
      body: {
        type: 'object',
        required: ['status'],
        properties: {
          status: { type: 'string', enum: Object.values(CargoRequestStatus) },
          comment: { type: 'string' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: RequestParams; Body: StatusUpdateBody }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;
      const { status, comment } = request.body;
      const result = await cargoService.updateRequestStatus(id, status, comment);
      reply.send(result);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });

  // Получение статистики (только для админов)
  fastify.get('/admin/statistics', {
    preHandler: [authenticate, requireRole([UserRole.ADMIN])],
    schema: {
      querystring: {
        type: 'object',
        properties: {
          startDate: { type: 'string', format: 'date' },
          endDate: { type: 'string', format: 'date' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { startDate, endDate } = request.query;
      const statistics = await cargoService.getStatistics(startDate, endDate);
      reply.send(statistics);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });

  // Отмена заявки
  fastify.post<{ Params: RequestParams }>('/requests/:id/cancel', {
    preHandler: [authenticate],
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: RequestParams }>, reply: FastifyReply) => {
    try {
      const user = (request as any).user;
      const { id } = request.params;
      
      const result = await cargoService.updateRequestStatus(
        id,
        CargoRequestStatus.CANCELLED,
        'Request cancelled by user'
      );
      
      reply.send(result);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });
} 
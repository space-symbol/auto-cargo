import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { CargoRequestStatus } from '../generated/prisma';
import { CargoService } from '../services/cargo';
import { TariffService } from '../services/tariff';
import { verifyToken, JwtPayload } from '../utils/auth';
import { prisma } from '../lib/prisma';

interface RequestBody {
  cargoType: number;
  weight: number;
  volume: number;
  from: string;
  to: string;
  distance: number;
  vehicleType: number;
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
  const cargoService = new CargoService(prisma, tariffService);

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
        required: ['cargoType', 'weight', 'volume', 'from', 'to', 'distance', 'vehicleType'],
        properties: {
          cargoType: { type: 'number' },
          weight: { type: 'number' },
          volume: { type: 'number' },
          from: { type: 'string' },
          to: { type: 'string' },
          distance: { type: 'number' },
          vehicleType: { type: 'number' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply) => {
    try {
      const result = await cargoService.calculateCost(request.body);
      reply.send(result);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });

  // Создание заявки (требуется авторизация)
  fastify.post<{ Body: RequestBody }>('/requests', {
    preHandler: authMiddleware,
    schema: {
      body: {
        type: 'object',
        required: ['cargoType', 'weight', 'volume', 'from', 'to', 'distance', 'vehicleType', 'firstName', 'lastName', 'email', 'phone'],
        properties: {
          cargoType: { type: 'number' },
          weight: { type: 'number' },
          volume: { type: 'number' },
          from: { type: 'string' },
          to: { type: 'string' },
          distance: { type: 'number' },
          vehicleType: { type: 'number' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string' },
          userId: { type: 'string' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply) => {
    try {
      const user = (request as AuthenticatedRequest).user;
      const requestData = {
        ...request.body,
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      };
      const result = await cargoService.createRequest(requestData);
      reply.code(201).send(result);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });

  fastify.get<{
    Querystring: { page?: number; pageSize?: number }
  }>('/user/requests', {
    preHandler: authMiddleware,
    schema: {
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'number', default: 1 },
          pageSize: { type: 'number', default: 10 }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const user = (request as AuthenticatedRequest).user;
      const { page = 1, pageSize = 10 } = request.query;
      const requests = await cargoService.getUserRequests(user.email, page, pageSize);
      reply.send(requests);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });

  // Получение всех заявок (для админов)
  fastify.get('/admin/requests', {
    preHandler: authMiddleware
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = (request as AuthenticatedRequest).user;
      if (user.role !== 'ADMIN') {
        throw new Error('Access denied');
      }
      const requests = await cargoService.getAllRequests();
      reply.send(requests);
    } catch (error: any) {
      reply.code(403).send({ error: error.message });
    }
  });

  // Получение заявки по ID
  fastify.get<{ Params: RequestParams }>('/requests/:id', {
    preHandler: authMiddleware
  }, async (request: FastifyRequest<{ Params: RequestParams }>, reply: FastifyReply) => {
    try {
      const user = (request as AuthenticatedRequest).user;
      const { id } = request.params;
      const cargoRequest = await cargoService.getRequestById(id);
      
      if (!cargoRequest) {
        reply.code(404).send({ error: 'Request not found' });
        return;
      }

      // Проверяем доступ
      if (cargoRequest.userId !== user.id && user.role !== 'ADMIN') {
        reply.code(403).send({ error: 'Access denied' });
        return;
      }

      reply.send(cargoRequest);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });

  // Обновление статуса заявки (для админов)
  fastify.patch<{ 
    Params: RequestParams;
    Body: StatusUpdateBody;
  }>('/admin/requests/:id/status', {
    preHandler: authMiddleware,
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
      const user = (request as AuthenticatedRequest).user;
      if (user.role !== 'ADMIN') {
        throw new Error('Access denied');
      }

      const { id } = request.params;
      const { status, comment } = request.body;

      const updatedRequest = await cargoService.updateRequestStatus(id, status, comment);
      reply.send(updatedRequest);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  });
} 
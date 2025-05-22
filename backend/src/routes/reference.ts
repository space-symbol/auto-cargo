import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import { ReferenceService } from '../services/reference';
import { prisma } from '../lib/prisma';

export async function referenceRoutes(fastify: FastifyInstance) {
  const referenceService = new ReferenceService(prisma);

  // Получение типов транспортных средств
  fastify.get('/vehicle-types', {
    schema: {
      response: {
        200: Type.Array(Type.Object({
          id: Type.String(),
          name: Type.String(),
          maxWeight: Type.Number(),
          maxVolume: Type.Number()
        }))
      }
    }
  }, async () => {
    return referenceService.getVehicleTypes();
  });

  // Получение типов грузов
  fastify.get('/cargo-types', {
    schema: {
      response: {
        200: Type.Array(Type.Object({
          id: Type.String(),
          name: Type.String(),
          description: Type.String()
        }))
      }
    }
  }, async () => {
    return referenceService.getCargoTypes();
  });
} 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tariffRoutes;
const tariff_1 = require("../services/tariff");
const auth_1 = require("../utils/auth");
const prisma_1 = require("../lib/prisma");
async function tariffRoutes(fastify) {
    const tariffService = new tariff_1.TariffService(prisma_1.prisma);
    // Middleware для проверки авторизации
    const authMiddleware = async (request, reply) => {
        try {
            const token = request.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new Error('No token provided');
            }
            const decoded = await (0, auth_1.verifyToken)(token);
            request.user = decoded;
        }
        catch (error) {
            reply.code(401).send({ error: 'Unauthorized' });
        }
    };
    // Middleware для проверки прав администратора
    const adminMiddleware = async (request, reply) => {
        const user = request.user;
        if (user.role !== 'ADMIN') {
            reply.code(403).send({ error: 'Access denied' });
        }
    };
    // Создание тарифа (только для админов)
    fastify.post('/tariffs', {
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
    }, async (request, reply) => {
        try {
            const tariff = await tariffService.createTariff(request.body);
            reply.code(201).send(tariff);
        }
        catch (error) {
            const tariffError = error;
            reply.code(500).send({ error: tariffError.message || 'Failed to process tariff operation' });
        }
    });
    // Обновление тарифа (только для админов)
    fastify.patch('/tariffs/:id', {
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
    }, async (request, reply) => {
        try {
            const { id } = request.params;
            const tariff = await tariffService.updateTariff(id, request.body);
            reply.send(tariff);
        }
        catch (error) {
            const tariffError = error;
            reply.code(500).send({ error: tariffError.message || 'Failed to process tariff operation' });
        }
    });
    // Получение активного тарифа
    fastify.get('/tariffs/active', {
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    vehicleTypeId: { type: 'string' },
                    cargoTypeId: { type: 'string' }
                }
            }
        }
    }, async (request, reply) => {
        try {
            const { vehicleTypeId, cargoTypeId } = request.query;
            const tariff = await tariffService.getActiveTariff(vehicleTypeId, cargoTypeId);
            if (!tariff) {
                reply.code(404).send({ error: 'No active tariff found' });
                return;
            }
            reply.send(tariff);
        }
        catch (error) {
            const tariffError = error;
            reply.code(500).send({ error: tariffError.message || 'Failed to process tariff operation' });
        }
    });
    // Получение всех тарифов (только для админов)
    fastify.get('/tariffs', {
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
    }, async (request, reply) => {
        try {
            const page = request.query.page ? parseInt(request.query.page) : 1;
            const limit = request.query.limit ? parseInt(request.query.limit) : 10;
            const result = await tariffService.getAllTariffs(page, limit);
            reply.send(result);
        }
        catch (error) {
            const tariffError = error;
            reply.code(500).send({ error: tariffError.message || 'Failed to process tariff operation' });
        }
    });
    // Создание тестового тарифа (только для админов)
    fastify.post('/tariffs/default', {
        preHandler: [authMiddleware, adminMiddleware],
    }, async (request, reply) => {
        try {
            // Получаем первый тип транспорта и груза
            const [vehicleType, cargoType] = await Promise.all([
                prisma_1.prisma.vehicleType.findFirst(),
                prisma_1.prisma.cargoType.findFirst()
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
        }
        catch (error) {
            const tariffError = error;
            reply.code(500).send({ error: tariffError.message || 'Failed to process tariff operation' });
        }
    });
    // Удаление тарифа (только для админов)
    fastify.delete('/tariffs/:id', {
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
    }, async (request, reply) => {
        try {
            await tariffService.deleteTariff(request.params.id);
            reply.code(204).send();
        }
        catch (error) {
            const tariffError = error;
            if (tariffError.code === 'P2025') {
                reply.code(404).send({ error: 'Тариф не найден' });
                return;
            }
            reply.code(500).send({ error: tariffError.message || 'Failed to process tariff operation' });
        }
    });
}

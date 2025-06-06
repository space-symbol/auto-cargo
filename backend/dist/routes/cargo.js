"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = cargoRoutes;
const client_1 = require("@prisma/client");
const cargo_1 = require("../services/cargo");
const tariff_1 = require("../services/tariff");
const reference_1 = require("../services/reference");
const auth_1 = require("../utils/auth");
const prisma_1 = require("../lib/prisma");
async function cargoRoutes(fastify) {
    const tariffService = new tariff_1.TariffService(prisma_1.prisma);
    const referenceService = new reference_1.ReferenceService(prisma_1.prisma);
    const cargoService = new cargo_1.CargoService(prisma_1.prisma, tariffService, referenceService);
    // Расчет стоимости (доступен без авторизации)
    fastify.post('/calculate-cost', {
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
    }, async (request, reply) => {
        try {
            const costCalculation = await cargoService.calculateCost(request.body);
            reply.send(costCalculation);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            reply.code(400).send({ error: errorMessage });
        }
    });
    // Создание заявки (требуется авторизация)
    fastify.post('/requests', {
        preHandler: [auth_1.authenticate],
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
    }, async (request, reply) => {
        try {
            const user = request.user;
            const requestData = {
                ...request.body,
                userId: user.id
            };
            const result = await cargoService.createRequest(requestData);
            reply.code(201).send(result);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            reply.code(400).send({ error: errorMessage });
        }
    });
    // Получение заявок пользователя
    fastify.get('/user/requests', {
        preHandler: [auth_1.authenticate],
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    page: { type: 'number', default: 1 },
                    pageSize: { type: 'number', default: 10 },
                    status: { type: 'string', enum: Object.values(client_1.CargoRequestStatus) },
                    sortBy: { type: 'string', enum: ['date', 'cost'] },
                    sortOrder: { type: 'string', enum: ['asc', 'desc'] }
                }
            }
        }
    }, async (request, reply) => {
        try {
            const user = request.user;
            const { page, pageSize, status, sortBy, sortOrder } = request.query;
            const requests = await cargoService.getUserRequests(user.email, {
                page,
                pageSize,
                status,
                sortBy,
                sortOrder
            });
            reply.send(requests);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            reply.code(400).send({ error: errorMessage });
        }
    });
    // Получение всех заявок (для админов и менеджеров)
    fastify.get('/admin/requests', {
        preHandler: [auth_1.authenticate, (0, auth_1.requireRole)([client_1.UserRole.ADMIN, client_1.UserRole.MANAGER])],
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    page: { type: 'number', default: 1 },
                    pageSize: { type: 'number', default: 10 },
                    status: { type: 'string', enum: Object.values(client_1.CargoRequestStatus) },
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
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            reply.code(400).send({ error: errorMessage });
        }
    });
    // Получение заявки по ID
    fastify.get('/requests/:id', {
        preHandler: [auth_1.authenticate],
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
            const user = request.user;
            const { id } = request.params;
            const cargoRequest = await cargoService.getRequestById(id);
            if (!cargoRequest) {
                reply.code(404).send({ error: 'Request not found' });
                return;
            }
            // Проверяем доступ
            if (cargoRequest.userId !== user.id &&
                user.role !== client_1.UserRole.ADMIN &&
                user.role !== client_1.UserRole.MANAGER) {
                reply.code(403).send({ error: 'Access denied' });
                return;
            }
            reply.send(cargoRequest);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            reply.code(400).send({ error: errorMessage });
        }
    });
    // Обновление статуса заявки (для админов и менеджеров)
    fastify.patch('/admin/requests/:id/status', {
        preHandler: [auth_1.authenticate, (0, auth_1.requireRole)([client_1.UserRole.ADMIN, client_1.UserRole.MANAGER])],
        schema: {
            body: {
                type: 'object',
                required: ['status'],
                properties: {
                    status: { type: 'string', enum: Object.values(client_1.CargoRequestStatus) },
                    comment: { type: 'string' }
                }
            }
        }
    }, async (request, reply) => {
        try {
            const { id } = request.params;
            const { status, comment } = request.body;
            const result = await cargoService.updateRequestStatus(id, status, comment);
            reply.send(result);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            reply.code(400).send({ error: errorMessage });
        }
    });
    // Получение статистики (только для админов)
    fastify.get('/admin/statistics', {
        preHandler: [auth_1.authenticate, (0, auth_1.requireRole)([client_1.UserRole.ADMIN])],
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
            const statistics = await cargoService.getStatistics({ startDate, endDate });
            reply.send(statistics);
        }
        catch (error) {
            reply.code(400).send({ error: error.message });
        }
    });
    // Отмена заявки
    fastify.post('/requests/:id/cancel', {
        preHandler: [auth_1.authenticate],
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
            const { id } = request.params;
            const result = await cargoService.updateRequestStatus(id, client_1.CargoRequestStatus.CANCELLED, 'Request cancelled by user');
            reply.send(result);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            reply.code(400).send({ error: errorMessage });
        }
    });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userManagementRoutes;
const user_1 = require("../services/user");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../utils/auth");
const client_1 = require("@prisma/client");
async function userManagementRoutes(fastify) {
    const userService = new user_1.UserService(prisma_1.prisma);
    // Get all users with pagination and filtering
    fastify.get('/users', {
        preHandler: [auth_1.authenticate, (0, auth_1.requireRole)([client_1.UserRole.ADMIN])],
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    page: { type: 'number', minimum: 1, default: 1 },
                    limit: { type: 'number', minimum: 1, maximum: 100, default: 10 },
                    search: { type: 'string' },
                    role: { type: 'string', enum: Object.values(client_1.UserRole) }
                }
            }
        }
    }, async (request, reply) => {
        try {
            const { page = 1, limit = 10, search, role } = request.query;
            const result = await userService.getUsers({ page, limit, search, role });
            reply.send(result);
        }
        catch (error) {
            const userError = error;
            reply.code(500).send({ error: userError.message || 'Failed to process user operation' });
        }
    });
    // Get user by ID
    fastify.get('/users/:id', {
        preHandler: [auth_1.authenticate, (0, auth_1.requireRole)([client_1.UserRole.ADMIN])],
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
            const user = await userService.getUserById(request.params.id);
            reply.send(user);
        }
        catch (error) {
            const userError = error;
            reply.code(500).send({ error: userError.message || 'Failed to process user operation' });
        }
    });
    // Update user
    fastify.put('/users/:id', {
        preHandler: [auth_1.authenticate, (0, auth_1.requireRole)([client_1.UserRole.ADMIN])],
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
                    role: { type: 'string', enum: Object.values(client_1.UserRole) }
                }
            }
        }
    }, async (request, reply) => {
        try {
            const currentUserId = request.user.id;
            // Проверяем, не пытается ли админ изменить свою роль
            if (request.params.id === currentUserId && request.body.role) {
                reply.code(403).send({ error: 'Нельзя изменить свою роль' });
                return;
            }
            const updatedUser = await userService.updateUser(request.params.id, request.body);
            reply.send(updatedUser);
        }
        catch (error) {
            const userError = error;
            reply.code(500).send({ error: userError.message || 'Failed to process user operation' });
        }
    });
    // Delete user
    fastify.delete('/users/:id', {
        preHandler: [auth_1.authenticate, (0, auth_1.requireRole)([client_1.UserRole.ADMIN])],
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
            const currentUserId = request.user.id;
            // Проверяем, не пытается ли админ удалить свой аккаунт
            if (request.params.id === currentUserId) {
                reply.code(403).send({ error: 'Нельзя удалить свой аккаунт' });
                return;
            }
            await userService.deleteUser(request.params.id);
            reply.code(204).send();
        }
        catch (error) {
            const userError = error;
            reply.code(500).send({ error: userError.message || 'Failed to process user operation' });
        }
    });
}

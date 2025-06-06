"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authRoutes;
const user_1 = require("../services/user");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../utils/auth");
async function authRoutes(fastify) {
    const userService = new user_1.UserService(prisma_1.prisma);
    fastify.post('/register', {
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
    }, async (request, reply) => {
        try {
            const result = await userService.register(request.body);
            reply.code(201).send(result);
        }
        catch (error) {
            const authError = error;
            if (authError.code === 'P2002') {
                return reply.code(400).send({ error: 'Email already exists' });
            }
            throw error;
        }
    });
    fastify.post('/login', {
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
    }, async (request, reply) => {
        try {
            const { email, password } = request.body;
            const result = await userService.login(email, password);
            reply.send(result);
        }
        catch (error) {
            reply.code(401).send({ error: error.message });
        }
    });
    // Создание админа (только для разработки)
    if (process.env.NODE_ENV === 'development') {
        fastify.post('/create-admin', {
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
        }, async (request, reply) => {
            try {
                const result = await userService.createAdmin(request.body);
                reply.code(201).send(result);
            }
            catch (error) {
                reply.code(400).send({ error: error.message });
            }
        });
    }
    fastify.get('/validate', {
        preHandler: [auth_1.authenticate]
    }, async (request, reply) => {
        try {
            const user = await userService.getUserById(request.user.id);
            reply.send(user);
        }
        catch (error) {
            reply.code(401).send({ error: error.message });
        }
    });
    // Profile endpoints
    fastify.get('/user/profile', {
        preHandler: [auth_1.authenticate]
    }, async (request, reply) => {
        try {
            const user = await userService.getUserById(request.user.id);
            reply.send(user);
        }
        catch (error) {
            reply.code(401).send({ error: error.message });
        }
    });
    fastify.put('/user/profile', {
        preHandler: [auth_1.authenticate],
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
    }, async (request, reply) => {
        try {
            const userId = request.user.id;
            const updatedUser = await userService.updateProfile(userId, request.body);
            reply.send(updatedUser);
        }
        catch (error) {
            reply.code(400).send({ error: error.message });
        }
    });
}

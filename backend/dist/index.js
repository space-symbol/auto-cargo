"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const auth_1 = __importDefault(require("./routes/auth"));
const cargo_1 = __importDefault(require("./routes/cargo"));
const tariff_1 = __importDefault(require("./routes/tariff"));
const reference_1 = require("./routes/reference");
const reports_1 = __importDefault(require("./routes/reports"));
const user_management_1 = __importDefault(require("./routes/user-management"));
async function buildApp() {
    const app = (0, fastify_1.default)({
        logger: true
    });
    const prisma = new client_1.PrismaClient();
    // Регистрируем плагины
    await app.register(cors_1.default, {
        origin: true
    });
    await app.register(swagger_1.default, {
        openapi: {
            info: {
                title: 'Transvestor Cargo Portal API',
                description: 'API для портала грузоперевозок',
                version: '1.0.0'
            }
        }
    });
    await app.register(swagger_ui_1.default, {
        routePrefix: '/documentation',
        uiConfig: {
            docExpansion: 'list',
            deepLinking: false
        },
        staticCSP: true
    });
    // Регистрируем маршруты
    await app.register(auth_1.default, { prefix: '/auth' });
    await app.register(cargo_1.default, { prefix: '/cargo' });
    await app.register(tariff_1.default);
    await app.register(reference_1.referenceRoutes, { prefix: '/reference' });
    await app.register(reports_1.default, { prefix: '/api' });
    await app.register(user_management_1.default, { prefix: '/api' });
    return app;
}
async function start() {
    try {
        const app = await buildApp();
        await app.listen({ port: 3000, host: '0.0.0.0' });
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
start();

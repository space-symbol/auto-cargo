import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import authRoutes from './routes/auth';
import cargoRoutes from './routes/cargo';
import tariffRoutes from './routes/tariff';
import { referenceRoutes } from './routes/reference';
import reportRoutes from './routes/reports';
import userManagementRoutes from './routes/user-management';

async function buildApp() {
  const app = fastify({
    logger: true
  });
  const prisma = new PrismaClient();

  // Регистрируем плагины
  await app.register(cors, {
    origin: true
  });

  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Transvestor Cargo Portal API',
        description: 'API для портала грузоперевозок',
        version: '1.0.0'
      }
    }
  });

  await app.register(swaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    },
    staticCSP: true
  });

  // Регистрируем маршруты
  await app.register(authRoutes, { prefix: '/auth' });
  await app.register(cargoRoutes, { prefix: '/cargo' });
  await app.register(tariffRoutes);
  await app.register(referenceRoutes, { prefix: '/reference' });
  await app.register(reportRoutes, { prefix: '/api' });
  await app.register(userManagementRoutes, { prefix: '/api' });
  return app;
}

async function start() {
  try {
    const app = await buildApp();
    await app.listen({ port: 3000, host: '0.0.0.0' });
    
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start(); 
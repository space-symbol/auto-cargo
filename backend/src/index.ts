import fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { logger } from './utils/logger';
import { errorHandler } from './utils/error-handler';
import authRoutes from './routes/auth';
import cargoRoutes from './routes/cargo';
import tariffRoutes from './routes/tariff';
import { referenceRoutes } from './routes/reference';
import reportRoutes from './routes/reports';
import userManagementRoutes from './routes/user-management';

async function buildApp() {
  const app = fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
      transport: process.env.NODE_ENV === 'development' ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      } : undefined
    }
  });

  // Регистрируем обработчик ошибок
  errorHandler(app);

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
  await app.register(authRoutes, { prefix: '/api/auth' });
  await app.register(cargoRoutes, { prefix: '/api/cargo' });
  await app.register(tariffRoutes, { prefix: '/api' });
  await app.register(referenceRoutes, { prefix: '/api/reference' });
  await app.register(reportRoutes, { prefix: '/api/reports' });
  await app.register(userManagementRoutes, { prefix: '/api' });

  // Логируем запуск приложения
  logger.info('Application built successfully');
  
  return app;
}

async function start() {
  try {
    const app = await buildApp();
    const port = process.env['PORT'] ? Number(process.env['PORT']) : 5000;
    const host = '0.0.0.0';
    
    await app.listen({ port, host });
    
    logger.info(`Server is running on http://${host}:${port}`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.info(`Log level: ${process.env.LOG_LEVEL || 'info'}`);
    
  } catch (err) {
    logger.fatal(err, 'Failed to start server');
    process.exit(1);
  }
}

start(); 
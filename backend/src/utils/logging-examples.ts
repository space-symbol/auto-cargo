import { FastifyRequest, FastifyReply } from 'fastify';
import { 
  logger, 
  logError, 
  logBusinessEvent, 
  logSecurityEvent, 
  logPerformance, 
  createRequestContext,
  logPrismaError,
  logExternalApiError
} from './logger';
import { 
  asyncHandler, 
  ValidationError, 
  AuthenticationError, 
  NotFoundError,
  AppError 
} from './error-handler';

// Пример 1: Базовое логирование в маршруте
export const exampleBasicLogging = asyncHandler(async (request: FastifyRequest, reply: FastifyReply) => {
  const context = createRequestContext(request);
  const startTime = Date.now();
  
  try {
    // Ваша бизнес-логика здесь
    const result = await someBusinessLogic();
    
    // Логируем успешное выполнение
    logBusinessEvent('operation_completed', {
      resultCount: result.length,
      duration: Date.now() - startTime
    }, context);
    
    return result;
  } catch (error) {
    // Логируем ошибку
    logBusinessEvent('operation_failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: Date.now() - startTime
    }, context);
    
    throw error; // Ошибка будет обработана централизованно
  }
});

// Пример 2: Логирование с валидацией
export const exampleWithValidation = asyncHandler(async (request: FastifyRequest, reply: FastifyReply) => {
  const { data } = request.body as { data: any };
  const context = createRequestContext(request);
  
  // Валидация с логированием
  if (!data || !data.requiredField) {
    logBusinessEvent('validation_failed', {
      missingField: 'requiredField',
      providedData: data
    }, context);
    
    throw new ValidationError('Required field is missing');
  }
  
  // Продолжаем выполнение...
  return { success: true };
});

// Пример 3: Логирование безопасности
export const exampleSecurityLogging = asyncHandler(async (request: FastifyRequest, reply: FastifyReply) => {
  const context = createRequestContext(request);
  
  // Проверка авторизации (пример - в реальном приложении user будет добавлен middleware)
  const user = (request as any).user;
  
  if (!user) {
    logSecurityEvent('unauthorized_access_attempt', {
      ip: request.ip,
      userAgent: request.headers['user-agent'],
      url: request.url
    }, context);
    
    throw new AuthenticationError('Authentication required');
  }
  
  // Проверка прав доступа (пример)
  if (!user.hasPermission || !user.hasPermission('admin')) {
    logSecurityEvent('insufficient_permissions', {
      userId: user.id,
      requiredPermission: 'admin',
      url: request.url
    }, context);
    
    throw new AppError('Insufficient permissions', 403);
  }
  
  return { authorized: true };
});

// Пример 4: Логирование производительности
export const examplePerformanceLogging = asyncHandler(async (request: FastifyRequest, reply: FastifyReply) => {
  const context = createRequestContext(request);
  const startTime = Date.now();
  
  // Медленная операция
  const result = await slowDatabaseQuery();
  
  // Логируем производительность
  logPerformance('database_query', Date.now() - startTime, context);
  
  return result;
});

// Пример 5: Обработка Prisma ошибок
export const examplePrismaErrorHandling = asyncHandler(async (request: FastifyRequest, reply: FastifyReply) => {
  const context = createRequestContext(request);
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: 'non-existent-id' }
    });
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    return user;
  } catch (error) {
    // Prisma ошибки будут автоматически обработаны в errorHandler
    // Но можно добавить дополнительное логирование
    if (error instanceof PrismaClientKnownRequestError) {
      logPrismaError(error, 'user_lookup', context);
    }
    
    throw error;
  }
});

// Пример 6: Обработка внешних API
export const exampleExternalApiLogging = asyncHandler(async (request: FastifyRequest, reply: FastifyReply) => {
  const context = createRequestContext(request);
  
  try {
    const response = await axios.get('https://api.external.com/data');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logExternalApiError(error, 'External API', '/data', context);
    }
    
    throw error;
  }
});

// Пример 7: Кастомные ошибки с контекстом
export const exampleCustomErrorWithContext = asyncHandler(async (request: FastifyRequest, reply: FastifyReply) => {
  const context = createRequestContext(request);
  
  try {
    // Бизнес-логика, которая может выбросить кастомную ошибку
    await riskyBusinessOperation();
  } catch (error) {
    // Создаем кастомную ошибку с дополнительным контекстом
    const customError = new AppError(
      'Business operation failed',
      500,
      true // isOperational
    );
    
    // Добавляем дополнительную информацию в контекст ошибки
    logError({
      error: customError,
      context,
      additionalData: {
        originalError: error instanceof Error ? error.message : 'Unknown',
        businessContext: 'risky_operation',
        timestamp: new Date().toISOString()
      }
    });
    
    throw customError;
  }
  
  return { success: true };
});

// Пример 8: Логирование в middleware
export const exampleMiddlewareLogging = async (request: FastifyRequest, reply: FastifyReply) => {
  const startTime = Date.now();
  
  // Логируем начало обработки запроса
  logger.info({
    event: 'request_started',
    method: request.method,
    url: request.url,
    userAgent: request.headers['user-agent'],
    ip: request.ip
  });
  
  // В реальном приложении можно использовать fastify.addHook для логирования
  // Здесь просто пример логирования
  logger.info({
    event: 'request_completed',
    method: request.method,
    url: request.url,
    duration: Date.now() - startTime
  });
};

// Вспомогательные функции для примеров
async function someBusinessLogic() {
  return [{ id: 1, name: 'Example' }];
}

async function slowDatabaseQuery() {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { data: 'slow result' };
}

async function riskyBusinessOperation() {
  if (Math.random() > 0.5) {
    throw new Error('Random business error');
  }
}

// Импорт Prisma (должен быть в реальном файле)
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from '../lib/prisma';
import axios from 'axios'; 
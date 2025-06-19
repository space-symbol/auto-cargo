import pino from 'pino';
import { FastifyInstance } from 'fastify';

// Типы для структурированного логирования
export interface LogContext {
  requestId?: string;
  userId?: string;
  method?: string;
  url?: string;
  userAgent?: string;
  ip?: string;
  duration?: number;
  statusCode?: number;
}

export interface ErrorLogData {
  error: Error;
  context?: LogContext;
  additionalData?: Record<string, any>;
}

// Конфигурация логгера в зависимости от окружения
const getLoggerConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const logLevel = process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info');

  const baseConfig = {
    level: logLevel,
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (label: string) => ({ level: label }),
      log: (object: any) => {
        return object;
      },
    },
    serializers: {
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res,
      err: pino.stdSerializers.err,
    },
  };

  if (isDevelopment) {
    return {
      ...baseConfig,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    };
  }

  return baseConfig;
};

// Создаем основной логгер
export const logger = pino(getLoggerConfig());

// Утилиты для логирования ошибок
export const logError = (data: ErrorLogData) => {
  const { error, context, additionalData } = data;
  
  const errorInfo = {
    message: error.message,
    name: error.name,
    stack: error.stack,
    ...context,
    ...additionalData,
  };

  logger.error(errorInfo, `Error: ${error.message}`);
};

// Утилита для логирования HTTP запросов
export const logRequest = (fastify: FastifyInstance, request: any, reply: any, duration: number) => {
  const logData = {
    method: request.method,
    url: request.url,
    statusCode: reply.statusCode,
    duration,
    userAgent: request.headers['user-agent'],
    ip: request.ip,
    requestId: request.id,
    userId: request.user?.id,
  };

  if (reply.statusCode >= 400) {
    logger.warn(logData, `HTTP ${reply.statusCode} - ${request.method} ${request.url}`);
  } else {
    logger.info(logData, `HTTP ${reply.statusCode} - ${request.method} ${request.url}`);
  }
};

// Утилита для логирования бизнес-логики
export const logBusinessEvent = (event: string, data: Record<string, any>, context?: LogContext) => {
  const logData = {
    event,
    ...data,
    ...context,
  };

  logger.info(logData, `Business Event: ${event}`);
};

// Утилита для логирования безопасности
export const logSecurityEvent = (event: string, data: Record<string, any>, context?: LogContext) => {
  const logData = {
    event,
    ...data,
    ...context,
  };

  logger.warn(logData, `Security Event: ${event}`);
};

// Утилита для логирования производительности
export const logPerformance = (operation: string, duration: number, context?: LogContext) => {
  const logData = {
    operation,
    duration,
    ...context,
  };

  if (duration > 1000) {
    logger.warn(logData, `Slow operation: ${operation} took ${duration}ms`);
  } else {
    logger.debug(logData, `Performance: ${operation} took ${duration}ms`);
  }
};

// Middleware для автоматического логирования запросов
export const requestLogger = async (request: any, reply: any) => {
  const startTime = Date.now();
  
  reply.addHook('onResponse', (request: any, reply: any) => {
    const duration = Date.now() - startTime;
    logRequest(request.server, request, reply, duration);
  });
};

// Утилита для создания контекста запроса
export const createRequestContext = (request: any): LogContext => ({
  requestId: request.id,
  userId: request.user?.id,
  method: request.method,
  url: request.url,
  userAgent: request.headers['user-agent'],
  ip: request.ip,
});

// Утилита для логирования Prisma ошибок
export const logPrismaError = (error: any, operation: string, context?: LogContext) => {
  const errorData = {
    operation,
    errorCode: error.code,
    meta: error.meta,
    clientVersion: error.clientVersion,
    ...context,
  };

  logger.error(errorData, `Prisma Error in ${operation}: ${error.message}`);
};

// Утилита для логирования внешних API ошибок
export const logExternalApiError = (error: any, apiName: string, endpoint: string, context?: LogContext) => {
  const errorData = {
    apiName,
    endpoint,
    status: error.response?.status,
    statusText: error.response?.statusText,
    data: error.response?.data,
    config: {
      url: error.config?.url,
      method: error.config?.method,
      params: error.config?.params,
    },
    ...context,
  };

  logger.error(errorData, `External API Error: ${apiName} - ${endpoint}`);
}; 
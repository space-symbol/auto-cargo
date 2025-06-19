import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { logError, createRequestContext, logPrismaError, logExternalApiError } from './logger';
import { PrismaClientKnownRequestError, PrismaClientValidationError, PrismaClientInitializationError } from '@prisma/client/runtime/library';
import axios from 'axios';

// Кастомные классы ошибок
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409);
  }
}

// Функция для определения типа ошибки и создания соответствующего ответа
const handleError = (error: any, request: FastifyRequest, reply: FastifyReply) => {
  const context = createRequestContext(request);
  
  // Prisma ошибки
  if (error instanceof PrismaClientKnownRequestError) {
    logPrismaError(error, 'Database operation', context);
    
    switch (error.code) {
      case 'P2002':
        return reply.status(409).send({
          error: 'Duplicate entry',
          message: 'A record with this unique field already exists',
          code: error.code
        });
      case 'P2025':
        return reply.status(404).send({
          error: 'Record not found',
          message: 'The requested record was not found',
          code: error.code
        });
      case 'P2003':
        return reply.status(400).send({
          error: 'Foreign key constraint failed',
          message: 'Referenced record does not exist',
          code: error.code
        });
      default:
        return reply.status(500).send({
          error: 'Database error',
          message: 'An unexpected database error occurred',
          code: error.code
        });
    }
  }

  if (error instanceof PrismaClientValidationError) {
    logPrismaError(error, 'Database validation', context);
    return reply.status(400).send({
      error: 'Validation error',
      message: 'Invalid data provided',
      details: error.message
    });
  }

  if (error instanceof PrismaClientInitializationError) {
    logPrismaError(error, 'Database initialization', context);
    return reply.status(500).send({
      error: 'Database connection error',
      message: 'Unable to connect to database'
    });
  }

  // Axios ошибки (внешние API)
  if (axios.isAxiosError(error)) {
    logExternalApiError(error, 'External API', request.url, context);
    
    if (error.response) {
      return reply.status(error.response.status).send({
        error: 'External service error',
        message: 'Error from external service',
        status: error.response.status,
        details: error.response.data
      });
    }
    
    return reply.status(503).send({
      error: 'External service unavailable',
      message: 'External service is not responding'
    });
  }

  // Кастомные ошибки приложения
  if (error instanceof AppError) {
    logError({
      error,
      context,
      additionalData: {
        statusCode: error.statusCode,
        isOperational: error.isOperational
      }
    });

    return reply.status(error.statusCode).send({
      error: error.name,
      message: error.message
    });
  }

  // JWT ошибки
  if (error.name === 'JsonWebTokenError') {
    logError({
      error,
      context,
      additionalData: { errorType: 'JWT_ERROR' }
    });
    
    return reply.status(401).send({
      error: 'Invalid token',
      message: 'The provided authentication token is invalid'
    });
  }

  if (error.name === 'TokenExpiredError') {
    logError({
      error,
      context,
      additionalData: { errorType: 'JWT_EXPIRED' }
    });
    
    return reply.status(401).send({
      error: 'Token expired',
      message: 'The authentication token has expired'
    });
  }

  // Неизвестные ошибки
  logError({
    error,
    context,
    additionalData: { errorType: 'UNKNOWN_ERROR' }
  });

  // В production не показываем детали ошибки
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return reply.status(500).send({
    error: 'Internal server error',
    message: isDevelopment ? error.message : 'An unexpected error occurred',
    ...(isDevelopment && { stack: error.stack })
  });
};

// Middleware для обработки ошибок
export const errorHandler = (fastify: FastifyInstance) => {
  fastify.setErrorHandler((error, request, reply) => {
    return handleError(error, request, reply);
  });

  // Обработка необработанных ошибок
  process.on('uncaughtException', (error) => {
    logError({
      error,
      additionalData: { errorType: 'UNCAUGHT_EXCEPTION' }
    });
    
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    
    logError({
      error,
      additionalData: { 
        errorType: 'UNHANDLED_REJECTION',
        promise: promise.toString()
      }
    });
    
    process.exit(1);
  });
};

// Утилита для асинхронной обработки ошибок в маршрутах
export const asyncHandler = <T = any>(handler: (request: FastifyRequest, reply: FastifyReply) => Promise<T>) => {
  return async (request: FastifyRequest, reply: FastifyReply): Promise<T> => {
    try {
      return await handler(request, reply);
    } catch (error) {
      return handleError(error, request, reply);
    }
  };
};

// Утилита для валидации с логированием
export const validateWithLogging = (validator: Function, data: any, context?: any) => {
  try {
    return validator(data);
  } catch (error) {
    logError({
      error: error instanceof Error ? error : new Error(String(error)),
      context,
      additionalData: { validationData: data }
    });
    throw error;
  }
}; 
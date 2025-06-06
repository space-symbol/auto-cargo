import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { authenticate, requireRole } from '../utils/auth';
import { UserRole } from '@prisma/client';
import { ReportService } from '../services/report';
import { ReportFormatter } from '../utils/report-formatters';
import fs from 'fs';
import path from 'path';

interface ReportQuery {
  startDate?: string;
  endDate?: string;
  format?: 'pdf' | 'excel' | 'csv';
}

interface ReportError extends Error {
  code?: string;
  statusCode?: number;
}

export default async function reportRoutes(fastify: FastifyInstance) {
  const reportService = new ReportService(prisma);
  const adminOnly = requireRole([UserRole.ADMIN]);

  // Helper function to validate dates
  function validateDates(startDate?: string, endDate?: string) {
    if (startDate && isNaN(Date.parse(startDate))) {
      throw new Error('Invalid start date format');
    }
    if (endDate && isNaN(Date.parse(endDate))) {
      throw new Error('Invalid end date format');
    }
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      throw new Error('Start date cannot be later than end date');
    }
  }

  // Helper function to check if fonts exist
  function checkFonts() {
    const regularFont = path.join(__dirname, '../../assets/fonts/Roboto-Regular.ttf');
    const boldFont = path.join(__dirname, '../../assets/fonts/Roboto-Bold.ttf');
    
    if (!fs.existsSync(regularFont) || !fs.existsSync(boldFont)) {
      throw new Error('Required fonts are missing. Please ensure Roboto fonts are installed.');
    }
  }

  // Get cargo statistics report
  fastify.get<{
    Querystring: ReportQuery;
  }>('/reports/cargo-statistics', {
    preHandler: [authenticate, adminOnly],
    schema: {
      querystring: {
        type: 'object',
        properties: {
          startDate: { type: 'string', format: 'date' },
          endDate: { type: 'string', format: 'date' },
          format: { type: 'string', enum: ['pdf', 'excel', 'csv'] }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { startDate, endDate, format = 'pdf' } = request.query;
      
      // Validate dates
      validateDates(startDate, endDate);

      // Check fonts for PDF
      if (format === 'pdf') {
        checkFonts();
      }
      
      const report = await reportService.generateCargoStatisticsReport(
        startDate ? new Date(startDate) : undefined,
        endDate ? new Date(endDate) : undefined
      );

      // Validate report data
      
      if (!report.statistics || !Array.isArray(report.statistics)) {
        throw new Error('Invalid report data received from service');
      }
      

      switch (format) {
        case 'pdf': {
          const buffer = await ReportFormatter.toPDF(report);
          return reply.type('application/pdf').header('Content-Disposition', 'attachment; filename=cargo-statistics.pdf').send(buffer);
        }
        case 'excel': {
          const buffer = await ReportFormatter.toExcel(report);
          return reply.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').header('Content-Disposition', 'attachment; filename=cargo-statistics.xlsx').send(buffer);
        }
        case 'csv': {
          const csv = await ReportFormatter.toCSV(report);
          return reply.type('text/csv').header('Content-Disposition', 'attachment; filename=cargo-statistics.csv').send(csv);
        }
        default:
          return reply.status(400).send({ error: 'Unsupported format' });
      }
    } catch (error: unknown) {
      const reportError = error as ReportError;
      fastify.log.error(error);
      reply.code(500).send({ error: reportError.message || 'Failed to generate report' });
    }
  });

  // Get financial report
  fastify.get<{
    Querystring: ReportQuery;
  }>('/reports/financial', {
    preHandler: [authenticate, adminOnly],
    schema: {
      querystring: {
        type: 'object',
        properties: {
          startDate: { type: 'string', format: 'date' },
          endDate: { type: 'string', format: 'date' },
          format: { type: 'string', enum: ['pdf', 'excel', 'csv'] }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { startDate, endDate, format = 'pdf' } = request.query;
      
      // Validate dates
      validateDates(startDate, endDate);

      // Check fonts for PDF
      if (format === 'pdf') {
        checkFonts();
      }
      
      const report = await reportService.generateFinancialReport(
        startDate ? new Date(startDate) : undefined,
        endDate ? new Date(endDate) : undefined
      );

      // Validate report data
      if (!report.financialData || !Array.isArray(report.financialData)) {
        throw new Error('Invalid report data received from service');
      }

      switch (format) {
        case 'pdf': {
          const buffer = await ReportFormatter.toPDF(report);
          return reply.type('application/pdf').header('Content-Disposition', 'attachment; filename=financial-report.pdf').send(buffer);
        }
        case 'excel': {
          const buffer = await ReportFormatter.toExcel(report);
          return reply.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').header('Content-Disposition', 'attachment; filename=financial-report.xlsx').send(buffer);
        }
        case 'csv': {
          const csv = await ReportFormatter.toCSV(report);
          return reply.type('text/csv').header('Content-Disposition', 'attachment; filename=financial-report.csv').send(csv);
        }
        default:
          return reply.status(400).send({ error: 'Unsupported format' });
      }
    } catch (error: unknown) {
      const reportError = error as ReportError;
      fastify.log.error(error);
      reply.code(500).send({ error: reportError.message || 'Failed to generate report' });
    }
  });

  // Get user activity report
  fastify.get<{
    Querystring: ReportQuery;
  }>('/reports/user-activity', {
    preHandler: [authenticate, adminOnly],
    schema: {
      querystring: {
        type: 'object',
        properties: {
          startDate: { type: 'string', format: 'date' },
          endDate: { type: 'string', format: 'date' },
          format: { type: 'string', enum: ['pdf', 'excel', 'csv'] }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { startDate, endDate, format = 'pdf' } = request.query;
      
      // Validate dates
      validateDates(startDate, endDate);

      // Check fonts for PDF
      if (format === 'pdf') {
        checkFonts();
      }
      
      const report = await reportService.generateUserActivityReport(
        startDate ? new Date(startDate) : undefined,
        endDate ? new Date(endDate) : undefined
      );

      // Validate report data
      if (!report.userActivity || !Array.isArray(report.userActivity)) {
        throw new Error('Invalid report data received from service');
      }

      switch (format) {
        case 'pdf': {
          const buffer = await ReportFormatter.toPDF(report);
          return reply.type('application/pdf').header('Content-Disposition', 'attachment; filename=user-activity.pdf').send(buffer);
        }
        case 'excel': {
          const buffer = await ReportFormatter.toExcel(report);
          return reply.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').header('Content-Disposition', 'attachment; filename=user-activity.xlsx').send(buffer);
        }
        case 'csv': {
          const csv = await ReportFormatter.toCSV(report);
          return reply.type('text/csv').header('Content-Disposition', 'attachment; filename=user-activity.csv').send(csv);
        }
        default:
          return reply.status(400).send({ error: 'Unsupported format' });
      }
    } catch (error: unknown) {
      const reportError = error as ReportError;
      fastify.log.error(error);
      reply.code(500).send({ error: reportError.message || 'Failed to generate report' });
    }
  });
} 
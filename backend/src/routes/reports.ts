import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../lib/prisma';
import { authenticate, requireRole } from '../utils/auth';
import { UserRole } from '../generated/prisma';
import { ReportService } from '../services/report';
import { ReportFormatter } from '../utils/report-formatters';
import fs from 'fs';
import path from 'path';

interface ReportQuery {
  startDate?: string;
  endDate?: string;
  format?: 'pdf' | 'excel' | 'csv';
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
      console.log('Report data:', JSON.stringify(report, null, 2));
      if (!report.statistics || !Array.isArray(report.statistics)) {
        throw new Error('Invalid report data received from service');
      }
      console.log('Report data validation passed');

      switch (format) {
        case 'pdf':
          const pdfBuffer = await ReportFormatter.toPDF(report);
          if (!pdfBuffer || pdfBuffer.length === 0) {
            throw new Error('Failed to generate PDF report');
          }
          reply.header('Content-Type', 'application/pdf');
          reply.header('Content-Disposition', 'attachment; filename=cargo-statistics.pdf');
          reply.send(pdfBuffer);
          break;
        case 'excel':
          const excelBuffer = await ReportFormatter.toExcel(report);
          if (!excelBuffer || excelBuffer.length === 0) {
            throw new Error('Failed to generate Excel report');
          }
          reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          reply.header('Content-Disposition', 'attachment; filename=cargo-statistics.xlsx');
          reply.send(excelBuffer);
          break;
        case 'csv':
          const csvContent = await ReportFormatter.toCSV(report);
          if (!csvContent) {
            throw new Error('Failed to generate CSV report');
          }
          reply.header('Content-Type', 'text/csv');
          reply.header('Content-Disposition', 'attachment; filename=cargo-statistics.csv');
          reply.send(csvContent);
          break;
        default:
          reply.send(report);
      }
    } catch (error: any) {
      fastify.log.error(error);
      reply.code(500).send({ 
        error: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
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
        case 'pdf':
          const pdfBuffer = await ReportFormatter.toPDF(report);
          if (!pdfBuffer || pdfBuffer.length === 0) {
            throw new Error('Failed to generate PDF report');
          }
          reply.header('Content-Type', 'application/pdf');
          reply.header('Content-Disposition', 'attachment; filename=financial-report.pdf');
          reply.send(pdfBuffer);
          break;
        case 'excel':
          const excelBuffer = await ReportFormatter.toExcel(report);
          if (!excelBuffer || excelBuffer.length === 0) {
            throw new Error('Failed to generate Excel report');
          }
          reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          reply.header('Content-Disposition', 'attachment; filename=financial-report.xlsx');
          reply.send(excelBuffer);
          break;
        case 'csv':
          const csvContent = await ReportFormatter.toCSV(report);
          if (!csvContent) {
            throw new Error('Failed to generate CSV report');
          }
          reply.header('Content-Type', 'text/csv');
          reply.header('Content-Disposition', 'attachment; filename=financial-report.csv');
          reply.send(csvContent);
          break;
        default:
          reply.send(report);
      }
    } catch (error: any) {
      fastify.log.error(error);
      reply.code(500).send({ 
        error: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
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
        case 'pdf':
          const pdfBuffer = await ReportFormatter.toPDF(report);
          if (!pdfBuffer || pdfBuffer.length === 0) {
            throw new Error('Failed to generate PDF report');
          }
          reply.header('Content-Type', 'application/pdf');
          reply.header('Content-Disposition', 'attachment; filename=user-activity.pdf');
          reply.send(pdfBuffer);
          break;
        case 'excel':
          const excelBuffer = await ReportFormatter.toExcel(report);
          if (!excelBuffer || excelBuffer.length === 0) {
            throw new Error('Failed to generate Excel report');
          }
          reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          reply.header('Content-Disposition', 'attachment; filename=user-activity.xlsx');
          reply.send(excelBuffer);
          break;
        case 'csv':
          const csvContent = await ReportFormatter.toCSV(report);
          if (!csvContent) {
            throw new Error('Failed to generate CSV report');
          }
          reply.header('Content-Type', 'text/csv');
          reply.header('Content-Disposition', 'attachment; filename=user-activity.csv');
          reply.send(csvContent);
          break;
        default:
          reply.send(report);
      }
    } catch (error: any) {
      fastify.log.error(error);
      reply.code(500).send({ 
        error: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });
} 
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = reportRoutes;
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../utils/auth");
const client_1 = require("@prisma/client");
const report_1 = require("../services/report");
const report_formatters_1 = require("../utils/report-formatters");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function reportRoutes(fastify) {
    const reportService = new report_1.ReportService(prisma_1.prisma);
    const adminOnly = (0, auth_1.requireRole)([client_1.UserRole.ADMIN]);
    // Helper function to validate dates
    function validateDates(startDate, endDate) {
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
        const regularFont = path_1.default.join(__dirname, '../../assets/fonts/Roboto-Regular.ttf');
        const boldFont = path_1.default.join(__dirname, '../../assets/fonts/Roboto-Bold.ttf');
        if (!fs_1.default.existsSync(regularFont) || !fs_1.default.existsSync(boldFont)) {
            throw new Error('Required fonts are missing. Please ensure Roboto fonts are installed.');
        }
    }
    // Get cargo statistics report
    fastify.get('/reports/cargo-statistics', {
        preHandler: [auth_1.authenticate, adminOnly],
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
            const report = await reportService.generateCargoStatisticsReport(startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined);
            // Validate report data
            if (!report.statistics || !Array.isArray(report.statistics)) {
                throw new Error('Invalid report data received from service');
            }
            switch (format) {
                case 'pdf': {
                    const buffer = await report_formatters_1.ReportFormatter.toPDF(report);
                    return reply.type('application/pdf').header('Content-Disposition', 'attachment; filename=cargo-statistics.pdf').send(buffer);
                }
                case 'excel': {
                    const buffer = await report_formatters_1.ReportFormatter.toExcel(report);
                    return reply.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').header('Content-Disposition', 'attachment; filename=cargo-statistics.xlsx').send(buffer);
                }
                case 'csv': {
                    const csv = await report_formatters_1.ReportFormatter.toCSV(report);
                    return reply.type('text/csv').header('Content-Disposition', 'attachment; filename=cargo-statistics.csv').send(csv);
                }
                default:
                    return reply.status(400).send({ error: 'Unsupported format' });
            }
        }
        catch (error) {
            const reportError = error;
            fastify.log.error(error);
            reply.code(500).send({ error: reportError.message || 'Failed to generate report' });
        }
    });
    // Get financial report
    fastify.get('/reports/financial', {
        preHandler: [auth_1.authenticate, adminOnly],
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
            const report = await reportService.generateFinancialReport(startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined);
            // Validate report data
            if (!report.financialData || !Array.isArray(report.financialData)) {
                throw new Error('Invalid report data received from service');
            }
            switch (format) {
                case 'pdf': {
                    const buffer = await report_formatters_1.ReportFormatter.toPDF(report);
                    return reply.type('application/pdf').header('Content-Disposition', 'attachment; filename=financial-report.pdf').send(buffer);
                }
                case 'excel': {
                    const buffer = await report_formatters_1.ReportFormatter.toExcel(report);
                    return reply.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').header('Content-Disposition', 'attachment; filename=financial-report.xlsx').send(buffer);
                }
                case 'csv': {
                    const csv = await report_formatters_1.ReportFormatter.toCSV(report);
                    return reply.type('text/csv').header('Content-Disposition', 'attachment; filename=financial-report.csv').send(csv);
                }
                default:
                    return reply.status(400).send({ error: 'Unsupported format' });
            }
        }
        catch (error) {
            const reportError = error;
            fastify.log.error(error);
            reply.code(500).send({ error: reportError.message || 'Failed to generate report' });
        }
    });
    // Get user activity report
    fastify.get('/reports/user-activity', {
        preHandler: [auth_1.authenticate, adminOnly],
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
            const report = await reportService.generateUserActivityReport(startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined);
            // Validate report data
            if (!report.userActivity || !Array.isArray(report.userActivity)) {
                throw new Error('Invalid report data received from service');
            }
            switch (format) {
                case 'pdf': {
                    const buffer = await report_formatters_1.ReportFormatter.toPDF(report);
                    return reply.type('application/pdf').header('Content-Disposition', 'attachment; filename=user-activity.pdf').send(buffer);
                }
                case 'excel': {
                    const buffer = await report_formatters_1.ReportFormatter.toExcel(report);
                    return reply.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').header('Content-Disposition', 'attachment; filename=user-activity.xlsx').send(buffer);
                }
                case 'csv': {
                    const csv = await report_formatters_1.ReportFormatter.toCSV(report);
                    return reply.type('text/csv').header('Content-Disposition', 'attachment; filename=user-activity.csv').send(csv);
                }
                default:
                    return reply.status(400).send({ error: 'Unsupported format' });
            }
        }
        catch (error) {
            const reportError = error;
            fastify.log.error(error);
            reply.code(500).send({ error: reportError.message || 'Failed to generate report' });
        }
    });
}

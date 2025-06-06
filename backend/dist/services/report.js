"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
class ReportService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateCargoStatisticsReport(startDate, endDate) {
        const where = {};
        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) {
                where.createdAt.gte = startDate;
            }
            if (endDate) {
                where.createdAt.lte = endDate;
            }
        }
        const cargoStats = await this.prisma.cargoRequest.groupBy({
            by: ['status'],
            _count: true,
            where
        });
        return {
            statistics: cargoStats,
            generatedAt: new Date(),
            period: {
                startDate,
                endDate
            }
        };
    }
    async generateFinancialReport(startDate, endDate) {
        const where = {};
        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) {
                where.createdAt.gte = startDate;
            }
            if (endDate) {
                where.createdAt.lte = endDate;
            }
        }
        const financialData = await this.prisma.cargoRequest.findMany({
            where,
            select: {
                id: true,
                createdAt: true,
                status: true,
                cost: true,
                tariff: {
                    select: {
                        name: true,
                        baseRate: true,
                        weightRate: true,
                        volumeRate: true,
                        distanceRate: true
                    }
                }
            }
        });
        return {
            financialData,
            generatedAt: new Date(),
            period: {
                startDate,
                endDate
            }
        };
    }
    async generateUserActivityReport(startDate, endDate) {
        const where = {};
        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) {
                where.createdAt.gte = startDate;
            }
            if (endDate) {
                where.createdAt.lte = endDate;
            }
        }
        const userActivity = await this.prisma.user.findMany({
            where,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true,
                _count: {
                    select: {
                        requests: true
                    }
                }
            }
        });
        return {
            userActivity,
            generatedAt: new Date(),
            period: {
                startDate,
                endDate
            }
        };
    }
}
exports.ReportService = ReportService;

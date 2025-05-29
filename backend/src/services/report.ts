import { PrismaClient } from '@prisma/client';

export class ReportService {
  constructor(private prisma: PrismaClient) {}

  async generateCargoStatisticsReport(startDate?: Date, endDate?: Date) {
    const where: any = {};
    
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

  async generateFinancialReport(startDate?: Date, endDate?: Date) {
    const where: any = {};
    
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

  async generateUserActivityReport(startDate?: Date, endDate?: Date) {
    const where: any = {};
    
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
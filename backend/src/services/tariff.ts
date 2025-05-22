import { PrismaClient } from '@prisma/client';

export class TariffService {
  constructor(private prisma: PrismaClient) {}

  async calculateCost(params: {
    weight: number;
    volume: number;
    distance: number;
    vehicleType: number;
  }) {
    const { weight, volume, distance, vehicleType } = params;

    const tariff = await this.prisma.tariff.findFirst({
      where: { isActive: true }
    });

    if (!tariff) {
      throw new Error('No active tariff found');
    }

    const cost = 
      tariff.baseRate +
      (weight * tariff.weightRate) +
      (volume * tariff.volumeRate) +
      (distance * tariff.distanceRate);

    return {
      cost,
      currency: 'RUB',
      details: {
        baseRate: tariff.baseRate,
        weightCost: weight * tariff.weightRate,
        volumeCost: volume * tariff.volumeRate,
        distanceCost: distance * tariff.distanceRate
      }
    };
  }

  async createTariff(data: {
    name: string;
    baseRate: number;
    weightRate: number;
    volumeRate: number;
    distanceRate: number;
  }) {
    return this.prisma.tariff.create({
      data
    });
  }

  async updateTariff(id: string, data: {
    name?: string;
    baseRate?: number;
    weightRate?: number;
    volumeRate?: number;
    distanceRate?: number;
    isActive?: boolean;
  }) {
    return this.prisma.tariff.update({
      where: { id },
      data
    });
  }

  async getActiveTariff() {
    return this.prisma.tariff.findFirst({
      where: { isActive: true }
    });
  }

  async getAllTariffs() {
    return this.prisma.tariff.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }
} 
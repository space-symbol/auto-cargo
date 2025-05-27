import { PrismaClient } from '@prisma/client';

export class TariffService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async calculateCost(params: {
    weight: number;
    volume: number;
    distance?: number;
    vehicleTypeId: string;
    cargoTypeId?: string;
  }) {
    const { weight, volume, distance, vehicleTypeId, cargoTypeId } = params;

    const tariff = await this.prisma.tariff.findFirst({
      where: { 
        isActive: true,
        vehicleTypeId,
        cargoTypeId: cargoTypeId || null
      },
      include: {
        vehicleType: true,
        cargoType: true
      }
    });

    if (!tariff) {
      const vehicleType = await this.prisma.vehicleType.findUnique({
        where: { id: vehicleTypeId }
      });
      const cargoType = cargoTypeId ? await this.prisma.cargoType.findUnique({
        where: { id: cargoTypeId }
      }) : null;

      throw new Error(
        `Не найден активный тариф для ${vehicleType?.name || 'выбранного типа транспорта'}${cargoType ? ` и ${cargoType.name}` : ''}. ` +
        'Пожалуйста, обратитесь к администратору для настройки тарифов.'
      );
    }

    const cost = 
      tariff.baseRate +
      (weight * tariff.weightRate) +
      (volume * tariff.volumeRate) +
      ((distance || 0) * tariff.distanceRate);

    return {
      cost,
      currency: 'RUB',
      details: {
        tariffId: tariff.id,
        baseRate: tariff.baseRate,
        weightRate: tariff.weightRate,
        volumeRate: tariff.volumeRate,
        distanceRate: tariff.distanceRate,
        weightCost: weight * tariff.weightRate,
        volumeCost: volume * tariff.volumeRate,
        distanceCost: (distance || 0) * tariff.distanceRate
      }
    };
  }

  async createTariff(data: {
    name: string;
    baseRate: number;
    weightRate: number;
    volumeRate: number;
    distanceRate: number;
    vehicleTypeId: string;
    cargoTypeId?: string;
  }) {
    return this.prisma.tariff.create({
      data: {
        name: data.name,
        baseRate: data.baseRate,
        weightRate: data.weightRate,
        volumeRate: data.volumeRate,
        distanceRate: data.distanceRate,
        vehicleTypeId: data.vehicleTypeId,
        cargoTypeId: data.cargoTypeId
      }
    });
  }

  async updateTariff(id: string, data: {
    name?: string;
    baseRate?: number;
    weightRate?: number;
    volumeRate?: number;
    distanceRate?: number;
    isActive?: boolean;
    vehicleTypeId?: string;
    cargoTypeId?: string;
  }) {
    return this.prisma.tariff.update({
      where: { id },
      data
    });
  }

  async getActiveTariff(vehicleTypeId?: string, cargoTypeId?: string) {
    return this.prisma.tariff.findFirst({
      where: { 
        isActive: true,
        vehicleTypeId: vehicleTypeId || undefined,
        cargoTypeId: cargoTypeId || undefined
      },
      include: {
        vehicleType: true,
        cargoType: true
      }
    });
  }

  async getAllTariffs() {
    return this.prisma.tariff.findMany({
      include: {
        vehicleType: true,
        cargoType: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }
} 
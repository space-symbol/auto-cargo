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
        vehicleTypes: {
          some: {
            vehicleTypeId
          }
        },
        cargoTypes: cargoTypeId ? {
          some: {
            cargoTypeId
          }
        } : undefined
      },
      include: {
        vehicleTypes: {
          include: {
            vehicleType: true
          }
        },
        cargoTypes: {
          include: {
            cargoType: true
          }
        }
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
    vehicleTypeIds: string[];
    cargoTypeIds: string[];
  }) {
    return this.prisma.tariff.create({
      data: {
        name: data.name,
        baseRate: data.baseRate,
        weightRate: data.weightRate,
        volumeRate: data.volumeRate,
        distanceRate: data.distanceRate,
        vehicleTypes: {
          create: data.vehicleTypeIds.map(vehicleTypeId => ({
            vehicleTypeId
          }))
        },
        cargoTypes: {
          create: data.cargoTypeIds.map(cargoTypeId => ({
            cargoTypeId
          }))
        }
      },
      include: {
        vehicleTypes: {
          include: {
            vehicleType: true
          }
        },
        cargoTypes: {
          include: {
            cargoType: true
          }
        }
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
    vehicleTypeIds?: string[];
    cargoTypeIds?: string[];
  }) {
    const { vehicleTypeIds, cargoTypeIds, ...updateData } = data;

    // Если есть новые ID для связей, обновляем их
    if (vehicleTypeIds || cargoTypeIds) {
      // Удаляем старые связи
      if (vehicleTypeIds) {
        await this.prisma.vehicleTypeOnTariff.deleteMany({
          where: { tariffId: id }
        });
      }
      if (cargoTypeIds) {
        await this.prisma.cargoTypeOnTariff.deleteMany({
          where: { tariffId: id }
        });
      }

      // Создаем новые связи
      return this.prisma.tariff.update({
        where: { id },
        data: {
          ...updateData,
          vehicleTypes: vehicleTypeIds ? {
            create: vehicleTypeIds.map(vehicleTypeId => ({
              vehicleTypeId
            }))
          } : undefined,
          cargoTypes: cargoTypeIds ? {
            create: cargoTypeIds.map(cargoTypeId => ({
              cargoTypeId
            }))
          } : undefined
        },
        include: {
          vehicleTypes: {
            include: {
              vehicleType: true
            }
          },
          cargoTypes: {
            include: {
              cargoType: true
            }
          }
        }
      });
    }

    // Если нет новых связей, просто обновляем основные данные
    return this.prisma.tariff.update({
      where: { id },
      data: updateData,
      include: {
        vehicleTypes: {
          include: {
            vehicleType: true
          }
        },
        cargoTypes: {
          include: {
            cargoType: true
          }
        }
      }
    });
  }

  async getActiveTariff(vehicleTypeId?: string, cargoTypeId?: string) {
    return this.prisma.tariff.findFirst({
      where: { 
        isActive: true,
        vehicleTypes: vehicleTypeId ? {
          some: {
            vehicleTypeId
          }
        } : undefined,
        cargoTypes: cargoTypeId ? {
          some: {
            cargoTypeId
          }
        } : undefined
      },
      include: {
        vehicleTypes: {
          include: {
            vehicleType: true
          }
        },
        cargoTypes: {
          include: {
            cargoType: true
          }
        }
      }
    });
  }

  async getAllTariffs() {
    return this.prisma.tariff.findMany({
      include: {
        vehicleTypes: {
          include: {
            vehicleType: true
          }
        },
        cargoTypes: {
          include: {
            cargoType: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
} 
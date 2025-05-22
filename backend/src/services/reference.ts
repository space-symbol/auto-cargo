import { PrismaClient } from '@prisma/client';

export class ReferenceService {
  constructor(private prisma: PrismaClient) {}

  async getVehicleTypes() {
    return this.prisma.vehicleType.findMany();
  }

  async getCargoTypes() {
    return this.prisma.cargoType.findMany();
  }

  async createVehicleType(data: { name: string; maxWeight: number; maxVolume: number }) {
    return this.prisma.vehicleType.create({ data });
  }

  async createCargoType(data: { name: string; description: string }) {
    return this.prisma.cargoType.create({ data });
  }
} 
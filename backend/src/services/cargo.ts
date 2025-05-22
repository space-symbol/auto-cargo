import { PrismaClient, CargoRequestStatus, Prisma } from '@prisma/client';
import { TariffService } from './tariff';

interface CreateCargoRequestData {
  cargoType: number;
  weight: number;
  volume: number;
  from: string;
  to: string;
  distance: number;
  vehicleType: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userId?: string;
}

export class CargoService {
  private prisma: PrismaClient;
  private tariffService: TariffService;

  constructor(prisma: PrismaClient, tariffService: TariffService) {
    this.prisma = prisma;
    this.tariffService = tariffService;
  }

  async calculateCost(data: {
    cargoType: number;
    weight: number;
    volume: number;
    from: string;
    to: string;
    distance: number;
    vehicleType: number;
  }) {
    const costCalculation = await this.tariffService.calculateCost({
      weight: data.weight,
      volume: data.volume,
      distance: data.distance,
      vehicleType: data.vehicleType
    });

    return costCalculation;
  }

  async createRequest(data: CreateCargoRequestData) {
    const costCalculation = await this.tariffService.calculateCost({
      weight: data.weight,
      volume: data.volume,
      distance: data.distance,
      vehicleType: data.vehicleType
    });

    const requestData: Prisma.CargoRequestUncheckedCreateInput = {
      cargoType: data.cargoType.toString(),
      vehicleType: data.vehicleType.toString(),
      weight: data.weight,
      volume: data.volume,
      from: data.from,
      to: data.to,
      distance: data.distance,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      cost: costCalculation.cost,
      status: CargoRequestStatus.PENDING,
      userId: data.userId || null,
      statusHistory: {
        create: {
          status: CargoRequestStatus.PENDING,
          comment: 'Request created'
        }
      }
    };

    const request = await this.prisma.cargoRequest.create({
      data: requestData,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            company: true
          }
        },
        statusHistory: true
      }
    });

    return {
      ...request,
      costDetails: costCalculation.details
    };
  }

  async updateRequestStatus(
    requestId: string,
    status: CargoRequestStatus,
    comment?: string
  ) {
    const request = await this.prisma.cargoRequest.update({
      where: { id: requestId },
      data: {
        status,
        statusHistory: {
          create: {
            status,
            comment
          }
        }
      },
      include: {
        statusHistory: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    return request;
  }

  async getUserRequests(email: string, page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    
    const [requests, total] = await Promise.all([
      this.prisma.cargoRequest.findMany({
        where: { 
          user: {
            email
          }
        },
        include: {
          statusHistory: {
            orderBy: { createdAt: 'desc' }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize
      }),
      this.prisma.cargoRequest.count({
        where: {
          user: {
            email
          }
        }
      })
    ]);

    return {
      items: requests,
      total,
      totalPages: Math.ceil(total / pageSize),
      currentPage: page
    };
  }

  async getAllRequests() {
    return this.prisma.cargoRequest.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            company: true
          }
        },
        statusHistory: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async getRequestById(id: string) {
    return this.prisma.cargoRequest.findUnique({
      where: {
        id
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            company: true
          }
        },
        statusHistory: true
      }
    });
  }

  async getRequests(userId: string) {
    return this.prisma.cargoRequest.findMany({
      where: {
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            company: true
          }
        },
        statusHistory: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async getRequest(id: string) {
    return this.prisma.cargoRequest.findUnique({
      where: {
        id
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            company: true
          }
        },
        statusHistory: true
      }
    });
  }
} 
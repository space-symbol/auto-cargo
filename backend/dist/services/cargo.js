"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CargoService = void 0;
const client_1 = require("@prisma/client");
class CargoService {
    constructor(prisma, tariffService, referenceService) {
        this.prisma = prisma;
        this.tariffService = tariffService;
        this.referenceService = referenceService;
    }
    async calculateCost(data) {
        const tariff = await this.tariffService.getActiveTariff(data.vehicleTypeId, data.cargoTypeId);
        if (!tariff) {
            throw new Error('No active tariff found');
        }
        // Формируем строки адресов для расчета расстояния
        const fromAddressStr = `${data.fromAddress.city}, ${data.fromAddress.street}, ${data.fromAddress.building}`;
        const toAddressStr = `${data.toAddress.city}, ${data.toAddress.street}, ${data.toAddress.building}`;
        // Рассчитываем расстояние
        const distance = await this.referenceService.calculateDistance(fromAddressStr, toAddressStr);
        const cost = this.calculateRequestCost(data, tariff);
        const response = { cost, tariff, distance };
        return response;
    }
    calculateRequestCost(data, tariff) {
        return (tariff.baseRate +
            data.weight * tariff.weightRate +
            data.volume * tariff.volumeRate +
            (data.distance || 0) * tariff.distanceRate);
    }
    async createRequest(data) {
        const { fromAddress, toAddress, ...requestData } = data;
        const fromAddressRecord = await this.referenceService.createAddress(fromAddress);
        const toAddressRecord = await this.referenceService.createAddress(toAddress);
        const tariff = await this.tariffService.getActiveTariff(data.vehicleTypeId, data.cargoTypeId);
        if (!tariff) {
            throw new Error('No active tariff found');
        }
        // Формируем строки адресов для расчета расстояния
        const fromAddressStr = `${data.fromAddress.city}, ${data.fromAddress.street}, ${data.fromAddress.building}`;
        const toAddressStr = `${data.toAddress.city}, ${data.toAddress.street}, ${data.toAddress.building}`;
        // Рассчитываем расстояние
        const distance = await this.referenceService.calculateDistance(fromAddressStr, toAddressStr);
        const cost = this.calculateRequestCost({ ...data, distance }, tariff);
        const result = await this.prisma.cargoRequest.create({
            data: {
                ...requestData,
                fromAddressId: fromAddressRecord.id,
                toAddressId: toAddressRecord.id,
                status: client_1.CargoRequestStatus.PENDING,
                cost,
                baseRate: tariff.baseRate,
                weightRate: tariff.weightRate,
                volumeRate: tariff.volumeRate,
                distanceRate: tariff.distanceRate,
                transportationDateTime: new Date(data.transportationDate + 'T' + data.transportationTime),
                tariffId: tariff.id,
                distance,
                statusHistory: {
                    create: {
                        status: client_1.CargoRequestStatus.PENDING,
                        comment: 'Request created'
                    }
                }
            },
            include: {
                user: true,
                statusHistory: true,
                cargoType: true,
                vehicleType: true,
                tariff: true,
                fromAddress: true,
                toAddress: true
            }
        });
        return {
            ...result,
            costDetails: {
                tariffId: tariff.id,
                baseRate: tariff.baseRate,
                weightRate: tariff.weightRate,
                volumeRate: tariff.volumeRate,
                distanceRate: tariff.distanceRate
            }
        };
    }
    async updateRequestStatus(requestId, status, comment) {
        // Получаем текущую заявку
        const currentRequest = await this.prisma.cargoRequest.findUnique({
            where: { id: requestId },
            include: {
                statusHistory: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            }
        });
        if (!currentRequest) {
            throw new Error('Заявка не найдена');
        }
        // Проверяем возможность изменения статуса
        if (status === client_1.CargoRequestStatus.CANCELLED) {
            // Нельзя отменить завершенную заявку
            if (currentRequest.status === client_1.CargoRequestStatus.COMPLETED) {
                throw new Error('Нельзя отменить завершенную заявку');
            }
        }
        else {
            // Проверяем порядок статусов
            const statusOrder = [
                client_1.CargoRequestStatus.PENDING,
                client_1.CargoRequestStatus.PROCESSING,
                client_1.CargoRequestStatus.IN_TRANSIT,
                client_1.CargoRequestStatus.COMPLETED,
                client_1.CargoRequestStatus.CANCELLED
            ];
            const currentIndex = statusOrder.indexOf(currentRequest.status);
            const newIndex = statusOrder.indexOf(status);
            if (newIndex <= currentIndex) {
                throw new Error('Нельзя вернуть заявку к предыдущему статусу');
            }
        }
        // Обновляем статус
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
    async getUserRequests(email, filters = {}) {
        const { page = 1, pageSize = 10, status, sortBy = 'date', sortOrder = 'desc' } = filters;
        const skip = (page - 1) * pageSize;
        // Сначала найдем пользователя по email
        const user = await this.prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            throw new Error('User not found');
        }
        const where = {
            userId: user.id,
            ...(status && { status })
        };
        const [total, requests] = await Promise.all([
            this.prisma.cargoRequest.count({ where }),
            this.prisma.cargoRequest.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: {
                    [sortBy === 'date' ? 'createdAt' : 'cost']: sortOrder
                },
                include: {
                    statusHistory: true,
                    cargoType: true,
                    vehicleType: true,
                    fromAddress: true,
                    toAddress: true,
                    user: true
                }
            })
        ]);
        return {
            requests,
            pagination: {
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize)
            }
        };
    }
    async getAllRequests(filters = {}) {
        const { page = 1, pageSize = 10, status, sortBy = 'date', sortOrder = 'desc' } = filters;
        const skip = (page - 1) * pageSize;
        const where = {
            ...(status && { status })
        };
        const [total, requests] = await Promise.all([
            this.prisma.cargoRequest.count({ where }),
            this.prisma.cargoRequest.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: {
                    [sortBy === 'date' ? 'createdAt' : 'cost']: sortOrder
                },
                include: {
                    statusHistory: true,
                    cargoType: true,
                    vehicleType: true,
                    fromAddress: true,
                    toAddress: true,
                    user: true
                }
            })
        ]);
        return {
            requests,
            pagination: {
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize)
            }
        };
    }
    async getRequestById(id) {
        return this.prisma.cargoRequest.findUnique({
            where: { id },
            include: {
                statusHistory: true,
                cargoType: true,
                vehicleType: true,
                fromAddress: true,
                toAddress: true,
                user: true
            }
        });
    }
    async getRequests(userId) {
        return this.prisma.cargoRequest.findMany({
            where: {
                userId
            },
            include: {
                user: true,
                statusHistory: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async getRequest(id) {
        return this.prisma.cargoRequest.findUnique({
            where: {
                id
            },
            include: {
                user: true,
                statusHistory: true
            }
        });
    }
    async getStatistics(filters = {}) {
        const { startDate, endDate } = filters;
        const where = {
            ...(startDate && endDate && {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                }
            })
        };
        const [totalRequests, completedRequests, totalCost, requestsByStatus, requestsByCargoType, requestsByVehicleType] = await Promise.all([
            this.prisma.cargoRequest.count({ where }),
            this.prisma.cargoRequest.count({
                where: {
                    ...where,
                    status: client_1.CargoRequestStatus.COMPLETED
                }
            }),
            this.prisma.cargoRequest.aggregate({
                where,
                _sum: {
                    cost: true
                }
            }),
            this.prisma.cargoRequest.groupBy({
                by: ['status'],
                where,
                _count: true
            }),
            this.prisma.cargoRequest.groupBy({
                by: ['cargoTypeId'],
                where,
                _count: true
            }),
            this.prisma.cargoRequest.groupBy({
                by: ['vehicleTypeId'],
                where,
                _count: true
            })
        ]);
        // Получаем названия типов ТС
        const vehicleTypeIds = requestsByVehicleType.map(r => r.vehicleTypeId);
        const vehicleTypes = await this.prisma.vehicleType.findMany({
            where: {
                id: {
                    in: vehicleTypeIds
                }
            },
            select: {
                id: true,
                name: true
            }
        });
        // Получаем названия типов груза
        const cargoTypeIds = requestsByCargoType.map(r => r.cargoTypeId);
        const cargoTypes = await this.prisma.cargoType.findMany({
            where: {
                id: {
                    in: cargoTypeIds
                }
            },
            select: {
                id: true,
                name: true
            }
        });
        // Объединяем данные с названиями
        const requestsByVehicleTypeWithNames = requestsByVehicleType.map(r => ({
            vehicleTypeId: r.vehicleTypeId,
            name: vehicleTypes.find(t => t.id === r.vehicleTypeId)?.name || 'Неизвестный тип',
            _count: r._count
        }));
        const requestsByCargoTypeWithNames = requestsByCargoType.map(r => ({
            cargoTypeId: r.cargoTypeId,
            name: cargoTypes.find(t => t.id === r.cargoTypeId)?.name || 'Неизвестный тип',
            _count: r._count
        }));
        return {
            totalRequests,
            completedRequests,
            totalCost: totalCost._sum.cost || 0,
            requestsByStatus,
            requestsByCargoType: requestsByCargoTypeWithNames,
            requestsByVehicleType: requestsByVehicleTypeWithNames
        };
    }
}
exports.CargoService = CargoService;

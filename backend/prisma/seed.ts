import { PrismaClient, UserRole, CargoRequestStatus, VehicleType, CargoType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  // Клиент
  const clientUser = await prisma.user.upsert({
    where: { email: 'client@example.com' },
    update: {
      email: 'client@example.com',
      password: hashedPassword,
      firstName: 'Иван',
      lastName: 'Иванов',
      phone: '+79001234567',
      company: 'ООО "Клиент"',
      role: UserRole.CLIENT
    },
    create: {
      email: 'client@example.com',
      password: hashedPassword,
      firstName: 'Иван',
      lastName: 'Иванов',
      phone: '+79001234567',
      company: 'ООО "Клиент"',
      role: UserRole.CLIENT
    }
  });

  // Менеджер
  const managerUser = await prisma.user.upsert({
    where: { email: 'manager@example.com' },
    update: {
      email: 'manager@example.com',
      password: hashedPassword,
      firstName: 'Петр',
      lastName: 'Петров',
      phone: '+79001234568',
      company: 'ООО "Трансвестор"',
      role: UserRole.MANAGER
    },
    create: {
      email: 'manager@example.com',
      password: hashedPassword,
      firstName: 'Петр',
      lastName: 'Петров',
      phone: '+79001234568',
      company: 'ООО "Трансвестор"',
      role: UserRole.MANAGER
    }
  });

  // Администратор
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {
      email: 'admin@example.com',
      password: hashedPassword,
      firstName: 'Диана',
      lastName: 'Бектенова',
      phone: '+79001234569',
      company: 'ООО "Трансвестор"',
      role: UserRole.ADMIN
    },
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      firstName: 'Диана',
      lastName: 'Бектенова',
      phone: '+79001234569',
      company: 'ООО "Трансвестор"',
      role: UserRole.ADMIN
    }
  });

  // Создаем типы транспортных средств
  const vehicleTypes = [
    { name: 'Газель', maxWeight: 1500, maxVolume: 10 },
    { name: 'Камаз', maxWeight: 10000, maxVolume: 40 },
    { name: 'Фура', maxWeight: 20000, maxVolume: 80 }
  ];

  const createdVehicleTypes: VehicleType[] = [];
  for (const vehicleType of vehicleTypes) {
    const created = await prisma.vehicleType.upsert({
      where: { name: vehicleType.name },
      update: {},
      create: vehicleType
    });
    createdVehicleTypes.push(created);
  }

  // Создаем типы грузов
  const cargoTypes = [
    { name: 'Обычный груз', description: 'Стандартные товары и материалы' },
    { name: 'Хрупкий груз', description: 'Требует особой осторожности при перевозке' },
    { name: 'Опасный груз', description: 'Требует специального разрешения' },
    { name: 'Скоропортящийся груз', description: 'Требует специальных условий перевозки' }
  ];

  const createdCargoTypes: CargoType[] = [];
  for (const cargoType of cargoTypes) {
    const created = await prisma.cargoType.upsert({
      where: { name: cargoType.name },
      update: {},
      create: cargoType
    });
    createdCargoTypes.push(created);
  }

  // Создаем тарифы для всех комбинаций
  const baseRates = {
    'Газель': 1000,
    'Камаз': 2000,
    'Фура': 3000
  };

  const weightRates = {
    'Газель': 10,
    'Камаз': 8,
    'Фура': 6
  };

  const volumeRates = {
    'Газель': 100,
    'Камаз': 80,
    'Фура': 60
  };

  const distanceRates = {
    'Газель': 15,
    'Камаз': 12,
    'Фура': 10
  };

  // Множители для разных типов грузов
  const cargoTypeMultipliers = {
    'Обычный груз': 1,
    'Хрупкий груз': 1.5,
    'Опасный груз': 2,
    'Скоропортящийся груз': 1.8
  };

  // Создаем тарифы для каждой комбинации
  for (const vehicleType of createdVehicleTypes) {
    for (const cargoType of createdCargoTypes) {
      const multiplier = cargoTypeMultipliers[cargoType.name];
      
      const tariff = await prisma.tariff.upsert({
        where: {
          name: `Тариф ${vehicleType.name} - ${cargoType.name}`
        },
        update: {
          baseRate: baseRates[vehicleType.name] * multiplier,
          weightRate: weightRates[vehicleType.name] * multiplier,
          volumeRate: volumeRates[vehicleType.name] * multiplier,
          distanceRate: distanceRates[vehicleType.name] * multiplier,
          isActive: true,
          vehicleTypes: {
            deleteMany: {},
            create: {
              vehicleTypeId: vehicleType.id
            }
          },
          cargoTypes: {
            deleteMany: {},
            create: {
              cargoTypeId: cargoType.id
            }
          }
        },
        create: {
          name: `Тариф ${vehicleType.name} - ${cargoType.name}`,
          baseRate: baseRates[vehicleType.name] * multiplier,
          weightRate: weightRates[vehicleType.name] * multiplier,
          volumeRate: volumeRates[vehicleType.name] * multiplier,
          distanceRate: distanceRates[vehicleType.name] * multiplier,
          isActive: true,
          vehicleTypes: {
            create: {
              vehicleTypeId: vehicleType.id
            }
          },
          cargoTypes: {
            create: {
              cargoTypeId: cargoType.id
            }
          }
        }
      });
    }
  }

  // Создаем тестовые адреса
  const fromAddress = await prisma.address.upsert({
    where: {
      city_street_building_postalCode: {
        city: 'Москва',
        street: 'Ленина',
        building: '1',
        postalCode: '123456'
      }
    },
    update: {},
    create: {
      city: 'Москва',
      street: 'Ленина',
      building: '1',
      postalCode: '123456',
      country: 'Россия'
    }
  });

  const toAddress = await prisma.address.upsert({
    where: {
      city_street_building_postalCode: {
        city: 'Санкт-Петербург',
        street: 'Невский проспект',
        building: '1',
        postalCode: '190000'
      }
    },
    update: {},
    create: {
      city: 'Санкт-Петербург',
      street: 'Невский проспект',
      building: '1',
      postalCode: '190000',
      country: 'Россия'
    }
  });

  // Создаем тестовую заявку для клиента
  const gasel = await prisma.vehicleType.findFirst({ where: { name: 'Газель' } });
  const regularCargo = await prisma.cargoType.findFirst({ where: { name: 'Обычный груз' } });
  
  // Находим подходящий тариф
  const tariff = await prisma.tariff.findFirst({
    where: {
      vehicleTypes: {
        some: {
          vehicleTypeId: gasel?.id
        }
      },
      cargoTypes: {
        some: {
          cargoTypeId: regularCargo?.id
        }
      }
    }
  });

  if (gasel && regularCargo && tariff) {
    await prisma.cargoRequest.upsert({
      where: {
        id: 'test-request-1'
      },
      update: {},
      create: {
        id: 'test-request-1',
        cargoTypeId: regularCargo.id,
        vehicleTypeId: gasel.id,
        weight: 500,
        volume: 5,
        distance: 700,
        status: CargoRequestStatus.PENDING,
        cost: 15000,
        userId: clientUser.id,
        tariffId: tariff.id,
        baseRate: tariff.baseRate,
        weightRate: tariff.weightRate,
        volumeRate: tariff.volumeRate,
        distanceRate: tariff.distanceRate,
        fromAddressId: fromAddress.id,
        toAddressId: toAddress.id,
        transportationDateTime: new Date('2024-05-29T12:00:00Z'),
        statusHistory: {
          create: {
            status: CargoRequestStatus.PENDING,
            comment: 'Test request created'
          }
        }
      }
    });
  }

  
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
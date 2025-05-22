import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Создаем типы транспортных средств
  const vehicleTypes = [
    { name: 'Газель', maxWeight: 1500, maxVolume: 10 },
    { name: 'Камаз', maxWeight: 10000, maxVolume: 40 },
    { name: 'Фура', maxWeight: 20000, maxVolume: 80 }
  ];

  for (const vehicleType of vehicleTypes) {
    await prisma.vehicleType.upsert({
      where: { name: vehicleType.name },
      update: {},
      create: vehicleType
    });
  }

  // Создаем типы грузов
  const cargoTypes = [
    { name: 'Обычный груз', description: 'Стандартные товары и материалы' },
    { name: 'Хрупкий груз', description: 'Требует особой осторожности при перевозке' },
    { name: 'Опасный груз', description: 'Требует специального разрешения' },
    { name: 'Скоропортящийся груз', description: 'Требует специальных условий перевозки' }
  ];

  for (const cargoType of cargoTypes) {
    await prisma.cargoType.upsert({
      where: { name: cargoType.name },
      update: {},
      create: cargoType
    });
  }

  // Создаем базовый тариф
  await prisma.tariff.upsert({
    where: { name: 'Базовый тариф' },
    update: {},
    create: {
      name: 'Базовый тариф',
      baseRate: 1000, // Базовая ставка
      weightRate: 10, // Ставка за кг
      volumeRate: 100, // Ставка за м³
      distanceRate: 15, // Ставка за км
      isActive: true
    }
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
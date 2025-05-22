
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const advantages = [
  {
    title: "Индивидуальный подход",
    description: "Персональный менеджер для каждого клиента, который разработает оптимальную схему автоперевозки.",
    icon: "👤"
  },
  {
    title: "Собственный автопарк",
    description: "Современный автопарк различной грузоподъемности для перевозки любых типов грузов.",
    icon: "🚚"
  },
  {
    title: "Оперативная доставка",
    description: "Быстрая и надежная доставка по всей территории России с соблюдением сроков.",
    icon: "⏱️"
  },
  {
    title: "GPS-мониторинг",
    description: "Отслеживание местоположения вашего груза в режиме реального времени на всем маршруте.",
    icon: "📍"
  }
];

export default function AdvantagesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-company-dark mb-4">Почему выбирают нас</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы специализируемся на автомобильных грузоперевозках и постоянно совершенствуем наш сервис для обеспечения максимальной надежности и удобства.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => (
            <Card key={index} className="border-company-primary/20 hover:border-company-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="text-4xl mb-2">{advantage.icon}</div>
                <CardTitle className="text-lg">{advantage.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: "🚛",
    title: "Автомобильные перевозки",
    description: "Перевозка грузов автотранспортом по всей России с оптимальными маршрутами и сроками доставки."
  },
  {
    icon: "🚂",
    title: "Железнодорожные перевозки",
    description: "Организация перевозок различных грузов по железной дороге с полным документальным сопровождением."
  },
  {
    icon: "✈️",
    title: "Авиаперевозки",
    description: "Быстрая доставка срочных или ценных грузов воздушным транспортом в любую точку мира."
  },
  {
    icon: "🚢",
    title: "Морские перевозки",
    description: "Транспортировка крупногабаритных и контейнерных грузов морскими путями в международном сообщении."
  },
  {
    icon: "📦",
    title: "Складская логистика",
    description: "Хранение, комплектация и обработка грузов на современных складских комплексах."
  },
  {
    icon: "📝",
    title: "Таможенное оформление",
    description: "Полное сопровождение и оформление таможенной документации при международных перевозках."
  }
];

export default function ServicesSection() {
  return (
    <section className="py-16 bg-company-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-company-dark mb-4">Наши услуги</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы предлагаем полный комплекс транспортно-логистических услуг для решения любых задач по доставке грузов.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="shadow-card hover:shadow-lg transition duration-300">
              <CardHeader>
                <div className="text-4xl mb-2">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-foreground/80">{service.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/services">Подробнее</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

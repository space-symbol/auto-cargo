import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

export default function CallToAction() {
  return (
    <section className="py-16 bg-gradient-to-r from-company-primary to-company-secondary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Готовы отправить груз?</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
          Рассчитайте стоимость автоперевозки или свяжитесь с нашими специалистами для получения консультации.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-company-accent hover:bg-company-accent/90 text-company-dark font-medium" asChild>
            <Link to={ROUTES.CARGO_REQUEST}>Рассчитать стоимость</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

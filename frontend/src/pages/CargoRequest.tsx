import React from 'react';
import Layout from '@/components/layout/Layout';
import CargoRequestForm from '@/components/cargo/CargoRequestForm';
import { useAuth } from '@/lib/auth/AuthProvider';

export default function CargoRequest() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-company-dark">Расчет стоимости автоперевозки</h1>
            <p className="text-muted-foreground mt-2">
              Заполните форму ниже для получения предварительного расчета стоимости доставки вашего груза автотранспортом
            </p>
          </div>
          <CargoRequestForm />
        </div>
      </div>
    </Layout>
  );
}

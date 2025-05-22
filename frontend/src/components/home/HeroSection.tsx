
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-company-dark to-company-primary overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwMCIgaGVpZ2h0PSIxMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJhIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMjAgMTAgQyAyMCAxNS41MjI4IDE1LjUyMjggMjAgMTAgMjAgQyA0LjQ3NzE1IDIwIDAgMTUuNTIyOCAwIDEwIEMgMCA0LjQ3NzE1IDQuNDc3MTUgMCAxMCAwIEMgMTUuNTIyOCAwIDIwIDQuNDc3MTUgMjAgMTAgWiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')]"></div>

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Автомобильные грузоперевозки по всей России
          </h1>
          <p className="text-lg text-company-light/90 mb-8">
            ООО "ТРЭНС ВЭСТОР" предлагает надежные автомобильные грузоперевозки любой сложности с гарантией сохранности груза и соблюдения сроков доставки.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-company-accent hover:bg-company-accent/90 text-company-dark font-medium" asChild>
              <Link to="/cargo-request">Рассчитать стоимость</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

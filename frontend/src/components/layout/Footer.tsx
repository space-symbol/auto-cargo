
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-company-dark text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-md bg-company-primary flex items-center justify-center text-white font-bold">
                ТВ
              </div>
              <span className="font-bold text-white">
                ТРЭНС ВЭСТОР
              </span>
            </div>
            <p className="text-company-light/80 max-w-xs">
              Надежная транспортная компания с многолетним опытом грузоперевозок по всей России и международным направлениям.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 border-b border-company-primary pb-2">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-company-light/80">
                <span className="block text-white">Адрес:</span>
                г. Москва, ул. Транспортная, 123
              </li>
              <li className="text-company-light/80">
                <span className="block text-white">Телефон:</span>
                +7 (495) 123-45-67
              </li>
              <li className="text-company-light/80">
                <span className="block text-white">Email:</span>
                info@transvector.ru
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-company-primary/30 text-center text-company-light/60 text-sm">
          &copy; {new Date().getFullYear()} ООО "ТРЭНС ВЭСТОР". Все права защищены.
        </div>
      </div>
    </footer>
  );
}

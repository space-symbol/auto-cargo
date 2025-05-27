import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { AddressDisplay } from './AddressDisplay';
import { CalculationResultsProps } from '../types/cargoRequestTypes';

export const CalculationResults: React.FC<CalculationResultsProps> = ({
  calculatedCost,
  formData,
  cargoTypes,
  vehicleTypes,
  fromAddress,
  toAddress,
  onRequestSubmit
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="bg-background/50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Детали заказа</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Тип груза:</span>
                <span className="font-medium">
                  {cargoTypes.find(t => t.id === formData.cargoTypeId)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Тип ТС:</span>
                <span className="font-medium">
                  {vehicleTypes.find(t => t.id === formData.vehicleTypeId)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Вес:</span>
                <span className="font-medium">{formData.weight} кг</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Объем:</span>
                <span className="font-medium">{formData.volume} м³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Расстояние:</span>
                <span className="font-medium">{calculatedCost.distance.toFixed(1)} км</span>
              </div>
            </div>
          </div>

          <div className="bg-background/50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Применяемый тариф</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Название:</span>
                <span className="font-medium">{calculatedCost.tariff.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Типы ТС:</span>
                <span className="font-medium">
                  {calculatedCost.tariff.vehicleTypes.map(vt => vt.vehicleType.name).join(', ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Типы груза:</span>
                <span className="font-medium">
                  {calculatedCost.tariff.cargoTypes.map(ct => ct.cargoType.name).join(', ')}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-background/50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Стоимость</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Базовая ставка:</span>
                <span className="font-medium">{calculatedCost.tariff.baseRate.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">За вес:</span>
                <span className="font-medium">{(formData.weight * calculatedCost.tariff.weightRate).toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">За объем:</span>
                <span className="font-medium">{(formData.volume * calculatedCost.tariff.volumeRate).toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">За расстояние:</span>
                <span className="font-medium">{(calculatedCost.distance * calculatedCost.tariff.distanceRate).toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                <span>Итого:</span>
                <span>{calculatedCost.cost.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background/50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Маршрут</h4>
          <div className="flex flex-col items-center gap-3">
            <AddressDisplay address={fromAddress} />
            <ArrowDown className="w-6 h-6 text-primary" />
            <AddressDisplay address={toAddress} />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onRequestSubmit} size="lg">
          Оформить заявку
        </Button>
      </div>
    </div>
  );
}; 
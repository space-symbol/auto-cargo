import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { CalculationResultsProps } from '../types/cargoRequestTypes';

const AddressDisplay = ({ address }: { address: any }) => {
  if (!address) return null;
  return (
    <div className="w-full text-center font-medium px-4 py-2 bg-primary/5 rounded-lg">
      {`${address.city}, ${address.street}, ${address.building}`}
    </div>
  );
};

export const CalculationResults: React.FC<CalculationResultsProps> = ({
  calculatedCost,
  formData,
  cargoTypes,
  vehicleTypes,
  fromAddress,
  toAddress,
  onRequestSubmit,
}) => {
  const cargoType = cargoTypes.find(t => t.id === formData.cargoTypeId);
  const vehicleType = vehicleTypes.find(t => t.id === formData.vehicleTypeId);

  return (
    <div className="bg-background/50 p-6 rounded-lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background/50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Детали груза</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Тип груза:</span>
                <span className="font-medium">{cargoType?.name || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Тип транспорта:</span>
                <span className="font-medium">{vehicleType?.name || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Вес:</span>
                <span className="font-medium">{formData.weight} кг</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Объем:</span>
                <span className="font-medium">{formData.volume} м³</span>
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

        <div className="mt-6">
          <Button
            onClick={onRequestSubmit}
            className="w-full"
          >
            Оформить заявку
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}; 
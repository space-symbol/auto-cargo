import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { cargoApi } from '@/api/api';
import { FormValues } from '../types/cargoRequestTypes';
import React from 'react';

interface UseCostCalculationProps {
  formData: FormValues;
  toast: ReturnType<typeof useToast>['toast'];
}

export const useCostCalculation = ({ formData, toast }: UseCostCalculationProps) => {
  const [calculatedCost, setCalculatedCost] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateCost = React.useCallback(async () => {
    if (!formData.fromCity || !formData.toCity || !formData.weight || !formData.volume || !formData.vehicleTypeId) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все необходимые поля для расчета стоимости',
        variant: 'destructive',
      });
      return;
    }

    setIsCalculating(true);
    try {
      const response = await cargoApi.calculateCost({
        cargoTypeId: formData.cargoTypeId,
        vehicleTypeId: formData.vehicleTypeId,
        weight: formData.weight,
        volume: formData.volume,
        fromAddress: {
          city: formData.fromCity,
          street: formData.fromStreet,
          building: formData.fromBuilding,
          country: 'Россия'
        },
        toAddress: {
          city: formData.toCity,
          street: formData.toStreet,
          building: formData.toBuilding,
          country: 'Россия'
        }
      });
      setCalculatedCost(response.cost);
    } catch (error) {
      console.error('Error calculating cost:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось рассчитать стоимость',
        variant: 'destructive',
      });
    } finally {
      setIsCalculating(false);
    }
  }, [formData, toast]);

  return {
    calculatedCost,
    isCalculating,
    calculateCost,
  };
}; 
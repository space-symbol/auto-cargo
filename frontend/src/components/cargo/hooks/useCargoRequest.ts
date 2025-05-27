import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { cargoApi } from '@/api/api';
import { FormValues } from '../types/cargoRequestTypes';
import React from 'react';
import { useAuth } from '@/lib/auth/AuthProvider';

interface UseCargoRequestProps {
  formData: FormValues;
  toast: ReturnType<typeof useToast>['toast'];
}

export const useCargoRequest = ({ formData, toast }: UseCargoRequestProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const submitRequest = React.useCallback(async () => {
    if (!user) {
      toast({
        title: 'Ошибка',
        description: 'Необходимо авторизоваться для создания заявки',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.fromCity || !formData.toCity || !formData.weight || !formData.volume || !formData.vehicleTypeId) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все необходимые поля',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await cargoApi.submitRequest({
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
        },
        userId: user.id
      });

      toast({
        title: 'Успех',
        description: 'Заявка успешно создана',
      });

      return response;
    } catch (error) {
      console.error('Error creating cargo request:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать заявку',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, user, toast]);

  return {
    isSubmitting,
    submitRequest,
  };
}; 
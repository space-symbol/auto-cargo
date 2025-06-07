import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { cargoApi } from '@/api';
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

  const submitRequest = React.useCallback(async (requestData?: any) => {
    if (!user) {
      toast({
        title: 'Ошибка',
        description: 'Для создания заявки необходимо авторизоваться',
        variant: 'destructive',
      });
      return null;
    }

    if (!formData.cargoTypeId || !formData.vehicleTypeId || !formData.weight || !formData.volume || !formData.transportationDateTime) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все необходимые поля',
        variant: 'destructive',
      });
      return null;
    }

    setIsSubmitting(true);
    try {
      // Convert datetime-local value to ISO 8601 format
      const dateTime = new Date(formData.transportationDateTime);
      const isoDateTime = dateTime.toISOString();

      const response = await cargoApi.submitRequest({
        cargoTypeId: requestData?.cargoTypeId || formData.cargoTypeId,
        vehicleTypeId: requestData?.vehicleTypeId || formData.vehicleTypeId,
        weight: requestData?.weight || formData.weight,
        volume: requestData?.volume || formData.volume,
        fromAddress: {
          city: requestData?.fromCity || formData.fromCity,
          street: requestData?.fromStreet || formData.fromStreet,
          building: requestData?.fromBuilding || formData.fromBuilding,
          country: 'Россия'
        },
        toAddress: {
          city: requestData?.toCity || formData.toCity,
          street: requestData?.toStreet || formData.toStreet,
          building: requestData?.toBuilding || formData.toBuilding,
          country: 'Россия'
        },
        transportationDateTime: isoDateTime,
        userId: user.id
      });

      toast({
        title: 'Успех',
        description: 'Заявка успешно создана',
      });

      return response;
    } catch (error) {
      console.error('Error creating request:', error);
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
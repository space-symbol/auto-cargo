import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthProvider';
import { FormValues } from './types/cargoRequestTypes';
import { useAddressHandling } from './hooks/useAddressHandling';
import { useCostCalculation } from './hooks/useCostCalculation';
import { useCargoRequest } from './hooks/useCargoRequest';
import { useSavedFormData } from './hooks/useSavedFormData';
import { CargoTypeSelect } from './form-sections/CargoTypeSelect';
import { VehicleTypeSelect } from './form-sections/VehicleTypeSelect';
import { WeightVolumeInputs } from './form-sections/WeightVolumeInputs';
import { AddressSection } from './form-sections/AddressSection';
import { TransportationDateTime } from './form-sections/TransportationDateTime';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { referenceApi } from '@/api/api';

const initialFormData: FormValues = {
  cargoTypeId: '',
  vehicleTypeId: '',
  weight: 0,
  volume: 0,
  fromCity: '',
  fromStreet: '',
  fromBuilding: '',
  toCity: '',
  toStreet: '',
  toBuilding: '',
  transportationDateTime: '',
};

export const CargoRequestForm: React.FC = () => {
  const [formData, setFormData] = useState<FormValues>(initialFormData);
  const [cargoTypes, setCargoTypes] = useState<Array<{ id: string; name: string }>>([]);
  const [vehicleTypes, setVehicleTypes] = useState<Array<{ id: string; name: string; maxWeight: number; maxVolume: number }>>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { fromSuggestions, toSuggestions, showFromSuggestions, showToSuggestions, handleAddressInput, handleSuggestionSelect } = useAddressHandling({
    formData,
    setFormData,
    toast,
  });

  const { calculatedCost, isCalculating, calculateCost } = useCostCalculation({
    formData,
    toast,
  });

  const { isSubmitting, submitRequest } = useCargoRequest({
    formData,
    toast,
  });

  const { saveFormData, loadSavedFormData, clearSavedFormData } = useSavedFormData(setFormData);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cargoTypesResponse, vehicleTypesResponse] = await Promise.all([
          referenceApi.getCargoTypes(),
          referenceApi.getVehicleTypes(),
        ]);
        setCargoTypes(cargoTypesResponse);
        setVehicleTypes(vehicleTypesResponse);
      } catch (error) {
        console.error('Error loading reference data:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить справочные данные',
          variant: 'destructive',
        });
      }
    };

    loadData();
  }, [toast]);

  useEffect(() => {
    if (!user) {
      const hasLoadedData = loadSavedFormData();
      if (hasLoadedData) {
        toast({
          title: 'Восстановлены данные',
          description: 'Ваши данные были восстановлены из сохраненной формы',
        });
      }
    }
  }, [user, loadSavedFormData, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!formData.cargoTypeId) newErrors.cargoTypeId = 'Выберите тип груза';
    if (!formData.vehicleTypeId) newErrors.vehicleTypeId = 'Выберите тип транспорта';
    if (!formData.weight) newErrors.weight = 'Укажите вес';
    if (!formData.volume) newErrors.volume = 'Укажите объем';
    if (!formData.fromCity) newErrors.fromCity = 'Укажите город отправления';
    if (!formData.fromStreet) newErrors.fromStreet = 'Укажите улицу отправления';
    if (!formData.fromBuilding) newErrors.fromBuilding = 'Укажите здание отправления';
    if (!formData.toCity) newErrors.toCity = 'Укажите город прибытия';
    if (!formData.toStreet) newErrors.toStreet = 'Укажите улицу прибытия';
    if (!formData.toBuilding) newErrors.toBuilding = 'Укажите здание прибытия';
    if (!formData.transportationDateTime) newErrors.transportationDateTime = 'Укажите дату и время транспортировки';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast({
        title: 'Ошибка валидации',
        description: 'Пожалуйста, заполните все обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    if (!user) {
      saveFormData(formData);
      toast({
        title: 'Требуется авторизация',
        description: 'Для создания заявки необходимо авторизоваться. Данные формы будут сохранены.',
      });
      navigate('/login');
      return;
    }

    const response = await submitRequest();
    if (response) {
      clearSavedFormData();
      navigate('/my-requests');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <CargoTypeSelect
            value={formData.cargoTypeId}
            onChange={(value) => setFormData(prev => ({ ...prev, cargoTypeId: value }))}
            error={errors.cargoTypeId}
            cargoTypes={cargoTypes}
          />

          <VehicleTypeSelect
            value={formData.vehicleTypeId}
            onChange={(value) => setFormData(prev => ({ ...prev, vehicleTypeId: value }))}
            error={errors.vehicleTypeId}
            vehicleTypes={vehicleTypes}
          />

          <WeightVolumeInputs
            weight={formData.weight}
            volume={formData.volume}
            onWeightChange={(value) => setFormData(prev => ({ ...prev, weight: value }))}
            onVolumeChange={(value) => setFormData(prev => ({ ...prev, volume: value }))}
            weightError={errors.weight}
            volumeError={errors.volume}
            vehicleTypeId={formData.vehicleTypeId}
            vehicleTypes={vehicleTypes}
          />

          <TransportationDateTime
            value={formData.transportationDateTime}
            onChange={(value) => setFormData(prev => ({ ...prev, transportationDateTime: value }))}
            error={errors.transportationDateTime}
          />

          <AddressSection
            fromCity={formData.fromCity}
            fromStreet={formData.fromStreet}
            fromBuilding={formData.fromBuilding}
            toCity={formData.toCity}
            toStreet={formData.toStreet}
            toBuilding={formData.toBuilding}
            onFromCityChange={(value) => setFormData(prev => ({ ...prev, fromCity: value }))}
            onFromStreetChange={(value) => setFormData(prev => ({ ...prev, fromStreet: value }))}
            onFromBuildingChange={(value) => setFormData(prev => ({ ...prev, fromBuilding: value }))}
            onToCityChange={(value) => setFormData(prev => ({ ...prev, toCity: value }))}
            onToStreetChange={(value) => setFormData(prev => ({ ...prev, toStreet: value }))}
            onToBuildingChange={(value) => setFormData(prev => ({ ...prev, toBuilding: value }))}
            fromCityError={errors.fromCity}
            fromStreetError={errors.fromStreet}
            fromBuildingError={errors.fromBuilding}
            toCityError={errors.toCity}
            toStreetError={errors.toStreet}
            toBuildingError={errors.toBuilding}
            fromSuggestions={fromSuggestions}
            toSuggestions={toSuggestions}
            showFromSuggestions={showFromSuggestions}
            showToSuggestions={showToSuggestions}
            onFromAddressInput={(value) => handleAddressInput(value, 'from')}
            onToAddressInput={(value) => handleAddressInput(value, 'to')}
            onFromSuggestionSelect={(suggestion) => handleSuggestionSelect(suggestion, 'from')}
            onToSuggestionSelect={(suggestion) => handleSuggestionSelect(suggestion, 'to')}
          />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Расчет стоимости</h3>
            <Button
              type="button"
              variant="outline"
              onClick={calculateCost}
              disabled={isCalculating}
            >
              {isCalculating ? 'Расчет...' : 'Рассчитать стоимость'}
            </Button>
          </div>
          
          {calculatedCost && (
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <span className="text-lg">Итоговая стоимость:</span>
              <span className="text-2xl font-bold text-primary">
                {calculatedCost.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          )}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
        </Button>
      </div>
    </form>
  );
};

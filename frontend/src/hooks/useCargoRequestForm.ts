import { useState, useEffect } from 'react';

const STORAGE_KEY = 'cargo_request_form_data';

export interface CargoRequestFormData {
  cargoTypeId: string;
  vehicleTypeId: string;
  weight: number;
  volume: number;
  fromAddress: {
    city: string;
    street: string;
    building: string;
    country: string;
  };
  toAddress: {
    city: string;
    street: string;
    building: string;
    country: string;
  };
}

export function useCargoRequestForm() {
  const [formData, setFormData] = useState<CargoRequestFormData | null>(null);

  // Загружаем данные при инициализации
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Сохраняем данные
  const saveFormData = (data: CargoRequestFormData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setFormData(data);
  };

  // Очищаем сохраненные данные
  const clearFormData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(null);
  };

  return {
    formData,
    saveFormData,
    clearFormData
  };
} 
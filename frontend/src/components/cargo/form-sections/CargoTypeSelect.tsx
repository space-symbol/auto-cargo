import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CargoTypeSelectProps } from '../types/cargoRequestTypes';

export const CargoTypeSelect: React.FC<CargoTypeSelectProps> = ({ value, onChange, error, cargoTypes }) => {
  return (
    <div>
      <label htmlFor="cargoTypeId" className="text-sm font-medium">Тип груза</label>
      <Select 
        onValueChange={onChange}
        value={value}
      >
        <SelectTrigger>
          <SelectValue placeholder="Выберите тип груза" />
        </SelectTrigger>
        <SelectContent>
          {cargoTypes.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              {type.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}; 
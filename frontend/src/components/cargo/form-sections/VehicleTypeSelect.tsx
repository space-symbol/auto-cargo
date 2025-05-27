import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VehicleTypeSelectProps } from '../types/cargoRequestTypes';

export const VehicleTypeSelect: React.FC<VehicleTypeSelectProps> = ({ value, onChange, error, vehicleTypes }) => {
  return (
    <div>
      <label htmlFor="vehicleTypeId" className="text-sm font-medium">Тип транспорта</label>
      <Select 
        onValueChange={onChange}
        value={value}
      >
        <SelectTrigger>
          <SelectValue placeholder="Выберите тип транспорта" />
        </SelectTrigger>
        <SelectContent>
          {vehicleTypes.map((type) => (
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
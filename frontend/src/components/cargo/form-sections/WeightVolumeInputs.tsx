import React from 'react';
import { Input } from '@/components/ui/input';
import { WeightVolumeInputsProps } from '../types/cargoRequestTypes';

export const WeightVolumeInputs: React.FC<WeightVolumeInputsProps> = ({ 
  weight, 
  volume, 
  onWeightChange, 
  onVolumeChange, 
  weightError, 
  volumeError, 
  vehicleTypes,
  vehicleTypeId
}) => {
  const selectedVehicleType = vehicleTypes.find(t => t.id === vehicleTypeId);
  const maxWeight = selectedVehicleType?.maxWeight || 10000;
  const maxVolume = selectedVehicleType?.maxVolume || 100;

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      onWeightChange(0);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        onWeightChange(numValue);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      onVolumeChange(0);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        onVolumeChange(numValue);
      }
    }
  };

  return (
    <>
      <div>
        <label htmlFor="weight" className="text-sm font-medium">Вес груза (кг)</label>
        <Input 
          id="weight"
          type="number"
          placeholder="Например: 1000"
          min="0.1"
          max={maxWeight}
          step="0.1"
          inputMode="decimal"
          value={weight || ''}
          onChange={handleWeightChange}
          error={weightError}
        />
        <p className="text-sm text-muted-foreground mt-1">
          Максимальный вес: {maxWeight} кг
        </p>
      </div>

      <div>
        <label htmlFor="volume" className="text-sm font-medium">Объем груза (м³)</label>
        <Input 
          id="volume"
          type="number"
          placeholder="Например: 2.5"
          min="0.1"
          max={maxVolume}
          step="0.1"
          inputMode="decimal"
          value={volume || ''}
          onChange={handleVolumeChange}
          error={volumeError}
        />
        <p className="text-sm text-muted-foreground mt-1">
          Максимальный объем: {maxVolume} м³
        </p>
      </div>
    </>
  );
}; 
import { Address } from '@/types/api';

export interface Suggestion {
  title: {
    text: string;
    hl: Array<{
      begin: number;
      end: number;
    }>;
  };
  subtitle?: {
    text: string;
  };
  tags: string[];
  distance?: {
    text: string;
    value: number;
  };
  address?: {
    formatted_address: string;
    component: Array<{
      name: string;
      kind: string[];
    }>;
  };
  uri: string;
}

export interface FormValues {
  cargoTypeId: string;
  vehicleTypeId: string;
  weight: number;
  volume: number;
  fromCity: string;
  fromStreet: string;
  fromBuilding: string;
  toCity: string;
  toStreet: string;
  toBuilding: string;
}

export interface CargoTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  cargoTypes: Array<{
    id: string;
    name: string;
  }>;
}

export interface VehicleTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  vehicleTypes: Array<{
    id: string;
    name: string;
    maxWeight: number;
    maxVolume: number;
  }>;
}

export interface WeightVolumeInputsProps {
  weight: number;
  volume: number;
  onWeightChange: (value: number) => void;
  onVolumeChange: (value: number) => void;
  weightError?: string;
  volumeError?: string;
  vehicleTypeId: string;
  vehicleTypes: Array<{
    id: string;
    name: string;
    maxWeight: number;
    maxVolume: number;
  }>;
}

export interface CalculationResultsProps {
  calculatedCost: {
    cost: number;
    distance: number;
    tariff: {
      id: string;
      name: string;
      baseRate: number;
      weightRate: number;
      volumeRate: number;
      distanceRate: number;
      isActive: boolean;
      vehicleTypeId: string;
      cargoTypeId: string;
    };
  };
  formData: FormValues;
  cargoTypes: Array<{
    id: string;
    name: string;
  }>;
  vehicleTypes: Array<{
    id: string;
    name: string;
    maxWeight: number;
    maxVolume: number;
  }>;
  fromAddress: any;
  toAddress: any;
  onRequestSubmit: () => void;
} 
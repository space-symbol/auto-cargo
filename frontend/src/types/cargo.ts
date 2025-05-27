export enum CargoRequestStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  IN_TRANSIT = 'IN_TRANSIT',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface CargoRequest {
  id: string;
  status: CargoRequestStatus;
  cost: number;
  createdAt: string;
  updatedAt: string;
  weight: number;
  volume: number;
  distance?: number;
  userId?: string;
  cargoTypeId: string;
  vehicleTypeId: string;
  fromAddressId: string;
  toAddressId: string;
  baseRate: number;
  weightRate: number;
  volumeRate: number;
  distanceRate: number;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
  };
  cargoType: {
    id: string;
    name: string;
    description: string;
  };
  vehicleType: {
    id: string;
    name: string;
    maxWeight: number;
    maxVolume: number;
  };
  fromAddress: {
    id: string;
    city: string;
    street: string;
    building: string;
    region?: string;
    postalCode?: string;
    country: string;
  };
  toAddress: {
    id: string;
    city: string;
    street: string;
    building: string;
    region?: string;
    postalCode?: string;
    country: string;
  };
  statusHistory: Array<{
    id: string;
    status: CargoRequestStatus;
    comment?: string;
    createdAt: string;
  }>;
} 
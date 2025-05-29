export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  role: UserRole;
  createdAt: string;
}

export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER'
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface VehicleType {
  id: string;
  name: string;
  maxWeight: number;
  maxVolume: number;
  createdAt: string;
  updatedAt: string;
}

export interface CargoType {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  city: string;
  street: string;
  building: string;
  region?: string;
  postalCode?: string;
  country: string;
  createdAt: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Tariff {
  id: string;
  name: string;
  baseRate: number;
  weightRate: number;
  volumeRate: number;
  distanceRate: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  vehicleTypes: Array<{
    vehicleType: VehicleType;
  }>;
  cargoTypes: Array<{
    cargoType: CargoType;
  }>;
}

export interface CargoRequestStatusHistory {
  id: string;
  status: CargoRequestStatus;
  comment?: string;
  createdAt: string;
  requestId: string;
}

export interface CargoRequest {
  id: string;
  cargoTypeId: string;
  cargoType: CargoType;
  vehicleTypeId: string;
  vehicleType: VehicleType;
  weight: number;
  volume: number;
  distance?: number;
  status: CargoRequestStatus;
  cost?: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
  statusHistory: CargoRequestStatusHistory[];
  tariffId?: string;
  tariff?: Tariff;
  baseRate: number;
  weightRate: number;
  volumeRate: number;
  distanceRate: number;
  fromAddressId: string;
  fromAddress: Address;
  toAddressId: string;
  toAddress: Address;
  transportationDateTime: string;
}

export enum CargoRequestStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  IN_TRANSIT = 'IN_TRANSIT',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface CalculateCostRequest {
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
  transportationDateTime: string;
}

export interface CalculateCostResponse {
  cost: number;
  currency: string;
  details: {
    tariffId: string;
    baseRate: number;
    weightRate: number;
    volumeRate: number;
    distanceRate: number;
    weightCost: number;
    volumeCost: number;
    distanceCost: number;
  };
}

export interface CreateCargoRequestData {
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
  transportationDateTime: string;
  userId: string;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export type CargoRequestsListResponse = PaginatedResponse<CargoRequest>

export interface CargoRequestFilters {
  status?: CargoRequestStatus;
  sortBy?: 'date' | 'cost';
  sortOrder?: 'asc' | 'desc';
} 
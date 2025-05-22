export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface VehicleType {
  id: number;
  name: string;
  capacity: number;
}

export interface CargoType {
  id: number;
  name: string;
  multiplier: number;
}

export interface CargoRequest {
  id: string;
  cargoType: number;
  weight: number;
  volume: number;
  from: string;
  to: string;
  distance: number;
  vehicleType: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: CargoRequestStatus;
  cost: number | null;
  createdAt: string;
  updatedAt: string;
  userId?: string;
}

export enum CargoRequestStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface CalculateCostRequest {
  cargoType: number;
  weight: number;
  volume: number;
  from: string;
  to: string;
  distance: number;
  vehicleType: number;
}

export interface CalculateCostResponse {
  cost: number;
  details: {
    baseRate: number;
    weightCost: number;
    volumeCost: number;
    distanceCost: number;
  };
}

export interface ApiError {
  message: string;
  status: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CargoRequestsListResponse extends PaginatedResponse<CargoRequest> {} 
import axios, { AxiosError } from 'axios';
import { VehicleType, CargoType, CargoRequest, CalculateCostResponse, ApiError, AuthResponse, User, CargoRequestsListResponse, CalculateCostRequest } from '@/types/api';

const BASE_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      const currentPath = window.location.pathname;
      window.location.href = `/login?from=${encodeURIComponent(currentPath)}`;
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData: { 
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    company?: string;
  }): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },
  validateToken: async (): Promise<User> => {
    const response = await api.get<User>('/auth/validate');
    return response.data;
  },
  logout: async () => {
    localStorage.removeItem('auth_token');
    return { success: true };
  },
};

// API для работы с грузами
export const cargoApi = {
  calculateCost: async (cargoData: CalculateCostRequest): Promise<CalculateCostResponse> => {
    console.log('Sending cargo data:', cargoData);
    const response = await api.post<CalculateCostResponse>('/cargo/calculate-cost', cargoData);
    return response.data;
  },
  submitRequest: async (cargoRequest: CargoRequest): Promise<{ success: boolean }> => {
    const response = await api.post<{ success: boolean }>('/cargo/requests', cargoRequest);
    return response.data;
  },
  getUserRequests: async (page: number = 1, pageSize: number = 10): Promise<CargoRequestsListResponse> => {
    const response = await api.get<CargoRequestsListResponse>('/cargo/user/requests', {
      params: { page, pageSize }
    });
    return response.data;
  },
};

export const referenceApi = {
  getVehicleTypes: async (): Promise<VehicleType[]> => {
    const response = await api.get<VehicleType[]>('/reference/vehicle-types');
    return response.data;
  },
  getCargoTypes: async (): Promise<CargoType[]> => {
    const response = await api.get<CargoType[]>('/reference/cargo-types');
    return response.data;
  },
};

export const userApi = {
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/auth/user/profile');
    return response.data;
  },
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put<User>('/auth/user/profile', userData);
    return response.data;
  },
};

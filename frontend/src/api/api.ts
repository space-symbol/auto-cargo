import axios, { AxiosError } from 'axios';
import { 
  VehicleType, 
  CargoType, 
  CargoRequest, 
  CalculateCostResponse, 
  ApiError, 
  AuthResponse, 
  User, 
  CalculateCostRequest,
  CreateCargoRequestData,
  Address,
  CargoRequestFilters,
  CargoRequestStatus
} from '@/types/api';

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
      error.message = 'Неверный email или пароль';
    } else if (error.response?.status === 403) {
      error.message = 'Нет доступа';
    } else if (error.response?.status === 404) {
      error.message = 'Запрашиваемый ресурс не найден';
    } else if (error.response?.status === 500) {
      error.message = 'Внутренняя ошибка сервера';
    } else if (!error.response) {
      error.message = 'Нет соединения с сервером';
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
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/auth/user/profile');
    return response.data;
  },
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put<User>('/auth/user/profile', userData);
    return response.data;
  },
};

// API для работы с грузами
export const cargoApi = {
  calculateCost: (data: CalculateCostRequest) =>
    api.post<CalculateCostResponse>('/cargo/calculate-cost', data).then(res => res.data),
  
  submitRequest: (cargoRequest: CreateCargoRequestData) =>
    api.post<CargoRequest>('/cargo/requests', cargoRequest).then(res => res.data),
  
  getUserRequests: (page = 1, pageSize = 10, filters?: CargoRequestFilters) =>
    api.get<CargoRequestsListResponse>('/cargo/user/requests', {
      params: { page, pageSize, ...filters }
    }).then(res => res.data),
  
  getRequestById: (id: string) =>
    api.get<CargoRequest>(`/cargo/requests/${id}`).then(res => res.data),
  
  updateRequestStatus: (id: string, status: CargoRequestStatus, comment?: string) =>
    api.patch<CargoRequest>(`/cargo/admin/requests/${id}/status`, { status, comment }).then(res => res.data),
  
  getAllRequests: (page = 1, pageSize = 10, filters?: CargoRequestFilters) =>
    api.get<CargoRequestsListResponse>('/cargo/admin/requests', {
      params: { page, pageSize, ...filters }
    }).then(res => res.data),

  async cancelRequest(requestId: string): Promise<CargoRequest> {
    const response = await api.post<CargoRequest>(`/cargo/requests/${requestId}/cancel`);
    return response.data;
  },
};

export interface CargoRequestsListResponse {
  requests: CargoRequest[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

interface YandexSuggestionResponse {
  results: Array<{
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
  }>;
}

export const referenceApi = {
  getVehicleTypes: () => 
    api.get<VehicleType[]>('/reference/vehicle-types').then(res => res.data),

  getCargoTypes: () => 
    api.get<CargoType[]>('/reference/cargo-types').then(res => res.data),

  getSuggestions: (text: string) => 
    api.get<YandexSuggestionResponse>(`/reference/suggest?text=${encodeURIComponent(text)}`)
      .then(res => res.data)
      .catch(error => {
        console.error('Error fetching suggestions:', error);
        throw new Error(error.response?.data?.error || 'Failed to fetch suggestions');
      }),

  createAddress: (data: Omit<Address, 'id' | 'createdAt'>) =>
    api.post<Address>('/reference/addresses', data).then(res => res.data),

  calculateDistance: (fromAddress: string, toAddress: string) =>
    api.post<{ distance: number }>('/reference/calculate-distance', { fromAddress, toAddress }).then(res => res.data.distance)
};

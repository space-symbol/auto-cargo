import { api } from './api';
import { User, UserRole } from '@/types';

interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
}

interface GetUsersResponse {
  users: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export const usersApi = {
  getUsers: async (params: GetUsersParams = {}): Promise<GetUsersResponse> => {
    const { data } = await api.get('/api/users', { params });
    return data;
  },

  getUser: async (id: string): Promise<User> => {
    const { data } = await api.get(`/api/users/${id}`);
    return data;
  },

  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    const { data } = await api.put(`/api/users/${id}`, userData);
    return data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/api/users/${id}`);
  }
}; 
import { User } from ".";

export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER'
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  role: UserRole;
  createdAt: string;
}export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
}

export interface GetUsersResponse {
  users: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}
 
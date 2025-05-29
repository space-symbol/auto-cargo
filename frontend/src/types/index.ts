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
} 
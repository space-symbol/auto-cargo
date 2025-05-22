import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authApi } from '@/api/api';
import { Loading } from '@/components/ui/loading';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  company?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    company?: string;
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Функция для безопасного декодирования JWT токена
function decodeJwtToken(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);
      const { user, token } = response;
      
      if (!token) {
        throw new Error('No token received from server');
      }

      localStorage.setItem('auth_token', token);
      
      const savedToken = localStorage.getItem('auth_token');
      if (!savedToken) {
        throw new Error('Failed to save token');
      }

      setUser(user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    company?: string;
  }) => {
    try {
      const response = await authApi.register(userData);
      const { user, token } = response;
      
      // Сохраняем токен в localStorage
      localStorage.setItem('auth_token', token);
      
      setUser(user);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
  };

  // Восстанавливаем состояние авторизации при инициализации
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        try {
          const user = await authApi.validateToken();
          setUser(user);
        } catch (error) {
          console.error('Failed to restore auth state:', error);
          localStorage.removeItem('auth_token');
        }
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, []);

  // Показываем загрузку, пока не инициализировали состояние авторизации
  if (!isInitialized) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isLoading: !isInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
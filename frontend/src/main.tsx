import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import App from './App';
import './index.css';
import { AuthProvider } from './lib/auth/AuthProvider'

// Предварительная загрузка Яндекс Карт
const loadYandexMaps = () => {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${import.meta.env.VITE_YANDEX_MAPS_API_KEY}&lang=ru_RU`;
    script.async = true;
    
    script.onload = () => {
      if (window.ymaps) {
        window.ymaps.ready(() => resolve());
      } else {
        reject(new Error('Yandex Maps API not loaded'));
      }
    };
    
    script.onerror = () => reject(new Error('Failed to load Yandex Maps API'));
    document.head.appendChild(script);
  });
};

// Инициализация приложения
const initApp = async () => {
  try {
    await loadYandexMaps();
    
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
    });

    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    ReactDOM.createRoot(rootElement).render(
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    );
  } catch (error) {
    console.error('Failed to initialize app:', error);
    // Показываем сообщение об ошибке пользователю
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    ReactDOM.createRoot(rootElement).render(
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center p-6">
          <h1 className="text-2xl font-bold text-destructive mb-4">Ошибка загрузки</h1>
          <p className="text-muted-foreground mb-4">
            Не удалось загрузить необходимые компоненты приложения.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Обновить страницу
          </button>
        </div>
      </div>
    );
  }
};

initApp();

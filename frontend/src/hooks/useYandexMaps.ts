import { useState, useEffect } from 'react';

declare global {
  interface Window {
    ymaps: YandexMaps;
  }
}

export interface YandexMaps {
  geocode: (query: string, options?: { results: number; kind: string }) => Promise<{
    geoObjects: {
      each: (callback: (geoObject: {
        getAddressLine: () => string;
        geometry: {
          getCoordinates: () => [number, number];
        };
      }) => void) => void;
    };
  }>;
  suggest: (query: string) => Promise<{
    _results: Array<{
      value: string;
      displayName: string;
    }>;
  }>;
  route: (points: [number, number][], options: { routingMode: string; avoidTrafficJams: boolean }) => Promise<{
    getLength: () => number;
  }>;
  ready: (callback: () => void) => void;
}

export function useYandexMaps() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initializeYmaps = () => {
      if (!window.ymaps) {
        setError('Yandex Maps API не загружен');
        return;
      }

      window.ymaps.ready(() => {
        if (isMounted) {
          setIsLoaded(true);
          setIsInitialized(true);
        }
      });
    };

    // Проверяем, загружен ли уже скрипт
    const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]');
    if (existingScript) {
      if (window.ymaps) {
        initializeYmaps();
      } else {
        // Если скрипт есть, но API еще не инициализирован, ждем его загрузки
        const checkInterval = setInterval(() => {
          if (window.ymaps) {
            clearInterval(checkInterval);
            initializeYmaps();
          }
        }, 100);

        // Очищаем интервал через 10 секунд, если API так и не загрузился
        setTimeout(() => {
          clearInterval(checkInterval);
          if (isMounted && !window.ymaps) {
            setError('Не удалось инициализировать Yandex Maps API');
          }
        }, 10000);
      }
      return;
    }

    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${import.meta.env.VITE_YANDEX_MAPS_API_KEY}&lang=ru_RU`;
    script.async = true;

    script.onload = () => {
      if (isMounted) {
        initializeYmaps();
      }
    };

    script.onerror = () => {
      if (isMounted) {
        setError('Не удалось загрузить Yandex Maps API');
      }
    };

    document.head.appendChild(script);

    return () => {
      isMounted = false;
    };
  }, []);

  return { 
    isLoaded: isLoaded && isInitialized, 
    error, 
    ymaps: isInitialized ? window.ymaps : undefined 
  };
} 
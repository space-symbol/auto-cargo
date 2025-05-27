import { useState, useEffect } from 'react';

declare global {
  interface Window {
    ymaps: YandexMaps;
  }
}

export interface YandexMaps {
  Map: any;
  Placemark: any;
  Polyline: any;
  SuggestView: new (element: string) => {
    search: (query: string, callback: (results: Array<{ value: string, data: any }>) => void) => void;
    events: {
      add: (event: string, callback: (e: { get: (key: string) => { value: string } }) => void) => void;
    };
  };
  geocode: (query: string, options?: any) => Promise<{
    geoObjects: {
      each: (callback: (geoObject: any) => void) => void;
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
    if (window.ymaps) {
      initializeYmaps();
    } else {
      // Если скрипт еще не загружен, ждем его загрузки
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
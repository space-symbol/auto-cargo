import { useState, useEffect } from 'react';

declare global {
  interface Window {
    ymaps: YandexMaps;
  }
}

export interface YandexMaps {
  Map: new (element: string | HTMLElement, options: {
    center: [number, number];
    zoom: number;
    controls?: string[];
  }) => {
    destroy: () => void;
    setCenter: (center: [number, number]) => void;
    setZoom: (zoom: number) => void;
  };

  Placemark: new (coordinates: [number, number], properties?: {
    iconContent?: string;
    hintContent?: string;
    balloonContent?: string;
  }, options?: {
    preset?: string;
    draggable?: boolean;
  }) => {
    geometry: {
      getCoordinates: () => [number, number];
      setCoordinates: (coordinates: [number, number]) => void;
    };
    properties: {
      get: (key: string) => string | number | boolean | null;
      set: (key: string, value: string | number | boolean) => void;
    };
  };

  Polyline: new (coordinates: [number, number][], properties?: {
    strokeColor?: string;
    strokeWidth?: number;
  }) => {
    geometry: {
      getCoordinates: () => [number, number][];
      setCoordinates: (coordinates: [number, number][]) => void;
    };
  };

  SuggestView: new (element: string) => {
    search: (query: string, callback: (results: Array<{ 
      value: string; 
      data: {
        name: string;
        description: string;
        uri: string;
      };
    }>) => void) => void;
    events: {
      add: (event: string, callback: (e: { get: (key: string) => { value: string } }) => void) => void;
    };
  };

  geocode: (query: string, options?: {
    results?: number;
    kind?: string;
    lang?: string;
  }) => Promise<{
    geoObjects: {
      each: (callback: (geoObject: {
        geometry: {
          getCoordinates: () => [number, number];
        };
        properties: {
          get: (key: string) => string | number | boolean | null;
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

  route: (points: [number, number][], options: { 
    routingMode: 'auto' | 'pedestrian' | 'masstransit' | 'bicycle';
    avoidTrafficJams: boolean;
  }) => Promise<{
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
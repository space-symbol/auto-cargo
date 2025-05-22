import { useState, useEffect } from 'react';
import { useYandexMaps } from './useYandexMaps';

export interface DistanceCalculationResult {
  distance: number | null;
  error: string | null;
  loading: boolean;
}

export function useDistanceCalculation(
  fromCoordinates: [number, number] | null,
  toCoordinates: [number, number] | null
): DistanceCalculationResult {
  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { isLoaded, error: apiError, ymaps } = useYandexMaps();

  useEffect(() => {
    if (!isLoaded || !fromCoordinates || !toCoordinates) {
      setDistance(null);
      setError(null);
      return;
    }

    const calculateDistance = async () => {
      setLoading(true);
      setError(null);

      try {
        const route = await ymaps.route([fromCoordinates, toCoordinates], {
          routingMode: 'pedestrian',
          avoidTrafficJams: false
        });

        const distanceInMeters = route.getLength();
        const distanceInKilometers = distanceInMeters / 1000;
        setDistance(distanceInKilometers);
      } catch (err) {
        setError('Не удалось рассчитать расстояние');
        setDistance(null);
      } finally {
        setLoading(false);
      }
    };

    calculateDistance();
  }, [isLoaded, fromCoordinates, toCoordinates, ymaps]);

  if (apiError) {
    return {
      distance: null,
      error: apiError,
      loading: false
    };
  }

  return {
    distance,
    error,
    loading
  };
} 
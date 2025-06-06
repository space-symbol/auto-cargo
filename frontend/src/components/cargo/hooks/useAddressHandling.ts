import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { referenceApi } from '@/api/api';
import { FormValues } from '../types/cargoRequestTypes';
import React from 'react';
import { useYandexMaps } from '@/hooks/useYandexMaps';

interface Suggestion {
  title: {
    text: string;
    hl: { begin: number; end: number; }[];
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
    component: { name: string; kind: string[]; }[];
  };
  uri: string;
}

interface UseAddressHandlingProps {
  formData: FormValues;
  setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
  toast: ReturnType<typeof useToast>['toast'];
}

export const useAddressHandling = ({ setFormData, toast }: UseAddressHandlingProps) => {
  const [fromSuggestions, setFromSuggestions] = React.useState<Suggestion[]>([]);
  const [toSuggestions, setToSuggestions] = React.useState<Suggestion[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [fromAddress, setFromAddress] = React.useState<Suggestion | null>(null);
  const [toAddress, setToAddress] = React.useState<Suggestion | null>(null);
  const { ymaps } = useYandexMaps();

  const handleAddressInput = React.useCallback(async (value: string, type: 'from' | 'to') => {
    if (!value) {
      if (type === 'from') {
        setFromSuggestions([]);
        setShowFromSuggestions(false);
      } else {
        setToSuggestions([]);
        setShowToSuggestions(false);
      }
      return;
    }

    try {
      const response = await referenceApi.getSuggestions(value);
      const suggestions = response.results || [];

      if (type === 'from') {
        setFromSuggestions(suggestions);
        setShowFromSuggestions(suggestions.length > 0);
      } else {
        setToSuggestions(suggestions);
        setShowToSuggestions(suggestions.length > 0);
      }
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить подсказки адресов',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const handleSuggestionSelect = React.useCallback(async (suggestion: Suggestion, type: 'from' | 'to'): Promise<string> => {
    const prefix = type === 'from' ? 'from' : 'to';
    
    try {
      const geocoder = await ymaps?.geocode(suggestion.address?.formatted_address || suggestion.title.text, {
        results: 1,
        kind: 'locality,street,house'
      });

      if (!geocoder) {
        throw new Error('Geocoder not available');
      }

      let city = '';
      let street = '';
      let building = '';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      geocoder.geoObjects.each((geoObject: any) => {
        

        city = geoObject.getLocalities()[0] || '';
        const thoroughfare = geoObject.getThoroughfare() || '';
        const premise = geoObject.getPremise() || '';
        street = thoroughfare + (premise ? `, ${premise}` : '');
        building = geoObject.getPremiseNumber() || '';
      });
      
      const fullAddress = `${city}, ${street}${building ? `, ${building}` : ''}`;
      setFormData(prev => ({
        ...prev,
        [`${prefix}City`]: city,
        [`${prefix}Street`]: street,
        [`${prefix}Building`]: building,
      }));

      if (type === 'from') {
        setFromAddress(suggestion);
        setFromSuggestions([]);
        setShowFromSuggestions(false);
      } else {
        setToAddress(suggestion);
        setToSuggestions([]);
        setShowToSuggestions(false);
      }

      return fullAddress;
    } catch (error) {
      console.error('Error geocoding address:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось определить компоненты адреса',
        variant: 'destructive',
      });
      throw error;
    }
  }, [setFormData, ymaps, toast]);

  return {
    fromSuggestions,
    toSuggestions,
    showFromSuggestions,
    showToSuggestions,
    fromAddress,
    toAddress,
    handleAddressInput,
    handleSuggestionSelect,
  };
}; 
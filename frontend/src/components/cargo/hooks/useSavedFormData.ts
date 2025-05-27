import { FormValues } from '../types/cargoRequestTypes';
import React from 'react';

const SAVED_FORM_DATA_KEY = 'savedCargoRequestFormData';

export const useSavedFormData = (setFormData: React.Dispatch<React.SetStateAction<FormValues>>) => {
  const saveFormData = React.useCallback((data: FormValues) => {
    localStorage.setItem(SAVED_FORM_DATA_KEY, JSON.stringify(data));
  }, []);

  const loadSavedFormData = React.useCallback(() => {
    const savedData = localStorage.getItem(SAVED_FORM_DATA_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as FormValues;
        setFormData(parsedData);
        return true;
      } catch (error) {
        console.error('Error parsing saved form data:', error);
        localStorage.removeItem(SAVED_FORM_DATA_KEY);
      }
    }
    return false;
  }, [setFormData]);

  const clearSavedFormData = React.useCallback(() => {
    localStorage.removeItem(SAVED_FORM_DATA_KEY);
  }, []);

  return {
    saveFormData,
    loadSavedFormData,
    clearSavedFormData,
  };
}; 
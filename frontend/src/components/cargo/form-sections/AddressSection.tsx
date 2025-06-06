import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Suggestion } from '../types/cargoRequestTypes';

interface AddressSectionProps {
  fromCity: string;
  fromStreet: string;
  fromBuilding: string;
  toCity: string;
  toStreet: string;
  toBuilding: string;
  onFromCityChange: (value: string) => void;
  onFromStreetChange: (value: string) => void;
  onFromBuildingChange: (value: string) => void;
  onToCityChange: (value: string) => void;
  onToStreetChange: (value: string) => void;
  onToBuildingChange: (value: string) => void;
  fromCityError?: string;
  fromStreetError?: string;
  fromBuildingError?: string;
  toCityError?: string;
  toStreetError?: string;
  toBuildingError?: string;
  fromSuggestions: Suggestion[];
  toSuggestions: Suggestion[];
  showFromSuggestions: boolean;
  showToSuggestions: boolean;
  onFromAddressInput: (value: string) => void;
  onToAddressInput: (value: string) => void;
  onFromSuggestionSelect: (suggestion: Suggestion) => Promise<string>;
  onToSuggestionSelect: (suggestion: Suggestion) => Promise<string>;
}

export const AddressSection: React.FC<AddressSectionProps> = ({
  fromCity,
  fromStreet,
  fromBuilding,
  toCity,
  toStreet,
  toBuilding,
  fromCityError,
  fromStreetError,
  fromBuildingError,
  toCityError,
  toStreetError,
  toBuildingError,
  fromSuggestions,
  toSuggestions,
  showFromSuggestions,
  showToSuggestions,
  onFromAddressInput,
  onToAddressInput,
  onFromSuggestionSelect,
  onToSuggestionSelect,
}) => {
  const { toast } = useToast();
  const [fromInputValue, setFromInputValue] = useState('');
  const [toInputValue, setToInputValue] = useState('');

  const handleSuggestionClick = async (suggestion: Suggestion, type: 'from' | 'to') => {
    try {
      const fullAddress = type === 'from' 
        ? await onFromSuggestionSelect(suggestion)
        : await onToSuggestionSelect(suggestion);
      
      if (type === 'from') {
        setFromInputValue(fullAddress);
      } else {
        setToInputValue(fullAddress);
      }
    } catch (error) {
      console.error('Error handling suggestion:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обработать выбранный адрес',
        variant: 'destructive',
      });
    }
  };

  const handleFromInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromInputValue(value);
    onFromAddressInput(value);
  };

  const handleToInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToInputValue(value);
    onToAddressInput(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Адрес отправления</h3>
        <div className="space-y-4">
          <div className="relative">
            <Input 
              value={fromInputValue}
              onChange={handleFromInputChange}
              placeholder="Введите адрес для поиска"
              className={fromCityError ? "border-red-500" : ""}
            />
            {showFromSuggestions && fromSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                {fromSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion, 'from')}
                  >
                    <div className="font-medium">{suggestion.title?.text || ''}</div>
                    {suggestion.subtitle?.text && (
                      <div className="text-sm text-muted-foreground">{suggestion.subtitle.text}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {fromCityError && (
              <p className="text-sm text-red-500 mt-1">{fromCityError}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`bg-muted/50 p-3 rounded-lg ${fromCityError ? 'border border-red-500' : ''}`}>
              <div className="text-sm text-muted-foreground">Город</div>
              <div className="font-medium">{fromCity || '-'}</div>
            </div>
            <div className={`bg-muted/50 p-3 rounded-lg ${fromStreetError ? 'border border-red-500' : ''}`}>
              <div className="text-sm text-muted-foreground">Улица</div>
              <div className="font-medium">{fromStreet || '-'}</div>
            </div>
            <div className={`bg-muted/50 p-3 rounded-lg ${fromBuildingError ? 'border border-red-500' : ''}`}>
              <div className="text-sm text-muted-foreground">Дом</div>
              <div className="font-medium">{fromBuilding || '-'}</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Адрес назначения</h3>
        <div className="space-y-4">
          <div className="relative">
            <Input 
              value={toInputValue}
              onChange={handleToInputChange}
              placeholder="Введите адрес для поиска"
              className={toCityError ? "border-red-500" : ""}
            />
            {showToSuggestions && toSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                {toSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion, 'to')}
                  >
                    <div className="font-medium">{suggestion.title?.text || ''}</div>
                    {suggestion.subtitle?.text && (
                      <div className="text-sm text-muted-foreground">{suggestion.subtitle.text}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {toCityError && (
              <p className="text-sm text-red-500 mt-1">{toCityError}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`bg-muted/50 p-3 rounded-lg ${toCityError ? 'border border-red-500' : ''}`}>
              <div className="text-sm text-muted-foreground">Город</div>
              <div className="font-medium">{toCity || '-'}</div>
            </div>
            <div className={`bg-muted/50 p-3 rounded-lg ${toStreetError ? 'border border-red-500' : ''}`}>
              <div className="text-sm text-muted-foreground">Улица</div>
              <div className="font-medium">{toStreet || '-'}</div>
            </div>
            <div className={`bg-muted/50 p-3 rounded-lg ${toBuildingError ? 'border border-red-500' : ''}`}>
              <div className="text-sm text-muted-foreground">Дом</div>
              <div className="font-medium">{toBuilding || '-'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
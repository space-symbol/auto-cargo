import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useYandexMaps } from '@/hooks/useYandexMaps';
import { Address } from '@/types/api';

interface AddressSuggestion {
  value: string;
  displayName: string;
  coordinates: [number, number];
  address: Address;
}

interface AddressInputProps {
  value: string;
  onChange: (value: string, address?: Address) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

export function AddressInput({ value = '', onChange, placeholder, className, error }: AddressInputProps) {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const searchTimeout = useRef<NodeJS.Timeout>();
  const { isLoaded, error: apiError, ymaps } = useYandexMaps();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, []);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const searchAddress = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    if (!isLoaded || !ymaps) {
      console.error('Yandex Maps API not loaded');
      return;
    }

    setLoading(true);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(async () => {
      try {
        const geocoder = await ymaps.geocode(query, {
          results: 5,
          kind: 'locality,street,house',
        });
        const results: AddressSuggestion[] = [];
        geocoder.geoObjects.each((geoObject) => {
          const address = geoObject.getAddressLine();
          const coords = geoObject.geometry?.getCoordinates();
          const components = geoObject.getAddressLine().split(', ');
          
          if (address && coords && typeof address === 'string') {
            const addressObj: Address = {
              id: '', // ID будет присвоен на сервере
              city: components[0] || '',
              street: components[1] || '',
              building: components[2] || '',
              region: components[3] || undefined,
              postalCode: undefined,
              country: 'Россия',
              createdAt: new Date().toISOString(),
            };

            results.push({
              value: address,
              displayName: address,
              coordinates: coords,
              address: addressObj,
            });
          }
        });

        if (isMounted.current) {
          setSuggestions(results);
        }
      } catch (error) {
        console.error('Error searching address:', error);
        if (isMounted.current) setSuggestions([]);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }, 100);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-10",
            error && "border-red-500",
            className
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <MapPin className="h-4 w-4 shrink-0 opacity-50" />
            <span className="truncate">{value || placeholder || "Выберите адрес"}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start" sideOffset={4}>
        <div className="flex flex-col">
          <div className="px-3 py-2">
            <Input
              placeholder="Введите адрес..."
              value={inputValue}
              className="h-9"
              onChange={(e) => {
                const newValue = e.target.value;
                setInputValue(newValue);
                onChange(newValue);
                searchAddress(newValue);
              }}
            />
          </div>
          <div className="max-h-[300px] overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span className="text-sm text-muted-foreground">Поиск...</span>
              </div>
            ) : !isLoaded ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Загрузка...
              </div>
            ) : suggestions.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Адрес не найден
              </div>
            ) : (
              <div className="py-1">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.value}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-accent",
                      value === suggestion.value && "bg-accent"
                    )}
                    onClick={() => {
                      setInputValue(suggestion.value);
                      onChange(suggestion.value, suggestion.address);
                      setOpen(false);
                    }}
                  >
                    <MapPin className="h-4 w-4 mr-2 opacity-50" />
                    <span>{suggestion.displayName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
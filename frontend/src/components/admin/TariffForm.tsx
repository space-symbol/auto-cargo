import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tariff } from '@/types/api';
import { api } from '@/lib/api';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  baseRate: z.number({
    required_error: 'Базовая ставка обязательна',
    invalid_type_error: 'Введите число',
  }).min(0, 'Базовая ставка должна быть положительной'),
  weightRate: z.number({
    required_error: 'Ставка за вес обязательна',
    invalid_type_error: 'Введите число',
  }).min(0, 'Ставка за вес должна быть положительной'),
  volumeRate: z.number({
    required_error: 'Ставка за объем обязательна',
    invalid_type_error: 'Введите число',
  }).min(0, 'Ставка за объем должна быть положительной'),
  distanceRate: z.number({
    required_error: 'Ставка за расстояние обязательна',
    invalid_type_error: 'Введите число',
  }).min(0, 'Ставка за расстояние должна быть положительной'),
  isActive: z.boolean(),
  vehicleTypeIds: z.array(z.string()).min(1, 'Выберите хотя бы один тип ТС'),
  cargoTypeIds: z.array(z.string()).min(1, 'Выберите хотя бы один тип груза'),
});

interface TariffFormProps {
  initialData: Tariff | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function TariffForm({ initialData, onSubmit, onCancel }: TariffFormProps) {
  const [vehicleTypes, setVehicleTypes] = useState<Array<{ id: string; name: string }>>([]);
  const [cargoTypes, setCargoTypes] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      baseRate: initialData?.baseRate || 0,
      weightRate: initialData?.weightRate || 0,
      volumeRate: initialData?.volumeRate || 0,
      distanceRate: initialData?.distanceRate || 0,
      isActive: initialData?.isActive ?? true,
      vehicleTypeIds: initialData?.vehicleTypes.map(vt => vt.vehicleType.id) || [],
      cargoTypeIds: initialData?.cargoTypes.map(ct => ct.cargoType.id) || [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehicleTypesResponse, cargoTypesResponse] = await Promise.all([
          api.get('/reference/vehicle-types'),
          api.get('/reference/cargo-types'),
        ]);
        setVehicleTypes(vehicleTypesResponse.data);
        setCargoTypes(cargoTypesResponse.data);
      } catch (error) {
        console.error('Failed to fetch reference data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="baseRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Базовая ставка</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '') {
                        field.onChange('');
                      } else {
                        field.onChange(Number(value));
                      }
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value === '') {
                        field.onChange(0);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weightRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ставка за вес</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '') {
                        field.onChange('');
                      } else {
                        field.onChange(Number(value));
                      }
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value === '') {
                        field.onChange(0);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="volumeRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ставка за объем</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '') {
                        field.onChange('');
                      } else {
                        field.onChange(Number(value));
                      }
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value === '') {
                        field.onChange(0);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="distanceRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ставка за расстояние</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '') {
                        field.onChange('');
                      } else {
                        field.onChange(Number(value));
                      }
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value === '') {
                        field.onChange(0);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="vehicleTypeIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Типы ТС</FormLabel>
              <Select
                onValueChange={(value) => {
                  if (!field.value.includes(value)) {
                    field.onChange([...field.value, value]);
                  }
                }}
                value={field.value[field.value.length - 1]}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип ТС" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vehicleTypes
                    .filter(type => !field.value.includes(type.id))
                    .map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value.map((id) => {
                  const type = vehicleTypes.find((t) => t.id === id);
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-2 bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      <span>{type?.name}</span>
                      <button
                        type="button"
                        onClick={() => field.onChange(field.value.filter((v) => v !== id))}
                        className="text-primary hover:text-primary/80"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cargoTypeIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Типы груза</FormLabel>
              <Select
                onValueChange={(value) => {
                  if (!field.value.includes(value)) {
                    field.onChange([...field.value, value]);
                  }
                }}
                value={field.value[field.value.length - 1]}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип груза" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cargoTypes
                    .filter(type => !field.value.includes(type.id))
                    .map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value.map((id) => {
                  const type = cargoTypes.find((t) => t.id === id);
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-2 bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      <span>{type?.name}</span>
                      <button
                        type="button"
                        onClick={() => field.onChange(field.value.filter((v) => v !== id))}
                        className="text-primary hover:text-primary/80"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Активен</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Тариф будет доступен для использования
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Отмена
          </Button>
          <Button type="submit">
            {initialData ? 'Сохранить' : 'Создать'}
          </Button>
        </div>
      </form>
    </Form>
  );
} 
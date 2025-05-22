import React, { useState } from 'react';
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cargoApi, referenceApi } from '@/api/api';
import { toast } from 'sonner';
import { VehicleType, CargoType, CargoRequest, CalculateCostRequest } from '@/types/api';
import { AddressInput } from '@/components/ui/address-input';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ArrowDown, ArrowRight, Loader2 } from 'lucide-react';
import { useDistanceCalculation } from '@/hooks/useDistanceCalculation';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const costCalculationSchema = z.object({
  cargoType: z.string().min(1, 'Выберите тип груза'),
  weight: z.string()
    .min(1, 'Укажите вес груза')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Вес должен быть положительным числом'
    }),
  volume: z.string()
    .min(1, 'Укажите объем груза')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Объем должен быть положительным числом'
    }),
  from: z.string()
    .min(1, 'Укажите пункт отправления')
    .min(2, 'Минимум 2 символа')
    .max(100, 'Максимум 100 символов'),
  to: z.string()
    .min(1, 'Укажите пункт назначения')
    .min(2, 'Минимум 2 символа')
    .max(100, 'Максимум 100 символов'),
  vehicleType: z.string().min(1, 'Выберите тип транспорта'),
});

type CostCalculationValues = z.infer<typeof costCalculationSchema>;

export default function CargoRequestForm() {
  const [calculatedCost, setCalculatedCost] = useState<number | null>(null);
  const [fromCoordinates, setFromCoordinates] = useState<[number, number] | null>(null);
  const [toCoordinates, setToCoordinates] = useState<[number, number] | null>(null);
  const { distance, error: distanceError, loading: isCalculatingDistance } = useDistanceCalculation(fromCoordinates, toCoordinates);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Загрузка справочных данных
  const { data: vehicleTypes = [], isLoading: isLoadingVehicleTypes } = useQuery({
    queryKey: ['vehicleTypes'],
    queryFn: referenceApi.getVehicleTypes,
  });

  const { data: cargoTypes = [], isLoading: isLoadingCargoTypes } = useQuery({
    queryKey: ['cargoTypes'],
    queryFn: referenceApi.getCargoTypes,
  });

  const calculateCostMutation = useMutation({
    mutationFn: (data: CalculateCostRequest) => 
      cargoApi.calculateCost(data),
    onSuccess: (result) => {
      setCalculatedCost(result.cost);
      if (!user) {
        toast.info('Для оформления заявки необходимо авторизоваться');
      }
    },
    onError: () => {
      toast.error('Ошибка при расчете стоимости');
    },
  });

  const form = useForm<CostCalculationValues>({
    resolver: zodResolver(costCalculationSchema),
    defaultValues: {
      cargoType: '',
      weight: '',
      volume: '',
      from: '',
      to: '',
      vehicleType: '',
    },
  });

  const onCalculateCost = async (data: CostCalculationValues) => {
    if (!distance) {
      toast.error('Не удалось рассчитать расстояние между пунктами');
      return;
    }

    calculateCostMutation.mutate({
      cargoType: parseInt(data.cargoType),
      weight: parseFloat(data.weight),
      volume: parseFloat(data.volume),
      from: data.from,
      to: data.to,
      distance: distance,
      vehicleType: parseInt(data.vehicleType),
    });
  };

  const handleSubmitRequest = () => {
    if (!user) {
      navigate('/login', { state: { from: '/cargo-request' } });
      return;
    }

    const formData = {
      cargoType: parseInt(form.getValues('cargoType')),
      weight: parseFloat(form.getValues('weight')),
      volume: parseFloat(form.getValues('volume')),
      from: form.getValues('from'),
      to: form.getValues('to'),
      distance: distance,
      vehicleType: parseInt(form.getValues('vehicleType')),
      cost: calculatedCost
    };

    sessionStorage.setItem('cargoCalculationData', JSON.stringify(formData));
    navigate('/request-submission');
  };

  // Показываем состояние загрузки
  if (isLoadingVehicleTypes || isLoadingCargoTypes) {
    return (
      <Card className="shadow-card max-w-4xl mx-auto">
        <CardContent className="py-10 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Загрузка данных...</span>
        </CardContent>
      </Card>
    );
  }

  // Показываем сообщение, если нет данных
  if (cargoTypes.length === 0 || vehicleTypes.length === 0) {
    return (
      <Card className="shadow-card max-w-4xl mx-auto">
        <CardContent className="py-10 text-center">
          <p className="text-lg text-muted-foreground">Нет доступных данных</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Обновить страницу
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card max-w-4xl mx-auto">
      <CardContent className='p-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onCalculateCost)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="cargoType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тип груза</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип груза" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cargoTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тип транспорта</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип транспорта" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vehicleTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Вес груза (кг)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Введите вес" 
                        min="0.1"
                        step="0.1"
                        inputMode="decimal"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Объем груза (м³)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Введите объем" 
                        min="0.1"
                        step="0.1"
                        inputMode="decimal"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Откуда</FormLabel>
                    <FormControl>
                      <AddressInput
                        value={field.value}
                        onChange={(value, coordinates) => {
                          field.onChange(value);
                          setFromCoordinates(coordinates || null);
                        }}
                        placeholder="Введите пункт отправления"
                        error={!!form.formState.errors.from}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Куда</FormLabel>
                    <FormControl>
                      <AddressInput
                        value={field.value}
                        onChange={(value, coordinates) => {
                          field.onChange(value);
                          setToCoordinates(coordinates || null);
                        }}
                        placeholder="Введите пункт назначения"
                        error={!!form.formState.errors.to}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {distanceError && (
              <div className="text-sm text-red-500">
                {distanceError}
              </div>
            )}

            {isCalculatingDistance && (
              <div className="text-sm text-muted-foreground">
                Расчет расстояния...
              </div>
            )}

            {distance && !isCalculatingDistance && (
              <div className="text-sm text-muted-foreground">
                Расстояние: {distance.toFixed(1)} км
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button 
                type="submit" 
                disabled={calculateCostMutation.isPending || isCalculatingDistance || !distance}
                className="w-full sm:w-auto"
              >
                {calculateCostMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Расчет...
                  </>
                ) : (
                  'Рассчитать стоимость'
                )}
              </Button>
            </div>

            {calculatedCost && (
              <div className="mt-6 p-6 border rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 shadow-sm">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Результаты расчета</h3>
                      <p className="text-sm text-muted-foreground mt-1">Предварительная стоимость доставки</p>
                    </div>
                    <div className="text-3xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg">
                      {calculatedCost.toLocaleString()} ₽
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-background/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-3">Параметры груза</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <span className="text-muted-foreground">Тип груза:</span>
                            <span className="font-medium">{cargoTypes.find(t => t.id.toString() === form.getValues('cargoType'))?.name}</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-muted-foreground">Вес:</span>
                            <span className="font-medium">{form.getValues('weight')} кг</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-muted-foreground">Объем:</span>
                            <span className="font-medium">{form.getValues('volume')} м³</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-background/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-3">Транспорт</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Тип:</span>
                          <span className="font-medium">{vehicleTypes.find(t => t.id.toString() === form.getValues('vehicleType'))?.name}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-3">Маршрут</h4>
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-full text-center font-medium px-4 py-2 bg-primary/5 rounded-lg">
                          {form.getValues('from')}
                        </div>
                        <ArrowDown className="w-6 h-6 text-primary" />
                        <div className="w-full text-center font-medium px-4 py-2 bg-primary/5 rounded-lg">
                          {form.getValues('to')}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      onClick={handleSubmitRequest}
                      className="w-full"
                    >
                      Оформить заявку
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

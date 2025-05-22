import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { cargoApi } from '@/api/api';
import { CargoRequest, CargoRequestStatus } from '@/types/api';
import Layout from '@/components/layout/Layout';
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

const requestSchema = z.object({
  firstName: z.string()
    .min(1, 'Укажите ваше имя')
    .min(2, 'Минимум 2 символов')
    .max(50, 'Максимум 50 символов')
    .regex(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, 'Имя может содержать только буквы, пробелы и дефис'),
  lastName: z.string()
    .min(1, 'Укажите вашу фамилию')
    .min(2, 'Минимум 2 символов')
    .max(50, 'Максимум 50 символов')
    .regex(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, 'Фамилия может содержать только буквы, пробелы и дефис'),
  email: z.string()
    .min(1, 'Укажите email')
    .email('Введите корректный email')
    .max(100, 'Максимум 100 символов'),
  phone: z.string()
    .min(1, 'Укажите номер телефона')
    .regex(/^\+?[0-9\s()-]{10,15}$/, 'Введите корректный номер телефона'),
});

type RequestValues = z.infer<typeof requestSchema>;

export default function CargoRequestSubmission() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [calculationData, setCalculationData] = useState<{
    cargoType: number;
    weight: number;
    volume: number;
    from: string;
    to: string;
    distance: number;
    vehicleType: number;
    cost: number;
  } | null>(null);

  const form = useForm<RequestValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  const submitRequestMutation = useMutation({
    mutationFn: (data: CargoRequest) => cargoApi.submitRequest(data),
    onSuccess: () => {
      toast.success('Заявка успешно отправлена');
      sessionStorage.removeItem('cargoCalculationData');
      navigate('/cargo-request');
    },
    onError: () => {
      toast.error('Ошибка при отправке заявки');
    },
  });

  useEffect(() => {
    const storedData = sessionStorage.getItem('cargoCalculationData');
    if (!storedData) {
      toast.error('Данные расчета не найдены');
      navigate('/cargo-request');
      return;
    }

    try {
      const data = JSON.parse(storedData);
      setCalculationData(data);
    } catch (error) {
      toast.error('Ошибка при загрузке данных расчета');
      navigate('/cargo-request');
    }
  }, [navigate]);

  const onSubmit = async (data: RequestValues) => {
    if (!calculationData) {
      toast.error('Данные расчета не найдены');
      return;
    }

    const requestData: Partial<CargoRequest> = {
      ...calculationData,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      status: CargoRequestStatus.PENDING,
      userId: user?.id,
    };

    submitRequestMutation.mutate(requestData as CargoRequest);
  };

  if (!calculationData) {
    return (
      <Layout>
        <div className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Загрузка данных...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-company-dark">Оформление заявки</h1>
            <p className="text-muted-foreground mt-2">
              Заполните контактные данные для оформления заявки на перевозку груза
            </p>
          </div>

          <Card className="shadow-card max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Контактные данные</CardTitle>
              <CardDescription>
                Заполните форму для оформления заявки на перевозку груза
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ваше имя</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Введите ваше имя" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ваша фамилия</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Введите вашу фамилию" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="Введите email" 
                              autoComplete="email"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Телефон</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              placeholder="Введите номер телефона" 
                              autoComplete="tel"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/cargo-request')}
                      className="w-full sm:w-auto"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Назад
                    </Button>
                    <Button 
                      type="submit"
                      disabled={submitRequestMutation.isPending}
                      className="w-full sm:w-auto"
                    >
                      {submitRequestMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        'Отправить заявку'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
} 
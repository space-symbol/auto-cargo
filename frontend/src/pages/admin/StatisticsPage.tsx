import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Statistics } from '@/components/admin/Statistics';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/auth/AuthProvider';
import { api } from '@/lib/api';
import { CargoRequestStatus } from '@/types/cargo';
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface StatisticsData {
  totalRequests: number;
  completedRequests: number;
  totalCost: number;
  requestsByStatus: Array<{
    status: CargoRequestStatus;
    _count: number;
  }>;
  requestsByCargoType: Array<{
    cargoTypeId: string;
    name: string;
    _count: number;
  }>;
  requestsByVehicleType: Array<{
    vehicleTypeId: string;
    name: string;
    _count: number;
  }>;
}

export function StatisticsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    fetchStatistics();
  }, [user]);

  const fetchStatistics = async (startDate?: string, endDate?: string) => {
    try {
      setLoading(true);
      const response = await api.get('/cargo/admin/statistics', {
        params: {
          startDate,
          endDate,
        },
      });
      setStatistics(response.data);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить статистику",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    fetchStatistics(startDate, endDate);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">Загрузка статистики...</p>
        </div>
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <p className="text-lg text-muted-foreground">Нет данных для отображения</p>
            <p className="text-sm text-muted-foreground">Попробуйте выбрать другой период времени</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Статистика</h1>
      <Statistics data={statistics} onDateRangeChange={handleDateRangeChange} />
    </div>
  );
} 
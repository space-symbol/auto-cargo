import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from '@/lib/utils';
import { CargoRequestStatus } from '@/types/cargo';
import { Package, Truck, DollarSign, Calendar, BarChart3 } from 'lucide-react';

interface StatisticsProps {
  data: {
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
  };
  onDateRangeChange: (startDate: string, endDate: string) => void;
}

const statusLabels: Record<CargoRequestStatus, string> = {
  PENDING: 'Ожидает',
  PROCESSING: 'В обработке',
  IN_TRANSIT: 'В пути',
  COMPLETED: 'Завершена',
  CANCELLED: 'Отменена',
};

const statusColors: Record<CargoRequestStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  IN_TRANSIT: 'bg-purple-100 text-purple-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

const EmptyState = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center h-24 text-muted-foreground">
    {message}
  </div>
);

export function Statistics({ data, onDateRangeChange }: StatisticsProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDateRangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDateRangeChange(startDate, endDate);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Фильтр по датам
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDateRangeSubmit} className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Начальная дата</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Конечная дата</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <Button type="submit">Применить</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Всего заявок
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.totalRequests}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Завершенные заявки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.completedRequests}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {((data.completedRequests / data.totalRequests) * 100).toFixed(1)}% от общего числа
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Общая стоимость
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(data.totalCost)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Заявки по статусам
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.requestsByStatus.length > 0 ? (
              <div className="space-y-3">
                {data.requestsByStatus.map(({ status, _count }) => (
                  <div key={status} className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-sm ${statusColors[status]}`}>
                      {statusLabels[status]}
                    </span>
                    <span className="font-medium">{_count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message="Нет данных по статусам" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Заявки по типам груза
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.requestsByCargoType.length > 0 ? (
              <div className="space-y-3">
                {data.requestsByCargoType.map(({ cargoTypeId, name, _count }) => (
                  <div key={cargoTypeId} className="flex justify-between items-center">
                    <span className="text-sm">{name}</span>
                    <span className="font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {_count}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message="Нет данных по типам груза" />
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Заявки по типам ТС
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.requestsByVehicleType.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.requestsByVehicleType.map(({ vehicleTypeId, name, _count }) => (
                <div key={vehicleTypeId} className="bg-muted/50 p-4 rounded-lg">
                  <div className="font-medium mb-1">{name}</div>
                  <div className="text-2xl font-bold text-primary">{_count}</div>
                  <div className="text-sm text-muted-foreground">заявок</div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="Нет данных по типам ТС" />
          )}
        </CardContent>
      </Card>
    </div>
  );
} 
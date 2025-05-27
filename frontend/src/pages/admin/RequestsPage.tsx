import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RequestsList } from '@/components/admin/RequestsList';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/auth/AuthProvider';
import { CargoRequestStatus, CargoRequest } from '@/types/api';
import { cargoApi } from '@/api/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const LoadingSkeleton = () => (
  <div className="space-y-4 animate-in fade-in-50">
    <div className="flex items-center justify-between mb-6">
      <Skeleton className="h-10 w-[180px]" />
      <div className="flex items-center space-x-2">
        <Skeleton className="h-10 w-[120px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
    </div>
    <div className="rounded-md border">
      <div className="border-b bg-muted/50 p-4">
        <div className="grid grid-cols-9 gap-4">
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="p-4 border-b last:border-b-0">
          <div className="grid grid-cols-9 gap-4">
            <Skeleton className="h-4 w-[80px]" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center mt-6">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
      </div>
    </div>
  </div>
);

export function RequestsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requests, setRequests] = useState<CargoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  });
  const [statusFilter, setStatusFilter] = useState<CargoRequestStatus | ''>('');
  const [sortBy, setSortBy] = useState<'date' | 'cost'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (!user || (user.role !== 'ADMIN' && user.role !== 'MANAGER')) {
      navigate('/');
      return;
    }
    fetchRequests();
  }, [user, pagination.page, statusFilter, sortBy, sortOrder]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await cargoApi.getAllRequests(pagination.page, pagination.pageSize, {
        status: statusFilter || undefined,
        sortBy,
        sortOrder,
      });
      setRequests(response.requests);
      setPagination({
        total: response.pagination.total,
        page: response.pagination.currentPage,
        pageSize: response.pagination.pageSize,
        totalPages: response.pagination.totalPages,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить список заявок",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (requestId: string, status: CargoRequestStatus, comment?: string) => {
    try {
      await cargoApi.updateRequestStatus(requestId, status, comment);
      toast({
        title: "Статус обновлен",
        description: "Статус заявки успешно изменен",
      });
      fetchRequests();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус заявки",
        variant: "destructive",
      });
    }
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleStatusFilterChange = (status: CargoRequestStatus | '') => {
    setStatusFilter(status);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSortChange = (newSortBy: 'date' | 'cost', newSortOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="shadow-lg min-h-[800px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold">Управление заявками</CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex flex-col flex-grow">
          <RequestsList
            className='flex-grow'
            requests={requests}
            pagination={pagination}
            onStatusChange={handleStatusChange}
            onPageChange={handlePageChange}
            onStatusFilterChange={handleStatusFilterChange}
            onSortChange={handleSortChange}
          />
        </CardContent>
      </Card>
    </div>
  );
} 
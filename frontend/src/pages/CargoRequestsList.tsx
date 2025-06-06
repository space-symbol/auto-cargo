import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cargoApi } from '@/api/api';
import { CargoRequestStatus, CargoRequest } from '@/types/api';
import { formatDate } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Package, Truck, Calendar, DollarSign } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from '@tanstack/react-query';

const statusColors: Record<CargoRequestStatus, string> = {
  [CargoRequestStatus.PENDING]: 'bg-yellow-500 hover:bg-yellow-600',
  [CargoRequestStatus.PROCESSING]: 'bg-blue-500 hover:bg-blue-600',
  [CargoRequestStatus.IN_TRANSIT]: 'bg-blue-500 hover:bg-blue-600',
  [CargoRequestStatus.COMPLETED]: 'bg-green-500 hover:bg-green-600',
  [CargoRequestStatus.CANCELLED]: 'bg-red-500 hover:bg-red-600',
};

const statusLabels: Record<CargoRequestStatus, string> = {
  [CargoRequestStatus.PENDING]: 'В ожидании',
  [CargoRequestStatus.PROCESSING]: 'В обработке',
  [CargoRequestStatus.IN_TRANSIT]: 'В пути',
  [CargoRequestStatus.COMPLETED]: 'Завершено',
  [CargoRequestStatus.CANCELLED]: 'Отменено',
};


export default function CargoRequestsList() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<CargoRequestStatus | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'date' | 'cost'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedRequest, setSelectedRequest] = useState<CargoRequest | null>(null);
  const [requestToCancel, setRequestToCancel] = useState<CargoRequest | null>(null);
  const { toast } = useToast();
  const pageSize = 10;
  const queryClient = useQueryClient();

  const { data, error, refetch } = useQuery({
    queryKey: ['cargo-requests', page, statusFilter, sortBy, sortOrder],
    queryFn: () => cargoApi.getUserRequests(page, pageSize, {
      status: statusFilter !== 'ALL' ? statusFilter : undefined,
      sortBy,
      sortOrder
    }),
  });

  const handleCancelRequest = async (request: CargoRequest) => {
    try {
      await cargoApi.cancelRequest(request.id);
      queryClient.invalidateQueries({ queryKey: ['cargo-requests'] });
      toast({
        title: "Заявка отменена",
        description: "Заявка успешно отменена",
      });
      setRequestToCancel(null);
    } catch (error) {
      console.error('Failed to cancel request:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось отменить заявку",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl font-bold">Мои заявки</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <div className="text-red-500 text-lg mb-2">Произошла ошибка при загрузке данных</div>
              <Button 
                variant="outline" 
                onClick={() => refetch()}
                className="mt-4"
              >
                Попробовать снова
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const requests = data?.requests || [];
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Мои заявки</CardTitle>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as CargoRequestStatus | 'ALL')}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Фильтр по статусу" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Все статусы</SelectItem>
                  {Object.entries(statusLabels).map(([status, label]) => (
                    <SelectItem key={status} value={status}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'date' | 'cost')}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">По дате</SelectItem>
                  <SelectItem value="cost">По стоимости</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground text-lg mb-4">У вас пока нет заявок</div>
              <Button variant="outline" onClick={() => window.location.href = '/cargo-request'}>
                Создать заявку
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Откуда</TableHead>
                      <TableHead>Куда</TableHead>
                      <TableHead className="text-right">Вес</TableHead>
                      <TableHead className="text-right">Объем</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Стоимость</TableHead>
                      <TableHead>Дата создания</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request: CargoRequest) => (
                      <TableRow 
                        key={request.id} 
                        className="hover:bg-muted/50 cursor-pointer"
                        onClick={() => setSelectedRequest(request)}
                      >
                        <TableCell className="font-medium">{request.id.slice(0, 8)}...</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {request.fromAddress?.city || '-'}, {request.fromAddress?.street || '-'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {request.toAddress?.city || '-'}, {request.toAddress?.street || '-'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-nowrap">{request.weight} кг</TableCell>
                        <TableCell className="text-right">{request.volume} м³</TableCell>
                        <TableCell>
                          <Badge className={`${statusColors[request.status]} text-white text-nowrap`}>
                            {statusLabels[request.status]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {request.cost ? `${request.cost.toLocaleString()} ₽` : '-'}
                        </TableCell>
                        <TableCell className='text-nowrap'>{formatDate(request.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          {request.status === CargoRequestStatus.PENDING && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setRequestToCancel(request);
                              }}
                            >
                              Отменить
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>

              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            onClick={() => setPage(pageNum)}
                            isActive={page === pageNum}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Детали заявки</DialogTitle>
            <DialogDescription>
              Информация о заявке на перевозку груза
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span>Тип груза</span>
                  </div>
                  <div className="font-medium">{selectedRequest.cargoType?.name || '-'}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>Тип транспорта</span>
                  </div>
                  <div className="font-medium">{selectedRequest.vehicleType?.name || '-'}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>Стоимость</span>
                  </div>
                  <div className="font-medium">{selectedRequest.cost ? `${selectedRequest.cost.toLocaleString()} ₽` : 'Не рассчитана'}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Адрес отправления</span>
                  </div>
                  <div className="font-medium">
                    {selectedRequest.fromAddress ? 
                      `${selectedRequest.fromAddress.city}, ${selectedRequest.fromAddress.street}, ${selectedRequest.fromAddress.building}` : 
                      '-'}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Адрес назначения</span>
                  </div>
                  <div className="font-medium">
                    {selectedRequest.toAddress ? 
                      `${selectedRequest.toAddress.city}, ${selectedRequest.toAddress.street}, ${selectedRequest.toAddress.building}` : 
                      '-'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span>Вес груза</span>
                  </div>
                  <div className="font-medium">{selectedRequest.weight} кг</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span>Объем груза</span>
                  </div>
                  <div className="font-medium">{selectedRequest.volume} м³</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Дата создания</span>
                </div>
                <div className="font-medium">{formatDate(selectedRequest.createdAt)}</div>
              </div>

              <div className="flex justify-end gap-4">
                {selectedRequest.status === CargoRequestStatus.PENDING && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleCancelRequest(selectedRequest);
                      setSelectedRequest(null);
                    }}
                  >
                    Отменить заявку
                  </Button>
                )}
                <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                  Закрыть
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог подтверждения отмены */}
      <Dialog open={!!requestToCancel} onOpenChange={() => setRequestToCancel(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Отмена заявки</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите отменить эту заявку? Это действие нельзя будет отменить.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => setRequestToCancel(null)}>
              Нет, оставить
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => requestToCancel && handleCancelRequest(requestToCancel)}
            >
              Да, отменить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
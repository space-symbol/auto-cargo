import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CargoRequestStatus, CargoRequest } from '@/types/api';
import { formatDate, formatCurrency, cn } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, MapPin, Package, Truck } from 'lucide-react';
import { StatusChangeDialog } from './StatusChangeDialog';

interface RequestsListProps {
  className?: string;
  requests: CargoRequest[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  onStatusChange: (requestId: string, status: CargoRequestStatus, comment: string) => Promise<void>;
  onPageChange: (page: number) => void;
  onStatusFilterChange: (status: CargoRequestStatus | '') => void;
  onSortChange: (sortBy: 'date' | 'cost', sortOrder: 'asc' | 'desc') => void;
}

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

const statusOrder = [
  CargoRequestStatus.PENDING,
  CargoRequestStatus.PROCESSING,
  CargoRequestStatus.IN_TRANSIT,
  CargoRequestStatus.COMPLETED,
];

export function RequestsList({
  className,
  requests,
  pagination,
  onStatusChange,
  onPageChange,
  onStatusFilterChange,
  onSortChange,
}: RequestsListProps) {
  const [sortBy, setSortBy] = useState<'date' | 'cost'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusChangeDialog, setStatusChangeDialog] = useState<{
    isOpen: boolean;
    requestId: string;
    currentStatus: CargoRequestStatus;
    newStatus: CargoRequestStatus;
  } | null>(null);

  const handleSort = (newSortBy: 'date' | 'cost') => {
    const newSortOrder = sortBy === newSortBy && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    onSortChange(newSortBy, newSortOrder);
  };

  const handleStatusChange = async (requestId: string, status: CargoRequestStatus) => {
    const request = requests.find(r => r.id === requestId);
    if (!request) return;

    setStatusChangeDialog({
      isOpen: true,
      requestId,
      currentStatus: request.status,
      newStatus: status,
    });
  };

  const handleStatusConfirm = async (status: CargoRequestStatus, comment: string) => {
    if (!statusChangeDialog) return;
    
    try {
      await onStatusChange(statusChangeDialog.requestId, status, comment);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const getAvailableStatuses = (currentStatus: CargoRequestStatus) => {
    const currentIndex = statusOrder.indexOf(currentStatus);
    
    if (currentStatus === CargoRequestStatus.COMPLETED) {
      return [];
    }

    if (currentStatus === CargoRequestStatus.CANCELLED) {
      return [];
    }

    const nextStatuses = statusOrder.slice(currentIndex + 1);
    
    return [...nextStatuses, CargoRequestStatus.CANCELLED];
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select onValueChange={(value) => onStatusFilterChange(value === 'ALL' ? '' : value as CargoRequestStatus)}>
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
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={sortBy === 'date' ? 'default' : 'outline'}
            onClick={() => handleSort('date')}
          >
            По дате {sortBy === 'date' && (sortOrder === 'desc' ? '↓' : '↑')}
          </Button>
          <Button
            variant={sortBy === 'cost' ? 'default' : 'outline'}
            onClick={() => handleSort('cost')}
          >
            По стоимости {sortBy === 'cost' && (sortOrder === 'desc' ? '↓' : '↑')}
          </Button>
        </div>
      </div>

      <ScrollArea className="rounded-md border flex flex-col flex-grow">
        <Table className='flex-grow'>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Клиент</TableHead>
              <TableHead>Тип груза</TableHead>
              <TableHead>Тип ТС</TableHead>
              <TableHead>Откуда</TableHead>
              <TableHead>Куда</TableHead>
              <TableHead className="text-right">Стоимость</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id.slice(0, 8)}...</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-sm">
                        {request.user?.firstName || '-'} {request.user?.lastName || '-'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {request.user?.email || '-'}
                      </div>
                      {request.user?.company && (
                        <div className="text-xs text-muted-foreground">
                          {request.user.company}
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" />
                    <span>{request.cargoType?.name || '-'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>{request.vehicleType?.name || '-'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      {request.fromAddress?.city || '-'}, {request.fromAddress?.street || '-'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      {request.toAddress?.city || '-'}, {request.toAddress?.street || '-'}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {request.cost ? formatCurrency(request.cost) : '-'}
                </TableCell>
                <TableCell>
                  <Badge className={`${statusColors[request.status]} text-white text-nowrap`}>
                    {statusLabels[request.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-nowrap">{formatDate(request.createdAt)}</TableCell>
                <TableCell>
                  {request.status !== CargoRequestStatus.COMPLETED && 
                   request.status !== CargoRequestStatus.CANCELLED ? (
                    <Select
                      onValueChange={(value) => handleStatusChange(request.id, value as CargoRequestStatus)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Изменить статус" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableStatuses(request.status).map((status) => (
                          <SelectItem 
                            key={status} 
                            value={status}
                          >
                            {statusLabels[status]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Статус нельзя изменить
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <div className="mt-auto">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => onPageChange(Math.max(1, pagination.page - 1))}
                className={pagination.page === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => onPageChange(pageNum)}
                    isActive={pagination.page === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext 
                onClick={() => onPageChange(Math.min(pagination.totalPages, pagination.page + 1))}
                className={pagination.page === pagination.totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {statusChangeDialog && (
        <StatusChangeDialog
          isOpen={statusChangeDialog.isOpen}
          onClose={() => setStatusChangeDialog(null)}
          onConfirm={handleStatusConfirm}
          currentStatus={statusChangeDialog.currentStatus}
          newStatus={statusChangeDialog.newStatus}
        />
      )}
    </div>
  );
} 
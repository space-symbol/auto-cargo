import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cargoApi } from '@/api/api';
import { CargoRequestStatus } from '@/types/api';
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
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

const statusColors: Record<CargoRequestStatus, string> = {
  [CargoRequestStatus.PENDING]: 'bg-yellow-500 hover:bg-yellow-600',
  [CargoRequestStatus.IN_PROGRESS]: 'bg-blue-500 hover:bg-blue-600',
  [CargoRequestStatus.COMPLETED]: 'bg-green-500 hover:bg-green-600',
  [CargoRequestStatus.CANCELLED]: 'bg-red-500 hover:bg-red-600',
};

const statusLabels: Record<CargoRequestStatus, string> = {
  [CargoRequestStatus.PENDING]: 'В ожидании',
  [CargoRequestStatus.IN_PROGRESS]: 'В работе',
  [CargoRequestStatus.COMPLETED]: 'Завершено',
  [CargoRequestStatus.CANCELLED]: 'Отменено',
};

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-full" />
    </div>
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <Skeleton className="h-16 w-full" />
      </div>
    ))}
  </div>
);

export default function CargoRequestsList() {
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ['cargo-requests', page],
    queryFn: () => cargoApi.getUserRequests(page, pageSize),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl font-bold">Мои заявки</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <LoadingSkeleton />
          </CardContent>
        </Card>
      </div>
    );
  }

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
                onClick={() => window.location.reload()}
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

  const requests = data?.items || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold">Мои заявки</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground text-lg mb-4">У вас пока нет заявок</div>
              <Button variant="outline" onClick={() => window.location.href = '/request-submission'}>
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id} className="hover:bg-muted/50 text-nowrap">
                        <TableCell className="font-medium">{request.id.slice(0, 8)}...</TableCell>
                        <TableCell>{request.from}</TableCell>
                        <TableCell>{request.to}</TableCell>
                        <TableCell className="text-right">{request.weight} кг</TableCell>
                        <TableCell className="text-right">{request.volume} м³</TableCell>
                        <TableCell>
                          <Badge className={`${statusColors[request.status]} text-white`}>
                            {statusLabels[request.status]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {request.cost ? `${request.cost.toLocaleString()} ₽` : '-'}
                        </TableCell>
                        <TableCell>{formatDate(request.createdAt)}</TableCell>
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
    </div>
  );
} 
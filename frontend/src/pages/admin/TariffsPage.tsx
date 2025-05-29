import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TariffsList } from '@/components/admin/TariffsList';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/auth/AuthProvider';
import { api } from '@/lib/api';
import { Tariff } from '@/types/api';
import { Plus, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { TariffForm } from '@/components/admin/TariffForm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginatedResponse {
  tariffs: Tariff[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function TariffsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTariff, setSelectedTariff] = useState<Tariff | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [tariffToDelete, setTariffToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    fetchTariffs();
  }, [user, currentPage, pageSize]);

  const fetchTariffs = async () => {
    try {
      setLoading(true);
      const response = await api.get<PaginatedResponse>(`/tariffs?page=${currentPage}&limit=${pageSize}`);
      setTariffs(response.data.tariffs);
      setTotalPages(response.data.pagination.totalPages);
      setTotalItems(response.data.pagination.total);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить список тарифов",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tariff: Tariff) => {
    setSelectedTariff(tariff);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (tariffId: string) => {
    setTariffToDelete(tariffId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!tariffToDelete) return;

    try {
      await api.delete(`/tariffs/${tariffToDelete}`);
      toast({
        title: "Успех",
        description: "Тариф успешно удален",
      });
      fetchTariffs();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить тариф",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setTariffToDelete(null);
    }
  };

  const handleCreate = () => {
    setSelectedTariff(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (selectedTariff) {
        await api.patch(`/tariffs/${selectedTariff.id}`, data);
        toast({
          title: "Успех",
          description: "Тариф успешно обновлен",
        });
      } else {
        await api.post('/tariffs', data);
        toast({
          title: "Успех",
          description: "Тариф успешно создан",
        });
      }
      setIsDialogOpen(false);
      fetchTariffs();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить тариф",
        variant: "destructive",
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize: string) => {
    setPageSize(Number(newSize));
    setCurrentPage(1); // Сбрасываем на первую страницу при изменении размера
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">Загрузка тарифов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Управление тарифами</CardTitle>
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Создать тариф
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <TariffsList
            tariffs={tariffs}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Показано {tariffs.length} из {totalItems}
              </span>
              <Select
                value={pageSize.toString()}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Страница {currentPage} из {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedTariff ? 'Редактирование тарифа' : 'Создание тарифа'}
            </DialogTitle>
            <DialogDescription>
              {selectedTariff
                ? 'Измените параметры тарифа'
                : 'Заполните форму для создания нового тарифа'}
            </DialogDescription>
          </DialogHeader>
          <TariffForm
            initialData={selectedTariff}
            onSubmit={handleSubmit}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтверждение удаления</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить этот тариф? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TariffsList } from '@/components/admin/TariffsList';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/lib/auth/AuthProvider';
import { api } from '@/lib/api';
import { Tariff } from '@/types/api';
import { Plus, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TariffForm } from '@/components/admin/TariffForm';

export function TariffsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTariff, setSelectedTariff] = useState<Tariff | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    fetchTariffs();
  }, [user]);

  const fetchTariffs = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tariffs');
      setTariffs(response.data);
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

  const handleDelete = async (tariffId: string) => {
    try {
      await api.delete(`/tariffs/${tariffId}`);
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
            onDelete={handleDelete}
          />
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
    </div>
  );
} 
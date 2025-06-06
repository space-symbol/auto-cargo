import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useCargoRequestForm } from '@/hooks/useCargoRequestForm';
import { cargoApi } from '@/api/api';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function CargoRequestSubmissionForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { formData, clearFormData } = useCargoRequestForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Если нет сохраненных данных формы, перенаправляем на страницу расчета
    if (!formData) {
      navigate('/cargo-request');
      return;
    }

    // Если пользователь не авторизован, перенаправляем на страницу авторизации
    if (!user) {
      navigate('/auth/login', {
        state: {
          from: '/cargo/request/submission',
          message: 'Для оформления заявки необходимо авторизоваться'
        }
      });
      return;
    }
  }, [formData, navigate, user]);

  const handleSubmit = async () => {
    if (!formData || !user) return;

    setIsSubmitting(true);
    try {
      await cargoApi.submitRequest({
        ...formData,
        userId: user.id,
        transportationDateTime: new Date().toISOString()
      });

      // Очищаем сохраненные данные формы
      clearFormData();

      toast({
        title: 'Успех',
        description: 'Заявка успешно создана'
      });

      // Перенаправляем на страницу со списком заявок
      navigate('/cargo/requests');
    } catch {
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать заявку',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-card rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Подтверждение заявки</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Данные о грузе</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Тип груза</p>
                <p>{formData.cargoTypeId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Тип ТС</p>
                <p>{formData.vehicleTypeId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Вес</p>
                <p>{formData.weight} кг</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Объем</p>
                <p>{formData.volume} м³</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Адрес отправления</h3>
            <p>
              {formData.fromAddress.city}, {formData.fromAddress.street}, {formData.fromAddress.building}
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Адрес доставки</h3>
            <p>
              {formData.toAddress.city}, {formData.toAddress.street}, {formData.toAddress.building}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate('/cargo-request')}
            disabled={isSubmitting}
          >
            Назад
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Отправка...
              </>
            ) : (
              'Подтвердить заявку'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 
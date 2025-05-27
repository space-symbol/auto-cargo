import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CargoRequestStatus } from '@/types/api';

const statusOrder = [
  CargoRequestStatus.PENDING,
  CargoRequestStatus.PROCESSING,
  CargoRequestStatus.IN_TRANSIT,
  CargoRequestStatus.COMPLETED,
];

const statusLabels: Record<CargoRequestStatus, string> = {
  [CargoRequestStatus.PENDING]: 'В ожидании',
  [CargoRequestStatus.PROCESSING]: 'В обработке',
  [CargoRequestStatus.IN_TRANSIT]: 'В пути',
  [CargoRequestStatus.COMPLETED]: 'Завершено',
  [CargoRequestStatus.CANCELLED]: 'Отменено',
};

interface StatusChangeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (status: CargoRequestStatus, comment: string) => void;
  currentStatus: CargoRequestStatus;
  newStatus: CargoRequestStatus;
}

export function StatusChangeDialog({
  isOpen,
  onClose,
  onConfirm,
  currentStatus,
  newStatus,
}: StatusChangeDialogProps) {
  const [comment, setComment] = useState('');

  const currentStatusIndex = statusOrder.indexOf(currentStatus);
  const newStatusIndex = statusOrder.indexOf(newStatus);

  const isValidTransition = 
    // Можно отменить заявку, если она не завершена
    (newStatus === CargoRequestStatus.CANCELLED && currentStatus !== CargoRequestStatus.COMPLETED) ||
    // Или перейти к следующему статусу
    (newStatusIndex > currentStatusIndex);

  const handleConfirm = () => {
    onConfirm(newStatus, comment);
    setComment('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Изменение статуса заявки</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {isValidTransition ? (
            <>
              <DialogDescription>
                Вы собираетесь изменить статус заявки с "{statusLabels[currentStatus]}" на "{statusLabels[newStatus]}".
              </DialogDescription>
              {newStatus === CargoRequestStatus.CANCELLED ? (
                <DialogDescription className="text-sm text-muted-foreground">
                  Отмена заявки является необратимым действием.
                </DialogDescription>
              ) : (
                <DialogDescription className="text-sm text-muted-foreground">
                  Обратите внимание, что нельзя вернуть заявку к предыдущему статусу.
                </DialogDescription>
              )}
            </>
          ) : (
            <DialogDescription className="text-destructive">
              {currentStatus === CargoRequestStatus.COMPLETED && newStatus === CargoRequestStatus.CANCELLED
                ? 'Нельзя отменить завершенную заявку.'
                : 'Невозможно изменить статус с "' + statusLabels[currentStatus] + '" на "' + statusLabels[newStatus] + '". ' +
                  'Можно только перейти к следующему статусу или отменить заявку (кроме завершенных).'}
            </DialogDescription>
          )}
          <div className="py-4">
            <Textarea
              placeholder="Комментарий к изменению статуса (необязательно)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isValidTransition}
          >
            Подтвердить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 
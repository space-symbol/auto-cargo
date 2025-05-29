import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tariff } from '@/types/api';
import { formatCurrency } from '@/lib/utils';
import { Package, Truck, Edit, Trash2 } from 'lucide-react';

interface TariffsListProps {
  tariffs: Tariff[];
  onEdit: (tariff: Tariff) => void;
  onDelete: (tariffId: string) => void;
}

export function TariffsList({ tariffs, onEdit, onDelete }: TariffsListProps) {
  return (
    <ScrollArea className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Название</TableHead>
            <TableHead>Типы ТС</TableHead>
            <TableHead>Типы груза</TableHead>
            <TableHead className="text-right">Базовая ставка</TableHead>
            <TableHead className="text-right">За вес</TableHead>
            <TableHead className="text-right">За объем</TableHead>
            <TableHead className="text-right">За расстояние</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tariffs.map((tariff) => (
            <TableRow key={tariff.id}>
              <TableCell className="font-medium">{tariff.name}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {tariff.vehicleTypes.map(({ vehicleType }) => (
                    <Badge key={vehicleType.id} variant="secondary" className="flex items-center gap-1">
                      <Truck className="h-3 w-3" />
                      {vehicleType.name}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1 text-nowrap">
                  {tariff.cargoTypes.map(({ cargoType }) => (
                    <Badge key={cargoType.id} variant="secondary" className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      {cargoType.name}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(tariff.baseRate)}
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(tariff.weightRate)}
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(tariff.volumeRate)}
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(tariff.distanceRate)}
              </TableCell>
              <TableCell>
                <Badge variant={tariff.isActive ? "default" : "destructive"}>
                  {tariff.isActive ? "Активен" : "Неактивен"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(tariff)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(tariff.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
} 
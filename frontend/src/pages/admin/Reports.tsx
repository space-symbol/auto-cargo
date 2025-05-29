import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DatePickerInput } from '@/components/ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/api';
import { toast } from 'sonner';

type ReportType = 'cargo-statistics' | 'financial' | 'user-activity';
type ReportFormat = 'pdf' | 'excel' | 'csv';

export default function Reports() {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [reportType, setReportType] = useState<ReportType>('cargo-statistics');
  const [format, setFormat] = useState<ReportFormat>('pdf');
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/api/reports/${reportType}`, {
        params: {
          startDate: startDate?.toISOString().split('T')[0],
          endDate: endDate?.toISOString().split('T')[0],
          format
        },
        responseType: 'blob'
      });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${reportType}-report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Отчет успешно скачан');
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error('Ошибка при скачивании отчета');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Отчеты</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Параметры отчета</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Тип отчета</label>
                  <Select value={reportType} onValueChange={(value) => setReportType(value as ReportType)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип отчета" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cargo-statistics">Статистика по грузоперевозкам</SelectItem>
                      <SelectItem value="financial">Финансовый отчет</SelectItem>
                      <SelectItem value="user-activity">Активность пользователей</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Формат</label>
                  <Select value={format} onValueChange={(value) => setFormat(value as ReportFormat)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите формат" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Начальная дата</label>
                  <DatePickerInput
                    selected={startDate}
                    onSelect={setStartDate}
                    placeholderText="Выберите начальную дату"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Конечная дата</label>
                  <DatePickerInput
                    selected={endDate}
                    onSelect={setEndDate}
                    placeholderText="Выберите конечную дату"
                  />
                </div>
              </div>

              <Button
                onClick={handleDownload}
                disabled={isLoading}
                className="w-full md:w-auto"
              >
                {isLoading ? 'Скачивание...' : 'Скачать отчет'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Описание отчетов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Статистика по грузоперевозкам</h3>
                <p className="text-sm text-gray-600">
                  Отчет содержит статистику по количеству заявок в различных статусах за выбранный период.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Финансовый отчет</h3>
                <p className="text-sm text-gray-600">
                  Детальная информация о финансовых показателях, включая стоимость перевозок и применяемые тарифы.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Активность пользователей</h3>
                <p className="text-sm text-gray-600">
                  Статистика по активности пользователей, включая количество созданных заявок.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
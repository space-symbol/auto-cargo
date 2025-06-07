import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';
import { createObjectCsvWriter } from 'csv-writer';
import { CargoRequestStatus } from '@prisma/client';
import { promises as fs } from 'fs';
import path from 'path';


interface ReportData {
  generatedAt: Date;
  period: {
    startDate?: Date;
    endDate?: Date;
  };
}

interface CargoStatisticsReport extends ReportData {
  statistics: Array<{
    status: CargoRequestStatus;
    _count: number;
  }>;
}

interface FinancialReport extends ReportData {
  financialData: Array<{
    id: string;
    createdAt: Date;
    status: CargoRequestStatus;
    cost: number | null;
    tariff: {
      name: string;
      baseRate: number;
      weightRate: number;
      volumeRate: number;
      distanceRate: number;
    } | null;
  }>;
}

interface UserActivityReport extends ReportData {
  userActivity: Array<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    _count: {
      requests: number;
    };
  }>;
}

interface ReportRecord {
  [key: string]: string | number;
}

const statusLabels: Record<CargoRequestStatus, string> = {
  PENDING: 'Ожидает рассмотрения',
  PROCESSING: 'В обработке',
  IN_TRANSIT: 'В пути',
  COMPLETED: 'Завершена',
  CANCELLED: 'Отменена'
} as const;

export class ReportFormatter {
  static async toPDF(report: CargoStatisticsReport | FinancialReport | UserActivityReport): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const chunks: Buffer[] = [];
        
        // Create PDF document
        const doc = new PDFDocument({
          size: 'A4',
          margins: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50
          },
          autoFirstPage: true,
          bufferPages: true,
          info: {
            Title: 'Отчет',
            Author: 'ТРЭНС ВЭСТОР',
            Subject: 'Отчет по грузоперевозкам',
            Keywords: 'отчет, грузоперевозки',
            CreationDate: new Date()
          }
        });

        // Register custom Times New Roman fonts
        const fontsPath = path.join(__dirname, '../../assets/fonts');
        
        let regularFont = 'Helvetica';
        let boldFont = 'Helvetica-Bold';
        
        try {
          doc.registerFont('TimesRegular', path.join(fontsPath, 'timesnrcyrmt.ttf'));
          doc.registerFont('TimesBold', path.join(fontsPath, 'timesnrcyrmt_bold.ttf'));
          regularFont = 'TimesRegular';
          boldFont = 'TimesBold';
        } catch (fontError) {
          console.warn('Could not load custom fonts, falling back to Helvetica:', fontError);
        }

        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
        doc.on('error', (err) => {
          console.error('PDF generation error:', err);
          reject(err);
        });

        // Add report header
        doc.font(boldFont).fontSize(24).text('ООО "ТРЭНС ВЭСТОР"', { align: 'center' });
        doc.moveDown();
        doc.font(boldFont).fontSize(20).text('ОТЧЕТ', { align: 'center' });
        doc.moveDown();
        doc.font(regularFont).fontSize(12).text(`Дата формирования: ${report.generatedAt.toLocaleString('ru-RU')}`);
        if (report.period.startDate || report.period.endDate) {
          doc.text(`Период: ${report.period.startDate?.toLocaleDateString('ru-RU') || 'начало'} - ${report.period.endDate?.toLocaleDateString('ru-RU') || 'конец'}`);
        }
        doc.moveDown();

        // Add report content based on type
        if ('statistics' in report) {
          doc.font(boldFont).fontSize(16).text('СТАТИСТИКА ПО ГРУЗОПЕРЕВОЗКАМ', { align: 'center' });
          doc.moveDown();
          
          const total = report.statistics.reduce((sum, stat) => sum + stat._count, 0);
          doc.font(regularFont).fontSize(12).text(`Общее количество заявок: ${total}`);
          doc.moveDown();

          // Create table
          const tableTop = doc.y;
          const tableLeft = 50;
          const colWidth = 200;
          
          // Table header
          doc.font(boldFont).fontSize(12).text('Статус заявки', tableLeft, tableTop);
          doc.text('Количество', tableLeft + colWidth, tableTop);
          doc.moveDown();
          
          // Table rows
          doc.font(regularFont);
          report.statistics.forEach((stat) => {
            doc.text(statusLabels[stat.status], tableLeft);
            doc.text(stat._count.toString(), tableLeft + colWidth);
            doc.moveDown();
          });
        } else if ('financialData' in report) {
          doc.font(boldFont).fontSize(16).text('ФИНАНСОВЫЙ ОТЧЕТ', { align: 'center' });
          doc.moveDown();

          const totalCost = report.financialData.reduce((sum, data) => sum + (data.cost || 0), 0);
          doc.font(regularFont).fontSize(12).text(`Общая сумма: ${totalCost.toLocaleString('ru-RU')} ₽`);
          doc.moveDown();

          report.financialData.forEach((data) => {
            doc.font(boldFont).fontSize(12).text(`Заявка №${data.id}`);
            doc.font(regularFont).fontSize(10).text(`Дата: ${data.createdAt.toLocaleString('ru-RU')}`);
            doc.text(`Статус: ${statusLabels[data.status]}`);
            doc.text(`Стоимость: ${data.cost?.toLocaleString('ru-RU') || 'Не указана'} ₽`);
            if (data.tariff) {
              doc.text(`Тариф: ${data.tariff.name}`);
              doc.text(`Базовая ставка: ${data.tariff.baseRate.toLocaleString('ru-RU')} ₽`);
              doc.text(`Ставка за вес: ${data.tariff.weightRate.toLocaleString('ru-RU')} ₽/кг`);
              doc.text(`Ставка за объем: ${data.tariff.volumeRate.toLocaleString('ru-RU')} ₽/м³`);
              doc.text(`Ставка за расстояние: ${data.tariff.distanceRate.toLocaleString('ru-RU')} ₽/км`);
            }
            doc.moveDown();
          });
        } else if ('userActivity' in report) {
          doc.font(boldFont).fontSize(16).text('ОТЧЕТ ПО АКТИВНОСТИ ПОЛЬЗОВАТЕЛЕЙ', { align: 'center' });
          doc.moveDown();

          const totalUsers = report.userActivity.length;
          const totalRequests = report.userActivity.reduce((sum, user) => sum + user._count.requests, 0);
          doc.font(regularFont).fontSize(12).text(`Всего пользователей: ${totalUsers}`);
          doc.text(`Всего заявок: ${totalRequests}`);
          doc.moveDown();

          report.userActivity.forEach((user) => {
            doc.font(boldFont).fontSize(12).text(`${user.lastName} ${user.firstName}`);
            doc.font(regularFont).fontSize(10).text(`Email: ${user.email}`);
            doc.text(`Дата регистрации: ${user.createdAt.toLocaleString('ru-RU')}`);
            doc.text(`Количество заявок: ${user._count.requests}`);
            doc.moveDown();
          });
        }

        // Add footer
        const pageCount = doc.bufferedPageRange().count;
        for (let i = 0; i < pageCount; i++) {
          doc.switchToPage(i);
          doc.font(regularFont).fontSize(10).text(
            `Страница ${i + 1} из ${pageCount}`,
            50,
            doc.page.height - 50,
            { align: 'center' }
          );
        }

        doc.end();
      } catch (error) {
        console.error('Error in PDF generation:', error);
        reject(error);
      }
    });
  }

  static async toExcel(report: CargoStatisticsReport | FinancialReport | UserActivityReport): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Отчет');

    worksheet.mergeCells('A1:B1');
    worksheet.getCell('A1').value = 'ООО "ТРЭНС ВЭСТОР"';
    worksheet.getCell('A1').font = { size: 16, bold: true };
    worksheet.getCell('A1').alignment = { horizontal: 'center' };

    worksheet.mergeCells('A2:B2');
    worksheet.getCell('A2').value = 'ОТЧЕТ';
    worksheet.getCell('A2').font = { size: 14, bold: true };
    worksheet.getCell('A2').alignment = { horizontal: 'center' };

    worksheet.getCell('A3').value = 'Дата формирования:';
    worksheet.getCell('B3').value = report.generatedAt.toLocaleString('ru-RU');

    if (report.period.startDate || report.period.endDate) {
      worksheet.getCell('A4').value = 'Период:';
      worksheet.getCell('B4').value = `${report.period.startDate?.toLocaleDateString('ru-RU') || 'начало'} - ${report.period.endDate?.toLocaleDateString('ru-RU') || 'конец'}`;
    }

    worksheet.addRow([]);

    // Add report content based on type
    if ('statistics' in report) {
      worksheet.mergeCells('A6:B6');
      worksheet.getCell('A6').value = 'СТАТИСТИКА ПО ГРУЗОПЕРЕВОЗКАМ';
      worksheet.getCell('A6').font = { size: 12, bold: true };
      worksheet.getCell('A6').alignment = { horizontal: 'center' };

      const total = report.statistics.reduce((sum, stat) => sum + stat._count, 0);
      worksheet.getCell('A7').value = 'Общее количество заявок:';
      worksheet.getCell('B7').value = total;

      worksheet.addRow([]);
      worksheet.getCell('A9').value = 'Статус заявки';
      worksheet.getCell('B9').value = 'Количество';
      worksheet.getRow(9).font = { bold: true };

      report.statistics.forEach((stat, index) => {
        worksheet.getCell(`A${10 + index}`).value = statusLabels[stat.status];
        worksheet.getCell(`B${10 + index}`).value = stat._count;
      });
    } else if ('financialData' in report) {
      worksheet.mergeCells('A6:B6');
      worksheet.getCell('A6').value = 'ФИНАНСОВЫЙ ОТЧЕТ';
      worksheet.getCell('A6').font = { size: 12, bold: true };
      worksheet.getCell('A6').alignment = { horizontal: 'center' };

      const totalCost = report.financialData.reduce((sum, data) => sum + (data.cost || 0), 0);
      worksheet.getCell('A7').value = 'Общая сумма:';
      worksheet.getCell('B7').value = `${totalCost.toLocaleString('ru-RU')} ₽`;

      worksheet.addRow([]);
      const headers = ['ID заявки', 'Дата', 'Статус', 'Стоимость', 'Тариф', 'Базовая ставка', 'Ставка за вес', 'Ставка за объем', 'Ставка за расстояние'];
      headers.forEach((header, index) => {
        worksheet.getCell(9, index + 1).value = header;
        worksheet.getCell(9, index + 1).font = { bold: true };
      });

      report.financialData.forEach((data, index) => {
        const row = 10 + index;
        worksheet.getCell(row, 1).value = data.id;
        worksheet.getCell(row, 2).value = data.createdAt.toLocaleString('ru-RU');
        worksheet.getCell(row, 3).value = statusLabels[data.status];
        worksheet.getCell(row, 4).value = data.cost ? `${data.cost.toLocaleString('ru-RU')} ₽` : 'Не указана';
        worksheet.getCell(row, 5).value = data.tariff?.name || 'Не указан';
        worksheet.getCell(row, 6).value = data.tariff?.baseRate ? `${data.tariff.baseRate.toLocaleString('ru-RU')} ₽` : 'Не указана';
        worksheet.getCell(row, 7).value = data.tariff?.weightRate ? `${data.tariff.weightRate.toLocaleString('ru-RU')} ₽/кг` : 'Не указана';
        worksheet.getCell(row, 8).value = data.tariff?.volumeRate ? `${data.tariff.volumeRate.toLocaleString('ru-RU')} ₽/м³` : 'Не указана';
        worksheet.getCell(row, 9).value = data.tariff?.distanceRate ? `${data.tariff.distanceRate.toLocaleString('ru-RU')} ₽/км` : 'Не указана';
      });
    } else if ('userActivity' in report) {
      worksheet.mergeCells('A6:B6');
      worksheet.getCell('A6').value = 'ОТЧЕТ ПО АКТИВНОСТИ ПОЛЬЗОВАТЕЛЕЙ';
      worksheet.getCell('A6').font = { size: 12, bold: true };
      worksheet.getCell('A6').alignment = { horizontal: 'center' };

      const totalUsers = report.userActivity.length;
      const totalRequests = report.userActivity.reduce((sum, user) => sum + user._count.requests, 0);
      worksheet.getCell('A7').value = 'Всего пользователей:';
      worksheet.getCell('B7').value = totalUsers;
      worksheet.getCell('A8').value = 'Всего заявок:';
      worksheet.getCell('B8').value = totalRequests;

      worksheet.addRow([]);
      const headers = ['ФИО', 'Email', 'Дата регистрации', 'Количество заявок'];
      headers.forEach((header, index) => {
        worksheet.getCell(10, index + 1).value = header;
        worksheet.getCell(10, index + 1).font = { bold: true };
      });

      report.userActivity.forEach((user, index) => {
        const row = 11 + index;
        worksheet.getCell(row, 1).value = `${user.lastName} ${user.firstName}`;
        worksheet.getCell(row, 2).value = user.email;
        worksheet.getCell(row, 3).value = user.createdAt.toLocaleString('ru-RU');
        worksheet.getCell(row, 4).value = user._count.requests;
      });
    }

    // Auto-fit columns
    worksheet.columns.forEach(column => {
      column.width = 20;
    });

    return Buffer.from(await workbook.xlsx.writeBuffer());
  }

  static async toCSV(report: CargoStatisticsReport | FinancialReport | UserActivityReport): Promise<string> {
    let headers: { id: string; title: string }[] = [];
    let records: ReportRecord[] = [];

    if ('statistics' in report) {
      headers = [
        { id: 'status', title: 'Статус заявки' },
        { id: 'count', title: 'Количество' }
      ];
      records = report.statistics.map(stat => ({
        status: statusLabels[stat.status],
        count: stat._count
      }));
    } else if ('financialData' in report) {
      headers = [
        { id: 'id', title: 'ID заявки' },
        { id: 'date', title: 'Дата' },
        { id: 'status', title: 'Статус' },
        { id: 'cost', title: 'Стоимость' },
        { id: 'tariff', title: 'Тариф' },
        { id: 'baseRate', title: 'Базовая ставка' },
        { id: 'weightRate', title: 'Ставка за вес' },
        { id: 'volumeRate', title: 'Ставка за объем' },
        { id: 'distanceRate', title: 'Ставка за расстояние' }
      ];
      records = report.financialData.map(data => ({
        id: data.id,
        date: data.createdAt.toLocaleString('ru-RU'),
        status: statusLabels[data.status],
        cost: data.cost ? `${data.cost.toLocaleString('ru-RU')} ₽` : 'Не указана',
        tariff: data.tariff?.name || 'Не указан',
        baseRate: data.tariff?.baseRate ? `${data.tariff.baseRate.toLocaleString('ru-RU')} ₽` : 'Не указана',
        weightRate: data.tariff?.weightRate ? `${data.tariff.weightRate.toLocaleString('ru-RU')} ₽/кг` : 'Не указана',
        volumeRate: data.tariff?.volumeRate ? `${data.tariff.volumeRate.toLocaleString('ru-RU')} ₽/м³` : 'Не указана',
        distanceRate: data.tariff?.distanceRate ? `${data.tariff.distanceRate.toLocaleString('ru-RU')} ₽/км` : 'Не указана'
      }));
    } else if ('userActivity' in report) {
      headers = [
        { id: 'name', title: 'ФИО' },
        { id: 'email', title: 'Email' },
        { id: 'createdAt', title: 'Дата регистрации' },
        { id: 'requests', title: 'Количество заявок' }
      ];
      records = report.userActivity.map(user => ({
        name: `${user.lastName} ${user.firstName}`,
        email: user.email,
        createdAt: user.createdAt.toLocaleString('ru-RU'),
        requests: user._count.requests
      }));
    }

    const csvWriter = createObjectCsvWriter({
      path: 'temp.csv',
      header: headers,
      encoding: 'utf8'
    });

    await csvWriter.writeRecords(records);
    const csvContent = await fs.readFile('temp.csv', 'utf8');
    await fs.unlink('temp.csv');

    return csvContent;
  }
} 
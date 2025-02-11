import { Workbook } from 'exceljs';
import { Response } from 'express';

export const TIMEZONE = 'Asia/Ho_Chi_Minh';
export type ExcelSheetValue<T> = {
  [key in keyof T]: { name: string; width?: number };
};

export async function parseExcelResponse(
  response: Response,
  book: Workbook,
  name?: string,
) {
  response.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );
  response.setHeader(
    'Content-Disposition',
    `attachment; filename=${encodeURIComponent(name)}.xlsx; charset=UTF-8`,
  );
  await book.xlsx.write(response);
  response.end();
}

export async function createExcelFile<T>(
  sheetName: string,
  headers: ExcelSheetValue<T>,
  dataRows: T[],
  alignField?: string[],
) {
  const book = new Workbook();
  const sheet = book.addWorksheet(sheetName, {
    headerFooter: { firstHeader: 'Hello Exceljs', firstFooter: 'Hello World' },
  });
  sheet.columns = Object.keys(headers).map((key) => ({
    header: headers[key].name,
    key,
    width: headers[key].width,
  }));
  // sheet.getRow(1).outlineLevel = 1;
  sheet.getRow(1).eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF2CC' },
      bgColor: { argb: 'FFF2CC' },
    };
    cell.font = { bold: true };
    cell.alignment = { horizontal: 'center' };
  });
  dataRows.forEach((dataRow) => {
    const row = sheet.addRow(dataRow);
    row.eachCell((cell, colNumber) => {
      const columnKey = sheet.columns[colNumber - 1]?.key;

      if (alignField?.includes(columnKey)) {
        cell.alignment = {
          wrapText: true,
          vertical: 'top',
          horizontal: 'center',
        };
      } else {
        cell.alignment = { wrapText: true, vertical: 'top' };
      }
    });
  });
  return book;
}

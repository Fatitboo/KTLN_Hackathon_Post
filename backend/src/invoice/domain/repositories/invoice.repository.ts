import { InvoiceDocument } from 'src/invoice/infrastructure/schemas/invoice.schema';
export const INVOICE_REPOSITORY = 'InvoiceRepository';

export interface InvoiceRepository {
  create(id: string, invoice: any): Promise<InvoiceDocument | null>;
  payment(payment: any): any;
}

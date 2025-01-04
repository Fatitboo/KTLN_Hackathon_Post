import { InvoiceDocument } from 'src/invoice/infrastructure/schemas/invoice.schema';
import { Invoice } from '../entities/invoice.entity';
export const INVOICE_REPOSITORY = 'InvoiceRepository';

export interface InvoiceRepository {
  create(invoice: Invoice): Promise<InvoiceDocument | null>;
  payment(payment: Invoice): any;
}

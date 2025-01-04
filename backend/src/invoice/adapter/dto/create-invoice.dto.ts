import { IsString } from 'class-validator';

export class CreateInvoiceDTO {
  @IsString()
  id: string;

  createInvoice: CreateInvoiceDTO;
}

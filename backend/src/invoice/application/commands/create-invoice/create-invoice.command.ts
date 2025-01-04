import { CreateInvoiceDTO } from 'src/invoice/adapter/dto/create-invoice.dto';

export class CreateInvoiceCommandProps {
  createInvoiceDTO: CreateInvoiceDTO;
}
export class CreateInvoiceCommand {
  constructor(public readonly props: CreateInvoiceCommandProps) {}
}

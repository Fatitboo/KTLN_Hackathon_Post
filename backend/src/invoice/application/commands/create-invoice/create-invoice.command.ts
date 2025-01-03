import { CreateInvoiceDTO } from 'src/invoice/adapter/dto/create-invoice.dto';

export class CreateInvoiceCommandProps {
  id: string;
  createInvoiceDTO: CreateInvoiceDTO;
}
export class CreateInvoiceCommand {
  constructor(public readonly props: CreateInvoiceCommandProps) {}
}

import { CreateInvoiceDTO } from 'src/invoice/adapter/dto/create-invoice.dto';

export class CreatePaymentCommandProps {
  paymentDTO: CreateInvoiceDTO;
}
export class CreatePaymentCommand {
  constructor(public readonly props: CreatePaymentCommandProps) {}
}

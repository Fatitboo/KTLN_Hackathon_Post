import { PaymentDTO } from 'src/invoice/adapter/dto/payment.dto';

export class CreatePaymentCommandProps {
  paymentDTO: PaymentDTO;
}
export class CreatePaymentCommand {
  constructor(public readonly props: CreatePaymentCommandProps) {}
}

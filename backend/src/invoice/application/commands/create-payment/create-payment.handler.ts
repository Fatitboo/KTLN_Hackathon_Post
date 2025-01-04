import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  INVOICE_REPOSITORY,
  InvoiceRepository,
} from 'src/invoice/domain/repositories/invoice.repository';
import { CreatePaymentCommand } from './create-payment.command';

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler
  implements ICommandHandler<CreatePaymentCommand>
{
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private readonly invoiceRepository: InvoiceRepository,
  ) {}

  async execute(command: CreatePaymentCommand) {
    return {
      payment: await this.invoiceRepository.payment(command.props.paymentDTO),
    };
  }
}

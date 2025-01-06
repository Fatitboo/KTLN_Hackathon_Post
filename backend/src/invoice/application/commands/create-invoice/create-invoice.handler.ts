import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInvoiceCommand } from './create-invoice.command';
import {
  INVOICE_REPOSITORY,
  InvoiceRepository,
} from 'src/invoice/domain/repositories/invoice.repository';

@CommandHandler(CreateInvoiceCommand)
export class CreateInvoiceHandler
  implements ICommandHandler<CreateInvoiceCommand>
{
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private readonly invoiceRepository: InvoiceRepository,
  ) {}

  async execute(command: CreateInvoiceCommand) {
    return {
      invoiceId: await this.invoiceRepository.create(
        command.props.createInvoiceDTO,
      ),
    };
  }
}

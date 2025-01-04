import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvoiceDocument } from 'src/invoice/infrastructure/schemas/invoice.schema';
import { CreateInvoiceDTO } from '../dto/create-invoice.dto';
import { CreateInvoiceCommand } from 'src/invoice/application/commands/create-invoice/create-invoice.command';
import { CreatePaymentCommand } from 'src/invoice/application/commands/create-payment/create-payment.command';
import { PaymentDTO } from '../dto/payment.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectModel(InvoiceDocument.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
  ) {}

  @Post('payment')
  async payment(@Body() paymentDTO: PaymentDTO): Promise<any> {
    const result = this.commandBus.execute(
      new CreatePaymentCommand({ paymentDTO: paymentDTO }),
    );

    return result;
  }

  @Post('create-invoice/:id')
  async createInvoice(
    @Param('id') id: string,
    @Query() queryParams: CreateInvoiceDTO,
  ): Promise<string> {
    const result = this.commandBus.execute(
      new CreateInvoiceCommand({ id: id, createInvoiceDTO: queryParams }),
    );

    return result;
  }
}

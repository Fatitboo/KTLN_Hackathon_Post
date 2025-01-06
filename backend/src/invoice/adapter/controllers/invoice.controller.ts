import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvoiceDocument } from 'src/invoice/infrastructure/schemas/invoice.schema';
import { CreateInvoiceDTO } from '../dto/create-invoice.dto';
import { CreateInvoiceCommand } from 'src/invoice/application/commands/create-invoice/create-invoice.command';
import { CreatePaymentCommand } from 'src/invoice/application/commands/create-payment/create-payment.command';
import { GetInvoicesQuery } from 'src/invoice/application/queries/get-invoices/get-invoices.query';

@Controller('invoices')
export class InvoiceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectModel(InvoiceDocument.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
  ) {}

  @Post('payment')
  async payment(@Body() paymentDTO: CreateInvoiceDTO): Promise<any> {
    const result = this.commandBus.execute(
      new CreatePaymentCommand({ paymentDTO: paymentDTO }),
    );

    return result;
  }

  @Post('create-invoice')
  async createInvoice(@Query() queryParams: CreateInvoiceDTO): Promise<string> {
    const result = this.commandBus.execute(
      new CreateInvoiceCommand({ createInvoiceDTO: queryParams }),
    );

    return result;
  }

  @Get()
  async getInvoices(
    @Query('page') page: number,
    @Query('userId') userId: string,
  ) {
    return await this.queryBus.execute(new GetInvoicesQuery(page, userId));
  }
}

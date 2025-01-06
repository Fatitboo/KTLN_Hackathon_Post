import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import {
  UserDocument,
  UserSchema,
} from 'src/user/infrastructure/database/schemas';

import { InvoiceController } from './adapter/controllers/invoice.controller';
import { MongooseInvoiceRepository } from './infrastructure/repositories/mongoose-invoice.repository';
import { CreateInvoiceHandler } from './application/commands/create-invoice/create-invoice.handler';
import { INVOICE_REPOSITORY } from './domain/repositories/invoice.repository';
import {
  InvoiceDocument,
  InvoiceSchema,
} from './infrastructure/schemas/invoice.schema';
import { CreatePaymentHandler } from './application/commands/create-payment/create-payment.handler';
import { GetInvoiceHandler } from './application/queries/get-invoices/get-invoices.handler';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: InvoiceDocument.name, schema: InvoiceSchema },
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [InvoiceController],
  providers: [
    { provide: INVOICE_REPOSITORY, useClass: MongooseInvoiceRepository },
    CreateInvoiceHandler,
    CreatePaymentHandler,
    GetInvoiceHandler,
  ],
})
export class InvoiceModule {}

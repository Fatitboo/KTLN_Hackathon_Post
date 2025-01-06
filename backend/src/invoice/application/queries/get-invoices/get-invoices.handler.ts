import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetInvoicesQuery } from './get-invoices.query';
import { InvoiceRepository } from 'src/invoice/domain/repositories/invoice.repository';

@QueryHandler(GetInvoicesQuery)
export class GetInvoiceHandler implements IQueryHandler<GetInvoicesQuery> {
  constructor(
    @Inject('InvoiceRepository')
    private readonly invoiceRepository: InvoiceRepository,
  ) {}

  async execute(query: GetInvoicesQuery): Promise<any> {
    return await this.invoiceRepository.findAll(query.page, query.userId);
  }
}

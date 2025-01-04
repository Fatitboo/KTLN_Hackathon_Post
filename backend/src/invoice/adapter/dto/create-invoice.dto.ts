import { IsString } from 'class-validator';

export class CreateInvoiceDTO {
  @IsString()
  userId: string;

  @IsString()
  subscriptionId: string;

  @IsString()
  price: string;

  @IsString()
  payType: string;
}

import { IsOptional, IsString } from 'class-validator';

export class PaymentDTO {
  @IsString()
  userId: string;

  @IsString()
  subscriptionId: string;

  @IsOptional()
  @IsString()
  price?: string;

  @IsOptional()
  @IsString()
  payType?: string;
}

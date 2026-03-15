import { IsOptional, IsString } from 'class-validator';

export class CreateManagementReviewDto {
  @IsString()
  tenantId!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  status?: string;
}

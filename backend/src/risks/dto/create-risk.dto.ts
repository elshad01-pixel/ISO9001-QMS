import { IsOptional, IsString } from 'class-validator';

export class CreateRiskDto {
  @IsString()
  tenantId!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  status?: string;
}

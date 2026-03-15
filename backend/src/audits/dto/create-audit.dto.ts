import { IsOptional, IsString } from 'class-validator';

export class CreateAuditDto {
  @IsString()
  tenantId!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  status?: string;
}

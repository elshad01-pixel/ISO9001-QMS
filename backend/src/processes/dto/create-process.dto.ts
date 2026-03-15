import { IsOptional, IsString } from 'class-validator';

export class CreateProcessDto {
  @IsString()
  tenantId!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  status?: string;
}

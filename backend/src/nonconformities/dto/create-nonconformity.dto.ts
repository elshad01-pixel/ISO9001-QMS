import { IsOptional, IsString } from 'class-validator';

export class CreateNonconformityDto {
  @IsString()
  tenantId!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  status?: string;
}

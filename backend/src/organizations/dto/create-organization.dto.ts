import { IsOptional, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  tenantId!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  status?: string;
}

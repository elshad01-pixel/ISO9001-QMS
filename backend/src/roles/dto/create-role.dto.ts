import { IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  tenantId!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  status?: string;
}

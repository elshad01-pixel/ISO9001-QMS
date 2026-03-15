import { IsOptional, IsString } from 'class-validator';

export class CreateAuditLogDto {
  @IsString()
  tenantId!: string;

  @IsString()
  action!: string;

  @IsString()
  entityName!: string;

  @IsOptional()
  @IsString()
  entityId?: string;
}

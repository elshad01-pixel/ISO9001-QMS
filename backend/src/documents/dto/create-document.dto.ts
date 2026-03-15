import { IsOptional, IsString } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  tenantId!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  status?: string;
}

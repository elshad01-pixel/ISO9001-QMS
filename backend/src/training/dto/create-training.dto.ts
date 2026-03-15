import { IsOptional, IsString } from 'class-validator';

export class CreateTrainingRecordDto {
  @IsString()
  tenantId!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  status?: string;
}

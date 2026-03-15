import { IsOptional, IsString } from 'class-validator';

export class CreateCorrectiveActionDto {
  @IsString()
  tenantId!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  status?: string;
}

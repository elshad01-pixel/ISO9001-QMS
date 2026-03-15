import { IsIn, IsString } from 'class-validator';

export class AddAuditFindingDto {
  @IsString()
  title!: string;

  @IsString()
  detail!: string;

  @IsString()
  @IsIn(['observation', 'minor_nc', 'major_nc'])
  severity!: 'observation' | 'minor_nc' | 'major_nc';
}

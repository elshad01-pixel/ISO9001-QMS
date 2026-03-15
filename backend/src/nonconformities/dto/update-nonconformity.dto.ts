import { PartialType } from '@nestjs/mapped-types';
import { CreateNonconformityDto } from './create-nonconformity.dto';

export class UpdateNonconformityDto extends PartialType(CreateNonconformityDto) {}

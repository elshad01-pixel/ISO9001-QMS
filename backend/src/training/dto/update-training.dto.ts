import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainingRecordDto } from './create-training.dto';

export class UpdateTrainingRecordDto extends PartialType(CreateTrainingRecordDto) {}

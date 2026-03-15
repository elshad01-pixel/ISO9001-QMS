import { PartialType } from '@nestjs/mapped-types';
import { CreateManagementReviewDto } from './create-management-review.dto';

export class UpdateManagementReviewDto extends PartialType(CreateManagementReviewDto) {}

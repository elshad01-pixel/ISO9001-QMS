import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagementReview } from './management-review.entity';
import { ManagementReviewsController } from './management-reviews.controller';
import { ManagementReviewsService } from './management-reviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([ManagementReview])],
  controllers: [ManagementReviewsController],
  providers: [ManagementReviewsService],
  exports: [TypeOrmModule, ManagementReviewsService],
})
export class ManagementReviewsModule {}

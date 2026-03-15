import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingRecord } from './training.entity';
import { TrainingRecordsController } from './training.controller';
import { TrainingRecordsService } from './training.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingRecord]), NotificationsModule],
  controllers: [TrainingRecordsController],
  providers: [TrainingRecordsService],
  exports: [TypeOrmModule, TrainingRecordsService],
})
export class TrainingRecordsModule {}

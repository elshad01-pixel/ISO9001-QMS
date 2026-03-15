import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorrectiveAction } from './corrective-action.entity';
import { CorrectiveActionsController } from './corrective-actions.controller';
import { CorrectiveActionsService } from './corrective-actions.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([CorrectiveAction]), NotificationsModule],
  controllers: [CorrectiveActionsController],
  providers: [CorrectiveActionsService],
  exports: [TypeOrmModule, CorrectiveActionsService],
})
export class CorrectiveActionsModule {}

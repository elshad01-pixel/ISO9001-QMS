import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Risk } from './risk.entity';
import { RisksController } from './risks.controller';
import { RisksService } from './risks.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Risk]), NotificationsModule],
  controllers: [RisksController],
  providers: [RisksService],
  exports: [TypeOrmModule, RisksService],
})
export class RisksModule {}

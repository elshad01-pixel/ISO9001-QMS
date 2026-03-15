import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nonconformity } from './nonconformity.entity';
import { NonconformitiesController } from './nonconformities.controller';
import { NonconformitiesService } from './nonconformities.service';

@Module({
  imports: [TypeOrmModule.forFeature([Nonconformity])],
  controllers: [NonconformitiesController],
  providers: [NonconformitiesService],
  exports: [TypeOrmModule, NonconformitiesService],
})
export class NonconformitiesModule {}

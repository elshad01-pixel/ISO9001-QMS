import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessEntity } from './process.entity';
import { ProcessesController } from './processes.controller';
import { ProcessesService } from './processes.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessEntity])],
  controllers: [ProcessesController],
  providers: [ProcessesService],
  exports: [TypeOrmModule, ProcessesService],
})
export class ProcessesModule {}

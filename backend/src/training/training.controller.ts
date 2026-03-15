import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { CreateTrainingRecordDto } from './dto/create-training.dto';
import { UpdateTrainingRecordDto } from './dto/update-training.dto';
import { TrainingRecordsService } from './training.service';

@Controller('training')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class TrainingRecordsController {
  constructor(private readonly service: TrainingRecordsService) {}

  @Post()
  @Permissions('training:create')
  create(@Body() dto: CreateTrainingRecordDto) {
    return this.service.create(dto);
  }

  @Get()
  @Permissions('training:view')
  findAll() {
    return this.service.findAll();
  }

  @Get('expiring')
  @Permissions('training:view')
  expiring(@Query('days') days = '30') {
    return this.service.getExpiringWithin(Number(days));
  }

  @Post('reminders/expiry')
  @Permissions('training:edit')
  reminders(@Query('days') days = '30') {
    return this.service.generateExpirationReminders(Number(days));
  }

  @Get(':id')
  @Permissions('training:view')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Permissions('training:edit')
  update(@Param('id') id: string, @Body() dto: UpdateTrainingRecordDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Permissions('training:close')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

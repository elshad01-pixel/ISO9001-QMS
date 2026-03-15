import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
import { RisksService } from './risks.service';

@Controller('risks')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RisksController {
  constructor(private readonly service: RisksService) {}

  @Post()
  @Permissions('risks:create')
  create(@Body() dto: CreateRiskDto) {
    return this.service.create(dto);
  }

  @Get()
  @Permissions('risks:view')
  findAll() {
    return this.service.findAll();
  }

  @Get('reviews/due')
  @Permissions('risks:view')
  dueReviews() {
    return this.service.getDueForReview();
  }

  @Post('reviews/reminders')
  @Permissions('risks:edit')
  reminders() {
    return this.service.generateReviewReminders();
  }

  @Get(':id')
  @Permissions('risks:view')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Permissions('risks:edit')
  update(@Param('id') id: string, @Body() dto: UpdateRiskDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Permissions('risks:close')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

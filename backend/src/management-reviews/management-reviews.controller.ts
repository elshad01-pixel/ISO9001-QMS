import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { CreateManagementReviewDto } from './dto/create-management-review.dto';
import { UpdateManagementReviewDto } from './dto/update-management-review.dto';
import { ManagementReviewsService } from './management-reviews.service';

@Controller('management-reviews')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ManagementReviewsController {
  constructor(private readonly service: ManagementReviewsService) {}

  @Post()
  @Permissions('management-reviews:create')
  create(@Body() dto: CreateManagementReviewDto) {
    return this.service.create(dto);
  }

  @Get()
  @Permissions('management-reviews:view')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Permissions('management-reviews:view')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Permissions('management-reviews:edit')
  update(@Param('id') id: string, @Body() dto: UpdateManagementReviewDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Permissions('management-reviews:close')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { CreateNonconformityDto } from './dto/create-nonconformity.dto';
import { UpdateNonconformityDto } from './dto/update-nonconformity.dto';
import { NonconformitiesService } from './nonconformities.service';

@Controller('nonconformities')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class NonconformitiesController {
  constructor(private readonly service: NonconformitiesService) {}

  @Post()
  @Permissions('nonconformities:create')
  create(@Body() dto: CreateNonconformityDto) {
    return this.service.create(dto);
  }

  @Get()
  @Permissions('nonconformities:view')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Permissions('nonconformities:view')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Permissions('nonconformities:edit')
  update(@Param('id') id: string, @Body() dto: UpdateNonconformityDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Permissions('nonconformities:close')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

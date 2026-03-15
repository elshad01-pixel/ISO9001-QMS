import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';
import { KpisService } from './kpis.service';

@Controller('kpis')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class KpisController {
  constructor(private readonly service: KpisService) {}

  @Post()
  @Permissions('kpis:create')
  create(@Body() dto: CreateKpiDto) {
    return this.service.create(dto);
  }

  @Get()
  @Permissions('kpis:view')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Permissions('kpis:view')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Permissions('kpis:edit')
  update(@Param('id') id: string, @Body() dto: UpdateKpiDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Permissions('kpis:close')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

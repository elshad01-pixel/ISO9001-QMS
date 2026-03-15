import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';
import { AuditLogsService } from './audit-logs.service';

@Controller('audit-logs')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AuditLogsController {
  constructor(private readonly service: AuditLogsService) {}

  @Post()
  @Permissions('audit-logs:create')
  create(@Body() dto: CreateAuditLogDto) {
    return this.service.create(dto);
  }

  @Get()
  @Permissions('audit-logs:view')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Permissions('audit-logs:view')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Permissions('audit-logs:edit')
  update(@Param('id') id: string, @Body() dto: UpdateAuditLogDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Permissions('audit-logs:close')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

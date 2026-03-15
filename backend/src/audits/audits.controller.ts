import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { AuditsService } from './audits.service';
import { AddAuditFindingDto } from './dto/add-audit-finding.dto';

@Controller('audits')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AuditsController {
  constructor(private readonly service: AuditsService) {}

  @Post()
  @Permissions('audits:create')
  create(@Body() dto: CreateAuditDto) {
    return this.service.create(dto);
  }

  @Get()
  @Permissions('audits:view')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Permissions('audits:view')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Permissions('audits:edit')
  update(@Param('id') id: string, @Body() dto: UpdateAuditDto) {
    return this.service.update(id, dto);
  }

  @Post(':id/findings')
  @Permissions('audits:edit')
  addFinding(@Param('id') id: string, @Body() dto: AddAuditFindingDto) {
    return this.service.addFinding(id, dto);
  }

  @Post(':id/findings/:findingId/close')
  @Permissions('audits:edit')
  closeFinding(@Param('id') id: string, @Param('findingId') findingId: string) {
    return this.service.closeFinding(id, findingId);
  }

  @Post(':id/close')
  @Permissions('audits:close')
  closeAudit(@Param('id') id: string) {
    return this.service.closeAudit(id);
  }

  @Delete(':id')
  @Permissions('audits:close')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

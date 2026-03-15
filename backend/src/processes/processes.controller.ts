import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { ProcessesService } from './processes.service';

@Controller('processes')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ProcessesController {
  constructor(private readonly service: ProcessesService) {}

  @Post()
  @Permissions('processes:create')
  create(@Body() dto: CreateProcessDto) {
    return this.service.create(dto);
  }

  @Get()
  @Permissions('processes:view')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Permissions('processes:view')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Permissions('processes:edit')
  update(@Param('id') id: string, @Body() dto: UpdateProcessDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Permissions('processes:close')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentsService } from './documents.service';
import { DocumentTransitionDto } from './dto/document-transition.dto';

@Controller('documents')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class DocumentsController {
  constructor(private readonly service: DocumentsService) {}

  @Post()
  @Permissions('documents:create')
  create(@Body() dto: CreateDocumentDto) {
    return this.service.create(dto);
  }

  @Get()
  @Permissions('documents:view')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Permissions('documents:view')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Permissions('documents:edit')
  update(@Param('id') id: string, @Body() dto: UpdateDocumentDto) {
    return this.service.update(id, dto);
  }

  @Post(':id/transition')
  @Permissions('documents:approve')
  transition(
    @Param('id') id: string,
    @Body() dto: DocumentTransitionDto,
    @Req() req: { user?: { sub?: string } },
  ) {
    return this.service.transition(id, dto, req.user?.sub);
  }

  @Delete(':id')
  @Permissions('documents:close')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

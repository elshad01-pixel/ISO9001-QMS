import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { CreateCorrectiveActionDto } from './dto/create-corrective-action.dto';
import { UpdateCorrectiveActionDto } from './dto/update-corrective-action.dto';
import { CorrectiveActionsService } from './corrective-actions.service';
import { CorrectiveActionTransitionDto } from './dto/corrective-action-transition.dto';

@Controller('corrective-actions')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class CorrectiveActionsController {
  constructor(private readonly service: CorrectiveActionsService) {}

  @Post()
  @Permissions('corrective-actions:create')
  create(@Body() dto: CreateCorrectiveActionDto) {
    return this.service.create(dto);
  }

  @Get()
  @Permissions('corrective-actions:view')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Permissions('corrective-actions:view')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Permissions('corrective-actions:edit')
  update(@Param('id') id: string, @Body() dto: UpdateCorrectiveActionDto) {
    return this.service.update(id, dto);
  }

  @Post(':id/transition')
  @Permissions('corrective-actions:approve')
  transition(
    @Param('id') id: string,
    @Body() dto: CorrectiveActionTransitionDto,
    @Req() req: { user?: { sub?: string } },
  ) {
    return this.service.transition(id, dto, req.user?.sub);
  }

  @Post('alerts/overdue')
  @Permissions('corrective-actions:close')
  generateOverdueAlerts() {
    return this.service.generateOverdueAlerts();
  }

  @Delete(':id')
  @Permissions('corrective-actions:close')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

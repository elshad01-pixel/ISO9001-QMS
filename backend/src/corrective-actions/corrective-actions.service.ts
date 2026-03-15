import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCorrectiveActionDto } from './dto/create-corrective-action.dto';
import { UpdateCorrectiveActionDto } from './dto/update-corrective-action.dto';
import { CorrectiveAction } from './corrective-action.entity';
import { CorrectiveActionTransitionDto } from './dto/corrective-action-transition.dto';
import { NotificationsService } from '../notifications/notifications.service';

type CapaStatus =
  | 'open'
  | 'containment'
  | 'root_cause_completed'
  | 'plan_approved'
  | 'implementation'
  | 'effectiveness_review'
  | 'closed';

const CAPA_TRANSITIONS: Record<string, { from: CapaStatus[]; to: CapaStatus }> = {
  start_containment: { from: ['open'], to: 'containment' },
  complete_root_cause: { from: ['containment'], to: 'root_cause_completed' },
  approve_plan: { from: ['root_cause_completed'], to: 'plan_approved' },
  start_implementation: { from: ['plan_approved'], to: 'implementation' },
  request_effectiveness_review: { from: ['implementation'], to: 'effectiveness_review' },
  verify_effectiveness: { from: ['effectiveness_review'], to: 'effectiveness_review' },
  close: { from: ['effectiveness_review'], to: 'closed' },
};

@Injectable()
export class CorrectiveActionsService {
  constructor(
    @InjectRepository(CorrectiveAction) private readonly repository: Repository<CorrectiveAction>,
    private readonly notificationsService: NotificationsService,
  ) {}

  create(dto: CreateCorrectiveActionDto) {
    const entity = this.repository.create({
      ...dto,
      status: (dto.status as CapaStatus) ?? 'open',
      metadata: {
        ...(dto as unknown as { metadata?: Record<string, unknown> }).metadata,
        workflowHistory: [
          { action: 'create', from: null, to: (dto.status as CapaStatus) ?? 'open', at: new Date().toISOString() },
        ],
      },
    } as never);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const item = await this.repository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Corrective action not found');
    return item;
  }

  async update(id: string, dto: UpdateCorrectiveActionDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repository.save(item);
  }

  async transition(id: string, dto: CorrectiveActionTransitionDto, actorUserId?: string) {
    const item = await this.findOne(id);
    const rule = CAPA_TRANSITIONS[dto.action];
    if (!rule) {
      throw new BadRequestException('Invalid CAPA transition action');
    }

    const current = item.status as CapaStatus;
    if (!rule.from.includes(current)) {
      throw new BadRequestException(`Transition ${dto.action} not allowed from status ${current}`);
    }

    const metadata = (item.metadata ?? {}) as Record<string, unknown>;
    const history = Array.isArray(metadata.workflowHistory)
      ? [...(metadata.workflowHistory as unknown[])]
      : [];

    if (dto.action === 'verify_effectiveness') {
      if (!dto.effectivenessVerified) {
        throw new BadRequestException('Effectiveness review must be verified before proceeding');
      }
      metadata.effectivenessVerified = true;
      metadata.effectivenessReviewedAt = new Date().toISOString();
      metadata.effectivenessReviewedBy = actorUserId ?? null;
    }

    if (dto.action === 'close') {
      const verified = Boolean(metadata.effectivenessVerified);
      if (!verified) {
        throw new BadRequestException(
          'CAPA cannot be closed without effectiveness verification',
        );
      }
      metadata.closedAt = new Date().toISOString();
    }

    history.push({
      action: dto.action,
      from: current,
      to: rule.to,
      note: dto.note,
      actorUserId: actorUserId ?? null,
      at: new Date().toISOString(),
    });

    item.status = rule.to;
    item.metadata = {
      ...metadata,
      workflowHistory: history,
      lastTransitionAt: new Date().toISOString(),
    };

    return this.repository.save(item);
  }

  async generateOverdueAlerts(referenceDate = new Date()) {
    const openActions = await this.repository.find({ where: [{ status: 'open' }, { status: 'implementation' }, { status: 'effectiveness_review' }] });
    const overdue = openActions.filter((action) => {
      const due = (action.metadata as Record<string, unknown> | undefined)?.dueDate;
      if (!due || typeof due !== 'string') return false;
      return new Date(due).getTime() < referenceDate.getTime();
    });

    await Promise.all(
      overdue.map((action) =>
        this.notificationsService.create({
          tenantId: action.tenantId,
          userId: ((action.metadata as Record<string, unknown> | undefined)?.ownerUserId as string) ??
            '00000000-0000-0000-0000-000000000000',
          eventType: 'capa.overdue',
          title: 'Overdue corrective action',
          message: `Corrective action ${action.name} is overdue and requires attention.`,
        }),
      ),
    );

    return { createdAlerts: overdue.length };
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.repository.remove(item);
  }
}

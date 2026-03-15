import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './document.entity';
import { DocumentTransitionDto } from './dto/document-transition.dto';

type DocumentStatus = 'draft' | 'in_review' | 'approved' | 'released' | 'obsolete';

const NEXT_STATE: Record<string, { from: DocumentStatus[]; to: DocumentStatus }> = {
  submit_review: { from: ['draft'], to: 'in_review' },
  approve: { from: ['in_review'], to: 'approved' },
  release: { from: ['approved'], to: 'released' },
  revise: { from: ['released', 'approved'], to: 'draft' },
  archive: { from: ['released', 'approved'], to: 'obsolete' },
};

@Injectable()
export class DocumentsService {
  constructor(@InjectRepository(Document) private readonly repository: Repository<Document>) {}

  create(dto: CreateDocumentDto) {
    const initialStatus: DocumentStatus = (dto.status as DocumentStatus) ?? 'draft';
    const entity = this.repository.create({
      ...dto,
      status: initialStatus,
      metadata: {
        workflowHistory: [
          { action: 'create', from: null, to: initialStatus, at: new Date().toISOString() },
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
    if (!item) throw new NotFoundException('Document not found');
    return item;
  }

  async update(id: string, dto: UpdateDocumentDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repository.save(item);
  }

  async transition(id: string, dto: DocumentTransitionDto, actorUserId?: string) {
    const item = await this.findOne(id);
    const rule = NEXT_STATE[dto.action];
    if (!rule) {
      throw new BadRequestException('Invalid transition action');
    }

    const current = item.status as DocumentStatus;
    if (!rule.from.includes(current)) {
      throw new BadRequestException(`Transition ${dto.action} not allowed from status ${current}`);
    }

    if (dto.action === 'release' && !dto.effectiveDate) {
      throw new BadRequestException('Effective date is required when releasing a document');
    }

    const metadata = (item.metadata ?? {}) as Record<string, unknown>;
    const workflowHistory = Array.isArray(metadata.workflowHistory)
      ? [...(metadata.workflowHistory as unknown[])]
      : [];

    workflowHistory.push({
      action: dto.action,
      from: current,
      to: rule.to,
      comment: dto.comment,
      actorUserId: actorUserId ?? null,
      at: new Date().toISOString(),
    });

    item.status = rule.to;
    item.metadata = {
      ...metadata,
      effectiveDate: dto.effectiveDate ?? metadata.effectiveDate,
      workflowHistory,
      lastTransitionAt: new Date().toISOString(),
    };

    return this.repository.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.repository.remove(item);
  }
}

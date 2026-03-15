import { randomUUID } from 'crypto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { Audit } from './audit.entity';
import { AddAuditFindingDto } from './dto/add-audit-finding.dto';

type AuditStatus = 'planned' | 'in_progress' | 'follow_up' | 'closed';

@Injectable()
export class AuditsService {
  constructor(@InjectRepository(Audit) private readonly repository: Repository<Audit>) {}

  create(dto: CreateAuditDto) {
    const entity = this.repository.create({
      ...dto,
      status: (dto.status as AuditStatus) ?? 'planned',
      metadata: {
        findings: [],
      },
    } as never);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const item = await this.repository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Audit not found');
    return item;
  }

  async update(id: string, dto: UpdateAuditDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repository.save(item);
  }

  async addFinding(auditId: string, dto: AddAuditFindingDto) {
    const audit = await this.findOne(auditId);
    const metadata = (audit.metadata ?? {}) as Record<string, unknown>;
    const findings = Array.isArray(metadata.findings) ? [...(metadata.findings as unknown[])] : [];

    findings.push({
      id: randomUUID(),
      title: dto.title,
      detail: dto.detail,
      severity: dto.severity,
      status: 'open',
      createdAt: new Date().toISOString(),
    });

    audit.metadata = {
      ...metadata,
      findings,
      findingsSummary: this.summarizeFindings(findings),
    };

    if (audit.status === 'planned') {
      audit.status = 'in_progress';
    }

    return this.repository.save(audit);
  }

  async closeFinding(auditId: string, findingId: string) {
    const audit = await this.findOne(auditId);
    const metadata = (audit.metadata ?? {}) as Record<string, unknown>;
    const findings = Array.isArray(metadata.findings)
      ? (metadata.findings as Array<Record<string, unknown>>).map((finding) =>
          finding.id === findingId
            ? { ...finding, status: 'closed', closedAt: new Date().toISOString() }
            : finding,
        )
      : [];

    audit.metadata = {
      ...metadata,
      findings,
      findingsSummary: this.summarizeFindings(findings),
    };

    return this.repository.save(audit);
  }

  async closeAudit(auditId: string) {
    const audit = await this.findOne(auditId);
    const metadata = (audit.metadata ?? {}) as Record<string, unknown>;
    const findings = Array.isArray(metadata.findings)
      ? (metadata.findings as Array<Record<string, unknown>>)
      : [];

    const hasOpenMajor = findings.some(
      (finding) => finding.status !== 'closed' && finding.severity === 'major_nc',
    );
    if (hasOpenMajor) {
      throw new BadRequestException('Audit cannot be closed while major findings remain open');
    }

    audit.status = 'closed';
    audit.metadata = {
      ...metadata,
      closedAt: new Date().toISOString(),
      findingsSummary: this.summarizeFindings(findings),
    };

    return this.repository.save(audit);
  }

  private summarizeFindings(findings: unknown[]) {
    const records = findings as Array<Record<string, unknown>>;
    return {
      total: records.length,
      open: records.filter((f) => f.status !== 'closed').length,
      closed: records.filter((f) => f.status === 'closed').length,
      majorOpen: records.filter((f) => f.status !== 'closed' && f.severity === 'major_nc').length,
    };
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.repository.remove(item);
  }
}

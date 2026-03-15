import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
import { Risk } from './risk.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class RisksService {
  constructor(
    @InjectRepository(Risk) private readonly repository: Repository<Risk>,
    private readonly notificationsService: NotificationsService,
  ) {}

  create(dto: CreateRiskDto) {
    return this.repository.save(this.repository.create(dto as never));
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const item = await this.repository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Risk not found');
    return item;
  }

  async update(id: string, dto: UpdateRiskDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repository.save(item);
  }

  async getDueForReview(referenceDate = new Date()) {
    const items = await this.repository.find();
    return items.filter((risk) => {
      const reviewDate = (risk.metadata as Record<string, unknown> | undefined)?.reviewDate;
      if (!reviewDate || typeof reviewDate !== 'string') return false;
      return new Date(reviewDate).getTime() <= referenceDate.getTime();
    });
  }

  async generateReviewReminders(referenceDate = new Date()) {
    const due = await this.getDueForReview(referenceDate);

    await Promise.all(
      due.map((risk) =>
        this.notificationsService.create({
          tenantId: risk.tenantId,
          userId:
            ((risk.metadata as Record<string, unknown> | undefined)?.ownerUserId as string) ??
            '00000000-0000-0000-0000-000000000000',
          eventType: 'risk.review_due',
          title: 'Risk review reminder',
          message: `Risk '${risk.name}' is due for periodic review.`,
        }),
      ),
    );

    return { createdReminders: due.length };
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.repository.remove(item);
  }
}

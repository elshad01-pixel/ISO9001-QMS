import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainingRecordDto } from './dto/create-training.dto';
import { UpdateTrainingRecordDto } from './dto/update-training.dto';
import { TrainingRecord } from './training.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class TrainingRecordsService {
  constructor(
    @InjectRepository(TrainingRecord) private readonly repository: Repository<TrainingRecord>,
    private readonly notificationsService: NotificationsService,
  ) {}

  create(dto: CreateTrainingRecordDto) {
    return this.repository.save(this.repository.create(dto as never));
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const item = await this.repository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Training record not found');
    return item;
  }

  async update(id: string, dto: UpdateTrainingRecordDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repository.save(item);
  }

  async getExpiringWithin(days: number) {
    const items = await this.repository.find();
    const now = new Date();
    const threshold = new Date(now);
    threshold.setDate(threshold.getDate() + days);

    return items.filter((item) => {
      const expiryDate = (item.metadata as Record<string, unknown> | undefined)?.expiryDate;
      if (!expiryDate || typeof expiryDate !== 'string') return false;
      const expiry = new Date(expiryDate);
      return expiry.getTime() >= now.getTime() && expiry.getTime() <= threshold.getTime();
    });
  }

  async generateExpirationReminders(days = 30) {
    const expiring = await this.getExpiringWithin(days);

    await Promise.all(
      expiring.map((item) =>
        this.notificationsService.create({
          tenantId: item.tenantId,
          userId:
            ((item.metadata as Record<string, unknown> | undefined)?.userId as string) ??
            '00000000-0000-0000-0000-000000000000',
          eventType: 'training.expiry_due',
          title: 'Training expiry reminder',
          message: `Training '${item.name}' is expiring soon. Please complete renewal before expiry date.`,
        }),
      ),
    );

    return { createdReminders: expiring.length };
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.repository.remove(item);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManagementReviewDto } from './dto/create-management-review.dto';
import { UpdateManagementReviewDto } from './dto/update-management-review.dto';
import { ManagementReview } from './management-review.entity';

@Injectable()
export class ManagementReviewsService {
  constructor(@InjectRepository(ManagementReview) private readonly repository: Repository<ManagementReview>) {}

  create(dto: CreateManagementReviewDto) {
    return this.repository.save(this.repository.create(dto as never));
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const item = await this.repository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('ManagementReview not found');
    return item;
  }

  async update(id: string, dto: UpdateManagementReviewDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repository.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.repository.remove(item);
  }
}

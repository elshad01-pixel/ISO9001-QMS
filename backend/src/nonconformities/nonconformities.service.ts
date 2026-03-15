import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNonconformityDto } from './dto/create-nonconformity.dto';
import { UpdateNonconformityDto } from './dto/update-nonconformity.dto';
import { Nonconformity } from './nonconformity.entity';

@Injectable()
export class NonconformitiesService {
  constructor(@InjectRepository(Nonconformity) private readonly repository: Repository<Nonconformity>) {}

  create(dto: CreateNonconformityDto) {
    return this.repository.save(this.repository.create(dto as never));
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const item = await this.repository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Nonconformity not found');
    return item;
  }

  async update(id: string, dto: UpdateNonconformityDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repository.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.repository.remove(item);
  }
}

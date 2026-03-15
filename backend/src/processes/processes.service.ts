import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { ProcessEntity } from './process.entity';

@Injectable()
export class ProcessesService {
  constructor(@InjectRepository(ProcessEntity) private readonly repository: Repository<ProcessEntity>) {}

  create(dto: CreateProcessDto) {
    return this.repository.save(this.repository.create(dto as never));
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const item = await this.repository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Process not found');
    return item;
  }

  async update(id: string, dto: UpdateProcessDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repository.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.repository.remove(item);
  }
}

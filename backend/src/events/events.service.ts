import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { EventEntity } from './events.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FilterEventDto } from './dto/filter-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private eventsRepository: Repository<EventEntity>,
  ) {}

   async findAll(filterDto: FilterEventDto): Promise<EventEntity[]> {
    const where: any = {};
    if (filterDto.search) {
      where.name = ILike(`%${filterDto.search}%`);
    }
    if (filterDto.category) {
      where.category = filterDto.category;
    }
    return this.eventsRepository.find({where});
  }

  async findOne(id: string): Promise<EventEntity> {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException(`Событие ${id} не найдено`);
    return event;
  }

  create(dto: CreateEventDto): Promise<EventEntity> {
    const event = this.eventsRepository.create(dto);
    return this.eventsRepository.save(event);
  }

  async update(id: string, dto: UpdateEventDto): Promise<EventEntity> {
    await this.findOne(id);
    await this.eventsRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.eventsRepository.delete(id);
  }
}
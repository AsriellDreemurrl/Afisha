import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './events.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private eventsRepository: Repository<EventEntity>,
  ) {}

  findAll(): Promise<EventEntity[]> {
    return this.eventsRepository.find();
  }

  async findOne(id: number): Promise<EventEntity> {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException(`Событие ${id} не найдено`);
    return event;
  }

  create(dto: CreateEventDto): Promise<EventEntity> {
    const event = this.eventsRepository.create(dto);
    return this.eventsRepository.save(event);
  }

  async update(id: number, dto: UpdateEventDto): Promise<EventEntity> {
    await this.findOne(id);
    await this.eventsRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.eventsRepository.delete(id);
  }
}
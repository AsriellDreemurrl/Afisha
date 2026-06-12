import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AfishaEvent, events } from './events.store';

@Injectable()
export class EventsService {
  create(createEventDto: CreateEventDto) {
    return 'This action adds a new event';
  }

  findAll(): AfishaEvent[] {
    return events;
  }

  findOne(id: number): AfishaEvent | undefined{
    return events.find(event => event.id === id);
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}

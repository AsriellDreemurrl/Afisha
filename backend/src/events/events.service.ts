import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

import { eventsStore } from './events.store';

@Injectable()
export class EventService {
   create(createEventDto: CreateEventDto): Event {
    const newEvent = new Event();

    newEvent.id = Date.now().toString();

    newEvent.name = createEventDto.name;
    newEvent.description = createEventDto.description;
    newEvent.datetime = createEventDto.datetime;
    newEvent.location = createEventDto.location;
    newEvent.category = createEventDto.category;
    newEvent.price = createEventDto.price;
    newEvent.photo = createEventDto.photo;


    eventsStore.push(newEvent);
    return newEvent;
  }

  findAll(): Event[] {
    return eventsStore;
  }

  findOne(id: string): Event {
    const foundEvent = eventsStore.find((event) => event.id === id);
    if (!foundEvent) {
      throw new NotFoundException(`событие не найдено`);
    }
    return foundEvent;
  }

  update(id: string, updateEventDto: UpdateEventDto): Event {
    const eventToUpdate = this.findOne(id);
    Object.assign(eventToUpdate, updateEventDto);

    if (updateEventDto.price !== undefined) {
      eventToUpdate.price = Number(updateEventDto.price);
    }
  
    return eventToUpdate;
  }

  remove(id: string): string {
    this.findOne(id);
    const index = eventsStore.findIndex((event) => event.id === id);
    if (index !== -1) {
      eventsStore.splice(index, 1);
    }
    
    return `событие удалено `;
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  private events: Event[] = [];

  create(createEventDto: CreateEventDto): Event {
    const newEvent = new Event();

    newEvent.id = Date.now().toString();

    newEvent.title = createEventDto.title;
    newEvent.description = createEventDto.description;
    newEvent.date = createEventDto.date;
    newEvent.place = createEventDto.place;
    newEvent.category = createEventDto.category;
    newEvent.price = createEventDto.price;
    newEvent.images = createEventDto.images;

    this.events.push(newEvent);
    return newEvent;
  }

  findAll(): Event[] {
    return this.events;
  }

  findOne(id: string):Event {
    const foundEvent = this.events.find((event) => event.id === id);
    if(!foundEvent){
      throw new NotFoundException(`событие не найдено`)
    }
    return foundEvent;
  }

  update(id: string, updateEventDto: UpdateEventDto): Event {
    const eventToUpdate=this.findOne(id);
    Object.assign(eventToUpdate,updateEventDto);

    if(updateEventDto.price!==undefined){
      eventToUpdate.price=Number(updateEventDto.price);
    }
    return eventToUpdate;
  }

  remove(id: string): string {
  this.findOne(id);
  this.events=this.events.filter((event)=>event.id !==id);
  return `событие удалено `
  }
}



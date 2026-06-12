import { Injectable } from '@nestjs/common';
import { AfishaEvent, events } from './events.store';

@Injectable()
export class EventsService {
  findAll(): AfishaEvent[] {
    return events;
  }

  findOne(id: number): AfishaEvent | undefined{
    return events.find(event => event.id === id);
  }

  create(event: AfishaEvent): AfishaEvent {
    events.push(event);
    return event;
  }

  update(id: number, updated: AfishaEvent): AfishaEvent | undefined {
    const index = events.findIndex(event => event.id === id)
    if (index === -1) return undefined;
    events[index] = updated;
    return events[index];
  }

  remove(id: number):boolean {
    const index = events.findIndex(events => events.id === id);
    if (index === -1) return false;
    events.splice(index, 1);
    return true;
  }
}

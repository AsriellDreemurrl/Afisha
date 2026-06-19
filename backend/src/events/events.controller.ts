import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EventsService } from './events.service';
import type { AfishaEvent } from './events.store';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(Number(id));
  }

  @Post()
  create(@Body() event: AfishaEvent) {
    return this.eventsService.create(event);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() event: AfishaEvent) {
    return this.eventsService.update(Number(id), event);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(Number(id));
  }
}
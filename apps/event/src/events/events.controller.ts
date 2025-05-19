import { EventRulesService } from '../event-rules/event-rules.service';
import { CreateEventDTO } from './dto/create-event.dto';
import { EventsService } from './events.service';
import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Types } from 'mongoose';

@Controller()
export class EventsController {
  constructor(
    private eventsService: EventsService,
    private eventRulesService: EventRulesService,
  ) {}

  @MessagePattern('createEvent')
  async create(@Payload() createEventDto: CreateEventDTO) {
    try {
      const event = await this.eventsService.create(createEventDto);
      const eventRules = await this.eventRulesService.createMany(
        event.id,
        createEventDto.rules,
      );
      event.rules = eventRules.map((rule) => rule.id);
      await event.save();
      return {
        ...event.toJSON(),
        rules: eventRules.map((rule) => rule.toJSON()),
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new RpcException(new BadRequestException('Event already exists'));
      }
      throw new RpcException(new BadRequestException(error));
    }
  }

  @MessagePattern('findAllEvents')
  async findAll() {
    const events = await this.eventsService.findAll();
    return events;
  }

  @MessagePattern('findOneEvent')
  findOne(@Payload() eventID: string) {
    if (!Types.ObjectId.isValid(eventID)) {
      throw new RpcException(new BadRequestException('Invalid event ID'));
    }

    return this.eventsService.findOne(eventID);
  }
}

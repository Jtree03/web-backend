import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { Event } from './models/event.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  create(createEventDTO: CreateEventDTO) {
    const { rules, ...eventData } = createEventDTO;
    const createdEvent = new this.eventModel(eventData);
    return createdEvent.save();
  }

  findAll() {
    return this.eventModel.find().populate('rules').populate('rewards').exec();
  }

  findOne(id: string) {
    return this.eventModel
      .findById(id)
      .populate('rules')
      .populate('rewards')
      .exec();
  }

  update(id: string, updateEventDTO: UpdateEventDTO) {
    return this.eventModel
      .findByIdAndUpdate(id, updateEventDTO, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.eventModel.findByIdAndDelete(id).exec();
  }
}

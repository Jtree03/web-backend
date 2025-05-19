import { CreateEventRuleDTO } from './dto/create-event-rule.dto';
import { EventRule } from './models/event-rule.schema';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class EventRulesService {
  constructor(
    @InjectModel(EventRule.name) private eventRuleModel: Model<EventRule>,
  ) {}

  create(eventID: string, createEventRuleDto: CreateEventRuleDTO) {
    const createdEventRule = new this.eventRuleModel({
      ...createEventRuleDto,
      event: eventID,
    });
    return createdEventRule.save();
  }

  createMany(eventID: string, rules: CreateEventRuleDTO[]) {
    const createdEventRules = rules.map((rule) => {
      const createdEventRule = new this.eventRuleModel({
        ...rule,
        event: eventID,
      });
      return createdEventRule.save();
    });

    return Promise.all(createdEventRules);
  }

  findAll() {
    return `This action returns all eventRules`;
  }

  findOne(id: string) {
    return `This action returns a #${id} eventRule`;
  }

  remove(id: string) {
    return `This action removes a #${id} eventRule`;
  }
}

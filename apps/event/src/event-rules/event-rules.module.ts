import { EventRulesService } from './event-rules.service';
import { EventRule, EventRuleSchema } from './models/event-rule.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventRule.name, schema: EventRuleSchema },
    ]),
  ],
  providers: [EventRulesService],
  exports: [EventRulesService],
})
export class EventRulesModule {}

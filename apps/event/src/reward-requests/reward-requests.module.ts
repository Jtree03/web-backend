import { EventsModule } from '../events/events.module';
import {
  RewardRequest,
  RewardRequestSchema,
} from './models/reward-request.schema';
import { RewardRequestsController } from './reward-requests.controller';
import { RewardRequestsService } from './reward-requests.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RewardRequest.name, schema: RewardRequestSchema },
    ]),
    EventsModule,
  ],
  controllers: [RewardRequestsController],
  providers: [RewardRequestsService],
})
export class RewardRequestsModule {}

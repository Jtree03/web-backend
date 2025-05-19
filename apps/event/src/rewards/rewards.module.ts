import { EventsModule } from '../events/events.module';
import { Reward, RewardSchema } from './models/reward.schema';
import { RewardsController } from './rewards.controller';
import { RewardsService } from './rewards.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }]),
    EventsModule,
  ],
  controllers: [RewardsController],
  providers: [RewardsService],
})
export class RewardsModule {}

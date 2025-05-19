import { EventsService } from '../events/events.service';
import { CreateRewardDTO } from './dto/create-reward.dto';
import { RewardsService } from './rewards.service';
import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Types } from 'mongoose';

@Controller()
export class RewardsController {
  constructor(
    private rewardsService: RewardsService,
    private eventsService: EventsService,
  ) {}

  @MessagePattern('createReward')
  async create(
    @Payload() createRewardDTO: { eventID: string } & CreateRewardDTO,
  ) {
    const reward = await this.rewardsService.create(
      createRewardDTO.eventID,
      createRewardDTO,
    );
    const event = await this.eventsService.findOne(createRewardDTO.eventID);
    if (!event) {
      throw new RpcException(new BadRequestException('Event not found'));
    }
    event.rewards.push(reward.id);
    await event.save();

    return reward;
  }

  @MessagePattern('findAllRewards')
  findAll(@Payload() eventID: string) {
    return this.rewardsService.findByEventID(eventID);
  }

  @MessagePattern('removeReward')
  remove(@Payload() rewardID: string) {
    if (!Types.ObjectId.isValid(rewardID)) {
      throw new RpcException(new BadRequestException('Invalid reward ID'));
    }
    return this.rewardsService.remove(rewardID);
  }
}

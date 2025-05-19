import { EventsService } from '../events/events.service';
import { CreateRewardRequestDTO } from './dto/create-reward-request.dto';
import { RewardRequestsService } from './reward-requests.service';
import { ConflictException, Controller, Req } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { RequestStatus } from 'libs/enums/reward-request.enum';

@Controller()
export class RewardRequestsController {
  constructor(
    private rewardRequestsService: RewardRequestsService,
    private eventsService: EventsService,
  ) {}

  @MessagePattern('createRewardRequest')
  async create(@Payload() createRewardRequestDTO: CreateRewardRequestDTO) {
    const approvedRequest = await this.rewardRequestsService.findOne(
      createRewardRequestDTO.userID,
      createRewardRequestDTO.eventID,
      RequestStatus.APPROVED,
    );

    // 중복 보상 막기
    if (approvedRequest) {
      throw new RpcException(
        new ConflictException('Reward request already approved'),
      );
    }

    const event = await this.eventsService.findOne(
      createRewardRequestDTO.eventID,
    );
    const checkedRules = await this.rewardRequestsService.checkRules(
      event,
      createRewardRequestDTO.userID,
    );
    const rewardRequest = await this.rewardRequestsService.create({
      userID: createRewardRequestDTO.userID,
      event: event.id,
      status: checkedRules ? RequestStatus.APPROVED : RequestStatus.REJECTED,
    });
    return rewardRequest;
  }

  @MessagePattern('findAllRewardRequests')
  findAll(@Payload() payload: { userID?: string }) {
    return this.rewardRequestsService.findAll(payload.userID);
  }
}

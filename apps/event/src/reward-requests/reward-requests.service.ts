import { EventDocument } from '../events/models/event.schema';
import {
  CreateRewardRequestDTO,
  CreateRewardRequestModelDTO,
} from './dto/create-reward-request.dto';
import { RewardRequest } from './models/reward-request.schema';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  FindOneLastUserActionDTO,
  FindUserActionDto,
} from 'apps/auth/src/user-actions/dto/find-user-action.dto';
import { UserAction } from 'apps/auth/src/user-actions/models/user-action.schema';
import { RuleLogic, RuleOperator } from 'libs/enums/event-rule.enum';
import { RequestStatus } from 'libs/enums/reward-request.enum';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RewardRequestsService {
  constructor(
    @InjectModel(RewardRequest.name)
    private rewardRequestModel: Model<RewardRequest>,
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
  ) {}

  create(createRewardRequestDto: CreateRewardRequestModelDTO) {
    const createdRewardRequest = new this.rewardRequestModel(
      createRewardRequestDto,
    );
    return createdRewardRequest.save();
  }

  findOne(userID: string, eventID: string, status?: RequestStatus) {
    return this.rewardRequestModel
      .findOne({ userID, event: eventID, status })
      .exec();
  }

  findAll(userID?: string) {
    return this.rewardRequestModel.find(userID ? { userID } : {}).exec();
  }

  async checkRules(event: EventDocument, userID: string): Promise<boolean> {
    const rules = event.rules;
    const now = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    if (now < startDate) {
      throw new RpcException(new BadRequestException('event not started'));
    } else if (now > endDate) {
      throw new RpcException(new BadRequestException('event ended'));
    }

    const ruleResults = await Promise.all(
      rules.map(async (rule) => {
        const findUserActionDTO: FindUserActionDto = {
          userID,
          actionType: rule.actionType,
          sum: rule.threshold,
          operator: rule.operator,
        };
        const lastUserActions = await firstValueFrom(
          this.authClient.send<UserAction[], FindUserActionDto>(
            'findUserActions',
            findUserActionDTO,
          ),
        );

        return lastUserActions.length > 0;
      }),
    );

    if (event.ruleLogic === RuleLogic.And) {
      return ruleResults.every((result) => result);
    } else if (event.ruleLogic === RuleLogic.Or) {
      return ruleResults.some((result) => result);
    } else {
      throw new RpcException(new BadRequestException('Invalid rule logic'));
    }
  }
}

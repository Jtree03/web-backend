import { CreateUserActionDto } from './dto/create-user-action.dto';
import { FindUserActionDto } from './dto/find-user-action.dto';
import { UserAction } from './models/user-action.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RuleOperator } from 'libs/enums/event-rule.enum';
import { Model } from 'mongoose';

@Injectable()
export class UserActionsService {
  constructor(
    @InjectModel(UserAction.name) private userActionModel: Model<UserAction>,
  ) {}

  create(createUserActionDto: CreateUserActionDto) {
    const { userID, ...userActionData } = createUserActionDto;

    const userAction = new this.userActionModel({
      ...userActionData,
      user: createUserActionDto.userID,
    });
    return userAction.save();
  }

  async findAll(findUserActionDTO: FindUserActionDto) {
    let sumProperty: any = null;
    switch (findUserActionDTO.operator) {
      case RuleOperator.GT:
        sumProperty = { $gt: findUserActionDTO.sum };
        break;
      case RuleOperator.GTE:
        sumProperty = { $gte: findUserActionDTO.sum };
        break;
      case RuleOperator.LT:
        sumProperty = { $lt: findUserActionDTO.sum };
        break;
      case RuleOperator.LTE:
        sumProperty = { $lte: findUserActionDTO.sum };
        break;
      case RuleOperator.EQ:
        sumProperty = { $eq: findUserActionDTO.sum };
        break;
      case RuleOperator.NE:
        sumProperty = { $ne: findUserActionDTO.sum };
        break;
    }

    const userActions = await this.userActionModel
      .find({
        user: findUserActionDTO.userID,
        actionType: findUserActionDTO.actionType,
        sum: sumProperty,
      })
      .exec();
    return userActions;
  }

  async findOneLast(userID: string, actionType: string) {
    const userAction = await this.userActionModel
      .findOne({ user: userID, actionType })
      .sort({ actionDate: -1 })
      .exec();
    return userAction;
  }
}

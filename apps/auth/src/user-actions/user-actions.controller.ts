import { CreateUserActionDto } from './dto/create-user-action.dto';
import {
  FindOneLastUserActionDTO,
  FindUserActionDto,
} from './dto/find-user-action.dto';
import { UserActionsService } from './user-actions.service';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserActionsController {
  constructor(private readonly userActionsService: UserActionsService) {}

  @MessagePattern('createUserAction')
  async create(@Payload() createUserActionDto: CreateUserActionDto) {
    const userAction =
      await this.userActionsService.create(createUserActionDto);
    return userAction;
  }

  @MessagePattern('findUserActions')
  async findAll(@Payload() findUserActionDTO: FindUserActionDto) {
    const userActions =
      await this.userActionsService.findAll(findUserActionDTO);
    return userActions;
  }

  @MessagePattern('findOneLastUserAction')
  async findOneLast(
    @Payload() findOneLastUserActionDTO: FindOneLastUserActionDTO,
  ) {
    const userAction = await this.userActionsService.findOneLast(
      findOneLastUserActionDTO.userID,
      findOneLastUserActionDTO.actionType,
    );
    return userAction;
  }
}

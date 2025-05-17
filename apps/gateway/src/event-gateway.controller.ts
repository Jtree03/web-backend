import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';
import { RequestRewardDTO } from './dto/request-reward.dto';
import { CatchThrowRpcException } from './filters/rpc-exception.filter';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JWTPayloadDTO } from 'apps/auth/src/auth/dto/jwt.dto';
import { UserWithoutPassword } from 'apps/auth/src/users/models/user.schema';
import { CreateEventDTO } from 'apps/event/src/events/dto/create-event.dto';
import { CreateRewardRequestDTO } from 'apps/event/src/reward-requests/dto/create-reward-request.dto';
import { CreateRewardDTO } from 'apps/event/src/rewards/dto/create-reward.dto';
import { Request } from 'express';
import { Role } from 'libs/enums/role.enum';

@Controller()
export class EventGatewayController {
  constructor(@Inject('EVENT_SERVICE') private eventClient: ClientProxy) {}

  @ApiOperation({ summary: '이벤트 목록 조회' })
  @Get('events')
  async getEvents() {
    return this.eventClient
      .send('findAllEvents', {})
      .pipe(CatchThrowRpcException);
  }

  @ApiOperation({ summary: '이벤트 상세 조회' })
  @ApiParam({ name: 'eventID', type: 'string' })
  @Get('events/:eventID')
  async getEvent(@Param('eventID') eventID: string) {
    console.log('eventID', eventID);
    return this.eventClient
      .send('findOneEvent', eventID)
      .pipe(CatchThrowRpcException);
  }

  @ApiOperation({ summary: '이벤트 등록' })
  @ApiBearerAuth()
  @Post('events')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Operator)
  async createEvent(@Body() createEventDTO: CreateEventDTO) {
    return this.eventClient
      .send('createEvent', createEventDTO)
      .pipe(CatchThrowRpcException);
  }

  @ApiOperation({ summary: '보상 등록' })
  @ApiBearerAuth()
  @Post('events/:eventID/rewards')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Operator)
  async createReward(
    @Param('eventID') eventID: string,
    @Body() body: CreateRewardDTO,
  ) {
    return this.eventClient
      .send('createReward', { eventID, ...body })
      .pipe(CatchThrowRpcException);
  }

  @ApiOperation({ summary: '보상 조회' })
  @ApiParam({ name: 'eventID', type: 'string' })
  @Get('events/:eventID/rewards')
  async getEventRewards(@Param('eventID') eventID: string) {
    return this.eventClient
      .send('findAllRewards', eventID)
      .pipe(CatchThrowRpcException);
  }

  @ApiOperation({ summary: '유저 보상 요청' })
  @ApiBearerAuth()
  @Post('reward-requests')
  @UseGuards(JwtAuthGuard)
  async requestReward(
    @Req() req: Request,
    @Body() requestRewardDTO: RequestRewardDTO,
  ) {
    const user = req.user as unknown as JWTPayloadDTO;
    const payload = {
      ...requestRewardDTO,
      userID: user.sub,
    };
    return this.eventClient
      .send('createRewardRequest', payload)
      .pipe(CatchThrowRpcException);
  }

  @ApiOperation({ summary: '보상 요청 내역 조회' })
  @ApiQuery({
    name: 'userID',
    type: 'string',
    required: false,
  })
  @ApiBearerAuth()
  @Get('reward-requests')
  @UseGuards(JwtAuthGuard)
  async getRewardRequests(
    @Req() req: Request,
    @Query('userID') userID: string,
  ) {
    const user = req.user as unknown as JWTPayloadDTO;

    if (user.role === Role.User && !userID) {
      throw new BadRequestException('userID is required');
    }

    return this.eventClient
      .send('findAllRewardRequests', { userID })
      .pipe(CatchThrowRpcException);
  }
}

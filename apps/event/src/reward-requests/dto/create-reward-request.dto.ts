import { IsString } from 'class-validator';
import { RequestStatus } from 'libs/enums/reward-request.enum';

export class CreateRewardRequestDTO {
  @IsString()
  userID: string;

  @IsString()
  eventID: string;
}

export class CreateRewardRequestModelDTO {
  userID: string;

  event: string;

  status: RequestStatus;
}

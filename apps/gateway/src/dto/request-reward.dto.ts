import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestRewardDTO {
  @ApiProperty()
  @IsString()
  eventID: string;
}

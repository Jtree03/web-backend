import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateUserActionDto {
  @ApiProperty()
  @IsString()
  userID: string;

  @ApiProperty()
  @IsString()
  actionType: string;

  @ApiProperty({ required: false, default: () => new Date() })
  @IsDate()
  @Type(() => Date)
  actionDate?: Date;

  @ApiProperty({ required: false, default: 1 })
  @IsNumber()
  sum?: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRewardDTO {
  @ApiProperty({ example: 'GOLD' })
  @IsString()
  itemID: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  quantity: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { RuleOperator } from 'libs/enums/event-rule.enum';

export class CreateEventRuleDTO {
  @ApiProperty({ example: 'LOGIN_DAY_FIRST' })
  @IsString()
  actionType: string;

  @ApiProperty({ enum: RuleOperator, example: RuleOperator.EQ })
  @IsEnum(RuleOperator)
  operator: RuleOperator;

  @ApiProperty({ example: 7 })
  @IsNumber()
  threshold: number;
}

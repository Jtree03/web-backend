import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { RuleOperator } from 'libs/enums/event-rule.enum';

export class CreateEventRuleDTO {
  @ApiProperty()
  @IsString()
  actionType: string;

  @ApiProperty({ enum: RuleOperator, example: RuleOperator.EQ })
  @IsEnum(RuleOperator)
  operator: RuleOperator;

  @ApiProperty({ example: 1 })
  @IsNumber()
  threshold: number;
}

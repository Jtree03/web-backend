import { CreateEventRuleDTO } from '../../event-rules/dto/create-event-rule.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsString, MinLength } from 'class-validator';
import { RuleLogic } from 'libs/enums/event-rule.enum';
import { EventStatus } from 'libs/enums/event-status.enum';

export class CreateEventDTO {
  @ApiProperty({
    description: '이벤트 이름',
    example: '7일 연속출석',
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: '이벤트 설명',
    required: false,
    example: '7일 연속으로 출석할 시 완료 (name 속성은 unique 키 입니다)',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    description: '이벤트 시작일',
    required: false,
    example: () => new Date().toISOString(),
  })
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @ApiProperty({
    description: '이벤트 종료일',
    required: false,
    example: '2099-12-31T23:59:59Z',
  })
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @ApiProperty({
    enum: EventStatus,
    description: '이벤트 초기 상태',
    example: EventStatus.Active,
  })
  @IsEnum(EventStatus)
  initStatus: EventStatus;

  @ApiProperty({
    enum: RuleLogic,
    description: '규칙 논리 (AND 또는 OR)',
    example: RuleLogic.And,
  })
  @IsEnum(RuleLogic)
  ruleLogic: RuleLogic;

  @ApiProperty({
    type: [CreateEventRuleDTO],
  })
  rules: CreateEventRuleDTO[];
}

import { RuleOperator } from 'libs/enums/event-rule.enum';

export class FindUserActionDto {
  userID: string;

  actionType: string;

  sum: number;

  operator: RuleOperator;
}

export class FindOneLastUserActionDTO {
  userID: string;

  actionType: string;
}

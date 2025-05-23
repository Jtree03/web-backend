export enum RuleType {
  COUNT_ACTION = 'COUNT_ACTION',
  COUNT_ACTION_IN_WINDOW = 'COUNT_ACTION_IN_WINDOW',
  COUNT_ACTION_WITH_CONDITION = 'COUNT_ACTION_WITH_CONDITION',
  SUM_ACTION_PROPERTY = 'SUM_ACTION_PROPERTY',
  SUM_ACTION_PROPERTY_IN_WINDOW = 'SUM_ACTION_PROPERTY_IN_WINDOW',
  USER_PROPERTY_THRESHOLD = 'USER_PROPERTY_THRESHOLD',
  USER_STATE = 'USER_STATE',
  CONSECUTIVE_ACTION = 'CONSECUTIVE_ACTION',
  RELATION_COUNT = 'RELATION_COUNT',
}

export enum RuleOperator {
  GT = 'GT',
  LT = 'LT',
  GTE = 'GTE',
  LTE = 'LTE',
  EQ = 'EQ',
  NE = 'NE',
}

export enum RuleLogic {
  And = 'AND',
  Or = 'OR',
}

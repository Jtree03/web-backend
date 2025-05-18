import { CreateUserActionDto } from './create-user-action.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserActionDto extends PartialType(CreateUserActionDto) {
  id: string;
}

import { UpdateUserDTO } from '../../users/dto/update-user.dto';
import { PickType } from '@nestjs/mapped-types';

export class UpdateRoleDTO extends PickType(UpdateUserDTO, [
  'email',
  'role',
] as const) {}

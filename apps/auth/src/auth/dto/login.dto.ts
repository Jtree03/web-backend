import { CreateUserDTO } from '../../users/dto/create-user.dto';
import { PickType } from '@nestjs/swagger';

export class LoginDTO extends PickType(CreateUserDTO, [
  'email',
  'password',
] as const) {}

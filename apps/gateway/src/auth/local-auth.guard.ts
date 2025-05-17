import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDTO } from 'apps/auth/src/auth/dto/login.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const body = plainToClass(LoginDTO, request.body);
    const errors = await validate(body);
    const errorMessages = errors.flatMap(({ constraints }) =>
      Object.values(constraints),
    );
    if (errorMessages.length > 0) {
      throw new BadRequestException(errorMessages);
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}

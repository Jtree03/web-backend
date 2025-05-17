import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { UserWithoutPassword } from 'apps/auth/src/users/models/user.schema';
import { Strategy } from 'passport-local';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const observable = this.authClient.send<UserWithoutPassword>(
      'validateUser',
      {
        email,
        password,
      },
    );
    const user = await firstValueFrom(observable);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

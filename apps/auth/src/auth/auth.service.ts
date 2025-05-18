import { UserActionsService } from '../user-actions/user-actions.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { UserWithoutPassword } from '../users/models/user.schema';
import { UsersService } from '../users/users.service';
import { JWTPayloadDTO } from './dto/jwt.dto';
import { SignupDTO } from './dto/signup.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private userActionsService: UserActionsService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: UserWithoutPassword) {
    const jwtPayload: JWTPayloadDTO = {
      sub: user.id,
      email: user.email,
      nickname: user.nickname,
      role: user.role,
    };

    const today = new Date();
    const todayZero = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0,
      0,
    );
    const yesterdayZero = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1,
      0,
      0,
      0,
      0,
    );
    const lastUserAction = await this.userActionsService.findOneLast(
      user.id,
      'LOGIN_DAY_FIRST',
    );

    if (
      lastUserAction &&
      lastUserAction.actionDate &&
      lastUserAction.actionDate < todayZero
    ) {
      await this.userActionsService.create({
        userID: user.id,
        actionType: 'LOGIN_DAY_FIRST',
        actionDate: todayZero,
        sum:
          yesterdayZero.getTime() === lastUserAction.actionDate.getTime()
            ? lastUserAction.sum + 1
            : 1,
      });
    } else {
      const lastLoginAction = await this.userActionsService.findOneLast(
        user.id,
        'LOGIN',
      );

      await this.userActionsService.create({
        userID: user.id,
        actionType: 'LOGIN',
        actionDate: new Date(),
        sum: lastLoginAction ? lastLoginAction.sum + 1 : 1,
      });
    }

    return {
      access_token: this.jwtService.sign(jwtPayload),
    };
  }

  async signup(signupDTO: SignupDTO) {
    const createUserDTO: CreateUserDTO = {
      nickname: signupDTO.nickname,
      email: signupDTO.email,
      password: await bcrypt.hash(signupDTO.password, 10),
    };
    const user = await this.usersService.create(createUserDTO);

    await this.userActionsService.create({
      userID: user.id,
      actionType: 'SIGNUP',
      actionDate: new Date(),
    });

    return user;
  }

  async updateRole(updateRoleDTO: UpdateRoleDTO) {
    const user = await this.usersService.update(updateRoleDTO.email, {
      role: updateRoleDTO.role,
    });
    return user;
  }
}

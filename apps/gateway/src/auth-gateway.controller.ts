import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Roles } from './auth/roles.decorator';
import { RolesGuard } from './auth/roles.guard';
import { CatchThrowRpcException } from './filters/rpc-exception.filter';
import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { LoginDTO } from 'apps/auth/src/auth/dto/login.dto';
import { SignupDTO } from 'apps/auth/src/auth/dto/signup.dto';
import { UpdateRoleDTO } from 'apps/auth/src/auth/dto/update-role.dto';
import { CreateUserActionDto } from 'apps/auth/src/user-actions/dto/create-user-action.dto';
import { Request } from 'express';
import { Role } from 'libs/enums/role.enum';

@Controller()
export class AuthGatewayController {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  @ApiOperation({
    summary: '회원 가입',
    description:
      '첫번째로 만드는 계정은 ADMIN 권한이 부여됩니다.\nSIGNUP 유저 액션이 생성됩니다.',
  })
  @Post('auth/signup')
  async signup(@Body() signupDTO: SignupDTO) {
    return this.authClient
      .send('signup', signupDTO)
      .pipe(CatchThrowRpcException);
  }

  @ApiOperation({
    summary: '로그인',
    description:
      '당일 첫번째 로그인시: LOGIN_DAY_FIRST 유저 액션이 생성됩니다. (그 외에는 LOGIN)',
  })
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request, @Body() body: LoginDTO) {
    return this.authClient.send('login', req.user).pipe(CatchThrowRpcException);
  }

  @ApiOperation({ summary: '역할 관리' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'email', type: 'string' })
  @ApiQuery({ name: 'role', enum: Role })
  @Patch('auth/role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateRole(
    @Query('email') email: string,
    @Query('role') role: Role = Role.User,
  ) {
    return this.authClient
      .send<unknown, UpdateRoleDTO>('updateRole', {
        email,
        role,
      })
      .pipe(CatchThrowRpcException);
  }

  @ApiOperation({ summary: '내 정보 조회' })
  @ApiBearerAuth()
  @Get('auth/profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request) {
    return req.user;
  }

  @ApiOperation({ summary: '유저 목록 보기기 (어드민용)' })
  @ApiBearerAuth()
  @Get('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async getUsers() {
    return this.authClient
      .send('findAllUsers', {})
      .pipe(CatchThrowRpcException);
  }

  @ApiOperation({ summary: '유저 액션 생성 (어드민용)' })
  @ApiBearerAuth()
  @Post('user-action')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createUserAction(@Body() body: CreateUserActionDto) {
    return this.authClient
      .send('createUserAction', body)
      .pipe(CatchThrowRpcException);
  }
}

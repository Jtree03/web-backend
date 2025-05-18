import { UserWithoutPassword } from '../users/models/user.schema';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { SignupDTO } from './dto/signup.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';
import {
  ConflictException,
  Controller,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern('validateUser')
  async validateUser(@Payload() loginDTO: LoginDTO) {
    const user = this.authService.validateUser(
      loginDTO.email,
      loginDTO.password,
    );
    return user;
  }

  @MessagePattern('login')
  async login(@Payload() validatedUser: UserWithoutPassword) {
    const jwt = this.authService.login(validatedUser);
    return jwt;
  }

  @MessagePattern('signup')
  async signup(@Payload() signupDTO: SignupDTO) {
    try {
      const user = await this.authService.signup(signupDTO);
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new RpcException(new ConflictException('Email already exists'));
      }
      throw new RpcException(new InternalServerErrorException(error));
    }
  }

  @MessagePattern('updateRole')
  async updateRole(@Payload() updateRoleDTO: UpdateRoleDTO) {
    const user = await this.authService.updateRole(updateRoleDTO);
    if (!user) {
      throw new RpcException(new NotFoundException('User not found'));
    }
    return user;
  }
}

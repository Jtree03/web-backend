import { UsersService } from './users.service';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Types } from 'mongoose';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('findAllUsers')
  findAll() {
    return this.usersService.findAll();
  }
}

import { CreateUserDTO } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from 'libs/enums/role.enum';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  @IsOptional()
  role?: string;
}

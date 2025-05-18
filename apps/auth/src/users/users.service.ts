import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './models/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDTO) {
    const userCount = await this.userModel.countDocuments();
    const createdUser = new this.userModel({
      ...createUserDto,
      role: userCount === 0 ? 'ADMIN' : 'USER',
    });
    return createdUser.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOneByID(id: string) {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async findOneByIDs(ids: string[]) {
    const users = await this.userModel.find({ _id: { $in: ids } }).exec();
    return users;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async update(email: string, updateUserDto: UpdateUserDTO) {
    const user = await this.userModel
      .findOneAndUpdate({ email }, { $set: updateUserDto }, { new: true })
      .exec();
    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    return user;
  }
}

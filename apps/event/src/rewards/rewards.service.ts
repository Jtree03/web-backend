import { CreateRewardDTO } from './dto/create-reward.dto';
import { UpdateRewardDTO } from './dto/update-reward.dto';
import { Reward } from './models/reward.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RewardsService {
  constructor(@InjectModel(Reward.name) private rewardModel: Model<Reward>) {}

  create(eventID: string, createRewardDto: CreateRewardDTO) {
    const createdReward = new this.rewardModel({
      ...createRewardDto,
      event: eventID,
    });
    return createdReward.save();
  }

  findAll() {
    return this.rewardModel.find().exec();
  }

  findByEventID(eventID: string) {
    return this.rewardModel.find({ event: eventID }).exec();
  }

  findOne(id: string) {
    return this.rewardModel.findById(id).exec();
  }

  update(id: string, updateRewardDto: UpdateRewardDTO) {
    return this.rewardModel
      .findByIdAndUpdate(id, { $set: updateRewardDto }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.rewardModel.findByIdAndDelete(id).exec();
  }
}

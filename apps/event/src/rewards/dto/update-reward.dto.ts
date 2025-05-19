import { CreateRewardDTO } from './create-reward.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRewardDTO extends PartialType(CreateRewardDTO) {
  id: string;
}

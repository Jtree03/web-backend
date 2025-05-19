import { CreateRewardRequestDTO } from './create-reward-request.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRewardRequestDTO extends PartialType(
  CreateRewardRequestDTO,
) {
  id: string;
}

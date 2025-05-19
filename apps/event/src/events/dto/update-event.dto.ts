import { CreateEventDTO } from './create-event.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEventDTO extends PartialType(CreateEventDTO) {
  id: string;
}

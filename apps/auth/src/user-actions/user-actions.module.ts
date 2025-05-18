import { UserAction, UserActionSchema } from './models/user-action.schema';
import { UserActionsController } from './user-actions.controller';
import { UserActionsService } from './user-actions.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAction.name, schema: UserActionSchema },
    ]),
  ],
  controllers: [UserActionsController],
  providers: [UserActionsService],
  exports: [UserActionsService],
})
export class UserActionsModule {}

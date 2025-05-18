import { UserAction } from './models/user-action.schema';
import { UserActionsController } from './user-actions.controller';
import { UserActionsService } from './user-actions.service';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserActionsController', () => {
  let controller: UserActionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserActionsController],
      providers: [
        UserActionsService,
        {
          provide: getModelToken(UserAction.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserActionsController>(UserActionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

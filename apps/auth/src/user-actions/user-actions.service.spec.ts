import { UserAction } from './models/user-action.schema';
import { UserActionsService } from './user-actions.service';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserActionsService', () => {
  let service: UserActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<UserActionsService>(UserActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

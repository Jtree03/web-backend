import { EventsService } from '../events/events.service';
import { Event } from '../events/models/event.schema';
import { RewardRequest } from './models/reward-request.schema';
import { RewardRequestsController } from './reward-requests.controller';
import { RewardRequestsService } from './reward-requests.service';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

describe('RewardRequestsController', () => {
  let controller: RewardRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardRequestsController],
      providers: [
        EventsService,
        RewardRequestsService,
        {
          provide: getModelToken(RewardRequest.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
        {
          provide: getModelToken(Event.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
        {
          provide: 'AUTH_SERVICE',
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    controller = module.get<RewardRequestsController>(RewardRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

const mockClientProxy = {
  send: jest.fn((pattern, payload) => {
    return of(payload);
  }),
  emit: jest.fn((pattern, payload) => {
    return of(undefined);
  }),
  connect: jest.fn(() => Promise.resolve()),
  close: jest.fn(),
};

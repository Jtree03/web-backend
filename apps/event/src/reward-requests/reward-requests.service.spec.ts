import { RewardRequest } from './models/reward-request.schema';
import { RewardRequestsService } from './reward-requests.service';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

describe('RewardRequestsService', () => {
  let service: RewardRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
          provide: 'AUTH_SERVICE',
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    service = module.get<RewardRequestsService>(RewardRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

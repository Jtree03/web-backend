import { EventRulesService } from './event-rules.service';
import { EventRule } from './models/event-rule.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

describe('EventRulesService', () => {
  let service: EventRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventRulesService,
        {
          provide: getModelToken(EventRule.name),
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

    service = module.get<EventRulesService>(EventRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

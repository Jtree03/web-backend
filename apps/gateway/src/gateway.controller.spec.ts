import { GatewayController } from './gateway.controller';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';

describe('GatewayController', () => {
  let gatewayController: GatewayController;
  let authClient: ClientProxy;
  let eventClient: ClientProxy;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GatewayController],
      providers: [
        {
          provide: 'AUTH_SERVICE',
          useValue: mockClientProxy,
        },
        {
          provide: 'EVENT_SERVICE',
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    gatewayController = app.get<GatewayController>(GatewayController);
    authClient = app.get<ClientProxy>('AUTH_SERVICE');
    eventClient = app.get<ClientProxy>('EVENT_SERVICE');
  });

  it('should be defined', () => {
    expect(gatewayController).toBeDefined();
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

import { EventRulesModule } from './event-rules/event-rules.module';
import { EventsModule } from './events/events.module';
import { RewardRequestsModule } from './reward-requests/reward-requests.module';
import { RewardsModule } from './rewards/rewards.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['apps/event/.env', '.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    EventsModule,
    EventRulesModule,
    RewardsModule,
    RewardRequestsModule,
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: 'AUTH_SERVICE',
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            transport: Transport.TCP,
            options: {
              host: configService.get<string>('SERVER_AUTH_HOST'),
              port: configService.get<number>('SERVER_AUTH_PORT'),
            },
          }),
        },
      ],
    }),
  ],
})
export class AppModule {}

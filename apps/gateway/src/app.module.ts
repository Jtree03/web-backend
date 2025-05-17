import { AuthGatewayController } from './auth-gateway.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { EventGatewayController } from './event-gateway.controller';
import { GatewayController } from './gateway.controller';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['apps/gateway/.env', '.env'],
    }),
    PassportModule,
    ClientsModule.registerAsync({
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
        {
          name: 'EVENT_SERVICE',
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            transport: Transport.TCP,
            options: {
              host: configService.get<string>('SERVER_EVENT_HOST'),
              port: configService.get<number>('SERVER_EVENT_PORT'),
            },
          }),
        },
      ],
    }),
  ],
  controllers: [
    GatewayController,
    AuthGatewayController,
    EventGatewayController,
  ],
  providers: [LocalStrategy, JwtStrategy],
})
export class AppModule {}

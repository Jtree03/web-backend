import { NestFactory } from '@nestjs/core';
import { EventModule } from './event.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
 const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EventModule,
  );
  await app.listen();
}
bootstrap();

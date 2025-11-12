import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  //Added code---------------------------------------
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: ['nats://localhost:4222']
  })
  //Added code---------------------------------------
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Muy importante para que class-transformer convierta tipos
  }));
  //--------------------------------------------------
  await app.listen();
}
bootstrap();

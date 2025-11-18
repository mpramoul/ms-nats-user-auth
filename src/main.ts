import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, RpcException, Transport } from '@nestjs/microservices';
import { RpcValidationFilter } from 'config/rpc-exception.filter';

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
      //---------------------------------------------
      exceptionFactory: (errors) => {
      return new RpcException({
        statusCode: 400,
        message: 'Validation failed',
        errors: errors.map(err => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
      },
      //---------------------------------------------
    })
  );

  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Muy importante para que class-transformer convierta tipos
  }));
  //--------------------------------------------------
  app.useGlobalFilters(new RpcValidationFilter());
  //--------------------------------------------------
  await app.listen();
}
bootstrap();

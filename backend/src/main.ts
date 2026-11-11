// FR-03, FR-24, NFR-01 | UML: Ordering System in sequence-order.
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000, '127.0.0.1');
}

void bootstrap();

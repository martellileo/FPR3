import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ionic (ionic serve) roda em 8100; Angular puro em 4200.
  app.enableCors({ origin: ['http://localhost:8100', 'http://localhost:4200'] });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(3000);
  console.log('TaskFlow API em http://localhost:3000');
}
bootstrap();

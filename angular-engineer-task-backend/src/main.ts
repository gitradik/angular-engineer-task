import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL,
  });
  app.setGlobalPrefix(process.env.API_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

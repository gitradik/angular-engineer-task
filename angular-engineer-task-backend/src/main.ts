import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL,
  });
  app.setGlobalPrefix(process.env.API_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(3000);
}
bootstrap();

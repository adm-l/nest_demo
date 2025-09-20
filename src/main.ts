import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Body } from '@nestjs/common';
import { CustomValidationExceptionFilter } from './common/filters/global/global.filter';
import { NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // eslint-disable-next-line prettier/prettier
    transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('➡️ Incoming Request:');
    console.log('Method:', req.method);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body); // Requires body-parser (enabled by default)
    next();
  });
  await app.listen(3000);
}
bootstrap();

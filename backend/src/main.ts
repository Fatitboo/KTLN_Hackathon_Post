import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './shared/infrastructure/logger/logger.service';
import { AllExceptionFilter } from './shared/infrastructure/common/filter/exception.filter';
import { LoggingInterceptor } from './shared/infrastructure/common/interceptors/logging.interceptor';
export const urlFe =
  process.env.URL_FE || 'https://ktln-hackathon-post-eta.vercel.app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  // app.enableCors({
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  // });

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // base routing
  app.setGlobalPrefix('api/v1');

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  // app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors({
    origin: urlFe, // Frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT);
}
bootstrap();

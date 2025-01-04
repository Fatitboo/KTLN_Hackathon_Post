import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './shared/infrastructure/logger/logger.service';
import { AllExceptionFilter } from './shared/infrastructure/common/filter/exception.filter';
import { LoggingInterceptor } from './shared/infrastructure/common/interceptors/logging.interceptor';
import { ResponseFormat } from './shared/infrastructure/common/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = process.env.NODE_ENV;

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
    origin: 'http://localhost:5173', // Frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // swagger config
  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('HackaDev')
      .setDescription('Website support organize Hackathons')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api', app, document);
  }
  console.log(process.env.PORT);
  await app.listen(process.env.PORT);
}
bootstrap();

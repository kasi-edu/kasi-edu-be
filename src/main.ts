import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  // * SWAGGER SETUP
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Kasi Edu API')
      .setDescription('API for Kasi edu dashboard')
      .setVersion('v1')
      .addTag('kasiEdu')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token',
      )
      .build(),
  );
  SwaggerModule.setup('api-docs', app, document);

  const configService = app.get(ConfigService);
  const APP_PORT = configService.get<number>('APP_PORT');
  console.log('APP RUN ON THIS ENVIRONMENT...');
  console.table({
    APP_PORT,
    STAGE: configService.get<string>('STAGE'),
    DB_TYPE: configService.get<string>('DB_TYPE'),
    DB_HOST: configService.get<string>('DB_HOST'),
    DB_PORT: configService.get<string>('DB_PORT'),
    DB_DATABASE: configService.get<string>('DB_DATABASE'),
  });

  await app.listen(APP_PORT);
}
bootstrap();

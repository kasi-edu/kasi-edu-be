import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

let cachedServer;

async function setupSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('Kasi Edu API')
    .setVersion('v1')
    .addTag('Kasi Edu')
    .addServer('/dev')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);

    nestApp.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));
    nestApp.useGlobalInterceptors(
      new WrapResponseInterceptor(),
      new TimeoutInterceptor(),
    );
    setupSwagger(nestApp);
    await nestApp.init();

    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};

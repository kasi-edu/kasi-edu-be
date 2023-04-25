import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CorsMiddleware } from '@nest-middlewares/cors';

import { dataSourceOptions } from '../db/data-source';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ClassModule } from './class/class.module';
import { DescriptionModule } from './description/description.module';
import { RequirementModule } from './requirement/requirement.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.STAGE.toLowerCase()}`,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    CategoryModule,
    ClassModule,
    DescriptionModule,
    RequirementModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    CorsMiddleware.configure({ origin: '*' });
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}

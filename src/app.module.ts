import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { dataSourceOptions } from '../db/data-source';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.STAGE.toLowerCase()}`,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
  ],
})
export class AppModule {}

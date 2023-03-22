import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HandleError } from 'src/common/helpers/handleError';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    JwtModule.register({
      // secret: process.env.SECRET,
      // signOptions: { expiresIn: process.env.TOKEN_EXP },
      secret: 'SECRET',
      signOptions: { expiresIn: '7d' },
    }),
    PassportModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, HandleError],
  exports: [AuthService],
})
export class AuthModule {}

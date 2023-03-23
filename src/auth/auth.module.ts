import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HandleError } from 'src/common/helpers/handleError';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { SessionSerializer } from './serializer/session.serializer';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    JwtModule.register({
      // secret: process.env.SECRET,
      // signOptions: { expiresIn: process.env.TOKEN_EXP },
      secret: 'SECRET',
      signOptions: { expiresIn: '7d' },
    }),
    PassportModule.register({ session: true }), // * for session
    PassportModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    SessionSerializer,
    HandleError,
  ],
  exports: [AuthService],
})
export class AuthModule {}

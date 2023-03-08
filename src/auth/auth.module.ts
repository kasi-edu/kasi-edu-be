import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HandleError } from 'src/common/helpers/handleError';

@Module({
  imports: [PassportModule, JwtModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, HandleError],
  exports: [AuthService],
})
export class AuthModule {}

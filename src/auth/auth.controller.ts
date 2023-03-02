import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto) {
    return await this.authService.signUp(createUserDto);
  }

  @Post('signin')
  async signin(@Body() data) {
    return await this.authService.signIn(data);
  }
}
